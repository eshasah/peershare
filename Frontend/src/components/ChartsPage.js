// @flow

import * as React from "react";
import { Page, Grid, Card, colors } from "tabler-react";
import Chart from "react-apexcharts";
import io from "socket.io-client";
import axios from "axios";
import URLs from "../URLs";
export default class ChartsPage extends React.Component {

 
  constructor(props) {
    super(props);
    console.log(props);

    this.fetchRouteInfo = async (rideId) => {
      try {
        console.log("fetch thots");
        const response = await axios.get(`${URLs.baseURL}/getRoutes?rideId=${rideId}`);

        if (response.data) {
          console.log(response.data);
          var RoadIDs = response.data.map(item => item['Road ID']);
          var LaneIDs = response.data.map(item => item['Lane ID']);
          this.setState({ rides: response.data });
          this.setState({
            series: [
              {
                name: "Lane ID",
                data: LaneIDs
              },
              {
                name: "Road ID",
                data: RoadIDs
              }
            ]
          })
          //console.log(this.yData);

        } else {
          //alert(response.data.message);
        }
      } catch (error) {
        console.log("Error with fetching rides: ", error);
        // alert(
        //   "Error with fetching ride. Please check the console for more info."
        // );
      }
    };
    var vehicleno = "";
    this.rideDetails="";
    this.fetchRides = async (rideId) => {
      try {
        console.log("fetch fetchRides");
        const rideId = this.props.rideData.rideId;
       const response = await axios.get(`${URLs.baseURL}/getUserRideDetailsByRideID?rideId=${rideId}`);            
        //const data = JSON.parse(sessionStorage.getItem('userRideDetails'));
    
        if (response.data) {
          //console.log(response.data.message);
          sessionStorage.setItem('userRideDetails', JSON.stringify(response.data.message));
          this.setState({ rideDetails: response.data.message.VehcileNum }); 
        }
        else {
          //alert("Something went wrong");
        }    
      }
      catch (exception){
        //alert("Something went wrong");
      }
    }

   
    this.state = {
      rides: "",
      rideData:this.props.rideData,
      xData: [],
      rideDetails:"",
      yData: [],
      series: [
        {
          name: "Lane ID",
          data: this.xData
        },
        {
          name: "Road ID",
          data: this.yData
        }
      ],
      options: {
        chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text:'Vehicle Street Tracking Informaton' ,
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 1
        },
        xaxis: {
          //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          // title: {
          //   text: 'Month'
          // }
          min: 0,
          max: 10
        },
        yaxis: {
          // title: {
          //   text: 'Temperature'
          // },
          min: -5,
          max: 1000
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      },


    };

  }
  componentDidMount = async () => {
    this.fetchRouteInfo(this.props.rideData.rideId);
    this.fetchRides(this.props.rideData.rideId);
    //socket.io connection
    // const socket = io(`http://localhost:3001/socket`);

    const socket = io(URLs.socketURL + "/socket", {
      //withCredentials: true,
      transports: ['websocket']
      // extraHeaders: {
      //   "my-custom-header": "abcd"
      // }
    });

    socket.on("newRide", (ride) => {
      console.log("rides");
      console.log(this.state.rides);
      console.log("ride");
      console.log(ride);
      this.state.rides.shift();
      console.log(this.state.rides);
      this.setState({ rides: [...this.state.rides, ride] });
      //this.setState({ rides: [...this.state.rides, ride] });
      console.log(this.state.rides);
      var RoadIDs = this.state.rides.map(item => item['Road ID']);
      var LaneIDs = this.state.rides.map(item => item['Lane ID']);

      this.setState({
        series: [
          {
            name: "Lane ID",
            data: LaneIDs
          },
          {
            name: "Road ID",
            data: RoadIDs
          }
        ]
      })
      //this.setState({ rides: [ride] });
    });

    socket.on("deletedRide", (id) => {
      const updatedRides = this.state.rides.filter((ride) => {
        return ride._id !== id;
      });

      this.setState({ rides: updatedRides });
    });

    socket.on("ridesCleared", () => {
      this.setState({ rides: [] });
    });

   
  };

  render() {
    return (
      <Grid.Row>
        <Grid.Col width={11}>
          <Card title={'Vehicle Number - '+this.state.rideDetails}>
            <Card.Body>
              <Chart options={this.state.options} series={this.state.series} type="line" height={350} />
            </Card.Body>
          </Card>
        </Grid.Col>

      </Grid.Row>

    );
  }
}


