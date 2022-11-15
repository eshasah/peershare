import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Polyline,
  Marker
} from "react-google-maps";
import axios from "axios";
import URLs from "../URLs";
import Geocode from 'react-geocode';
class Map extends React.Component {
  constructor(props)
  {
    super(props);
    console.log("here");
    
    console.log(this.props.rideData);
    this.state = {
      progress: [],
      origin:"",
      desn:"",
      path : [],
      rideData:this.props.rideData.rideData
    };
  }
 
  fetchRides = async (rideId) => {    
      console.log("fetch fetchRides");
      //const response = await axios.get(`${URLs.baseURL}/getUserRideDetailsByRideID?rideId=${rideId}`);

      //const data = JSON.parse(sessionStorage.getItem('userRideDetails'));
      try {
        console.log("fetch fetchRides");
        const response = await axios.get(`${URLs.baseURL}/getUserRideDetailsByRideID?rideId=${rideId}`);            
    
        if (response.data) {
          //console.log(response.data.message);
          sessionStorage.setItem('userRideDetails', JSON.stringify(response.data));
          const data = response.data;
         // this.setState({ rideDetails: response.data.VehcileNum }); 
         if(data != null) {
          this.setState({origin:'Santa Clara',desn:'San Francisco'})     
          //this.setState({origin:data.RideOrigin,desn:data.RideDestination})     
          Geocode.setApiKey("AIzaSyDSHwfEGzjkWKL_X9hMMPm_l_QuE402Vkc");
  
      // set response language. Defaults to english.
      Geocode.setLanguage("en");
      var paths=[];
      //response.data.message.RideOrigin="Chicago";
      await Geocode.fromAddress(data.RideOrigin).then(
          (response) => {
              const { olat, olng } = response.results[0].geometry.location;
             // console.log(olat, olng);
              var source={lat:response.results[0].geometry.location.lat,lng:response.results[0].geometry.location.lng};
              console.log(source);
              paths.push(source);
          },
          (error) => {
              console.error(error);
          }
      );
      await Geocode.fromAddress(this.state.desn).then(
          (response) => {
              const { dlat, dlng } = response.results[0].geometry.location;
              //console.log(dlat, dlng);
              var desnn={lat:response.results[0].geometry.location.lat,lng:response.results[0].geometry.location.lng};
              paths.push(desnn);
          },
          (error) => {
              console.error(error);
          }
      );

      this.setState({path:paths});
       this.interval = window.setInterval(this.moveObject, 0.0000001);
       
        this.state.path = this.state.path.map((coordinates, i, array) => {
            if (i === 0) {
              return { ...coordinates, distance: 0 }; // it begins here!
            }
            const { lat: lat1, lng: lng1 } = coordinates;
            const latLong1 = new window.google.maps.LatLng(lat1, lng1);
      
            const { lat: lat2, lng: lng2 } = array[0];
            const latLong2 = new window.google.maps.LatLng(lat2, lng2);
      
            // in meters:
            const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
              latLong1,
              latLong2
            );
      
            return { ...coordinates, distance };
          });
          this.moveObject();
      
          console.log(this.state.path); 
        }
        }
        else {
          //alert("Something went wrong");
        }    
      }
      catch (exception){
        //alert("Something went wrong");
      }

     
    
  //                                   
  //     } else {
  //       //alert(response.data.message);
  //     }
  //   } catch (error) {
  //     console.log("Error with fetching rides: ", error);
  //     alert(
  //       "Error with fetching ride. Please check the console for more info."
  //     );
  //   }
  };
 
  velocity = 100;
  initialDate = new Date();

  getDistance = () => {
    // seconds between when the component loaded and now
    const differentInTime = (new Date() - this.initialDate) / 1000; // pass to seconds
    return differentInTime * this.velocity; // d = v*t -- thanks Newton!
  };
  

  componentDidMount = () => {
    this.fetchRides(this.state.rideData.rideId);      
  };

  componentWillUnmount = () => {
    window.clearInterval(this.interval);
  };

  moveObject = () => {
    const distance = this.getDistance();
    if (!distance) {
      return;
    }

    let progress = this.state.path.filter(
      coordinates => coordinates.distance < distance
    );

    const nextLine = this.state.path.find(
      coordinates => coordinates.distance > distance
    );
    if (!nextLine) {
      this.setState({ progress });
      return; // it's the end!
    }
    const lastLine = progress[progress.length - 1];

    const lastLineLatLng = new window.google.maps.LatLng(
      lastLine.lat,
      lastLine.lng
    );

    const nextLineLatLng = new window.google.maps.LatLng(
      nextLine.lat,
      nextLine.lng
    );

    // distance of this line
    const totalDistance = nextLine.distance - lastLine.distance;
    const percentage = (distance - lastLine.distance) / totalDistance;

    const position = window.google.maps.geometry.spherical.interpolate(
      lastLineLatLng,
      nextLineLatLng,
      percentage
    );

    progress = progress.concat(position);
    this.setState({ progress });
  };

  componentWillMount = () => {
   
  };

  render = () => {
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat:37.3382082, lng: -121.8863286 }}
      >
        {this.state.progress && (
          <>
            <Polyline
              path={this.state.progress}
              options={{ strokeColor: "#FF0000 " }}
            />
            <Marker
              position={this.state.progress[this.state.progress.length - 1]}
            />
          </>
        )}
      </GoogleMap>
    );
  };
}

const MapComponent = withScriptjs(withGoogleMap(Map));

export default (props) => (
  <MapComponent
    rideData={props}
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDSHwfEGzjkWKL_X9hMMPm_l_QuE402Vkc"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `470px`, width: "500px" }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
);
