import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import Navheader from '../Navbar/navbar';
import SideNavbar from '../Navbar/SideNavbar-User';
import { url, ownerBearer, userBearer, adminBearer } from '../Constants';
import axios from 'axios';
import Login from '../Login/login';
import { Redirect } from 'react-router';

class HomePageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  BookRide = () => {
    const carType = document.getElementById('slctType').value;
    const source = document.getElementById('txtSource').value;
    const destination = document.getElementById('txtDestination').value;
    this.setState({
      carNo : 'CA9876',
      carModel : 'Toyota Corolla',
      time:'5',
      fare:'15',
      location:'Santa Clara State University'
    });
    //document.getElementById("divRide").style.display = '';   

    
    axios
    .get(url + '/car/getAvailableCarsList')
    .then((response) => {
        console.log('Status Code : ', response.status);
        console.log('response ', response.data);
           
        if(response.data.data[0].length > 0)
        {
           var car = null;

           for(var i = 0; i < response.data.data[0].length; i++) {
            if(response.data.data[0][i].car_type == carType) {
              car = response.data.data[0][i];  
              break;
            }
           }

           if(car == null) {
            alert("All vehicles of the selected type are busy. Please try again after sometime.");
            return;
           }

           const carModel = car.model;
           const carNumber = car.registration;
           var flag = false;
           for(var i = 0; i < this.state.sdArray.length; i++) {
              if(source == this.state.sdArray[i][0] && destination == this.state.sdArray[i][1]) {
                this.setState({
                  fare: this.state.sdArray[i][2]
                })
                flag = true;
                break;
              }
           }

           if(!flag) {
            this.setState({
              fare: 77.67
            })
           }

           const data = {
             userId : sessionStorage.getItem('userid'),
             vehicleId : car.car_id,
             source : source,
             destination : destination,
             fare : this.state.fare / 1200
          }

          axios
          .post(url + '/ride/bookRide', data)
          .then((response) => {
            console.log('Status Code : ', response.status);
            console.log('response ', response.data);
           
            if(response.data != false)
            {
              this.setState({
                carNo : carNumber,
                carModel : carModel
              });

             
              document.getElementById("divRide").style.display = '';   
              const rideId = response.data.data[0].rideId; 
              sessionStorage.setItem('rideId', rideId);
              //this.fetchSensorDetails(rideId);
            }
            else
            {
              alert("Something went wrong");            
            }
             
            console.log(response.data);          
          })
          .catch((err) => {            
            alert("Something went wrong");            
          });
        }
        else {
          alert("All vehicles of the selected type are busy. Please try again after sometime.");
          return;
        }  
     })
    .catch((err) => {            
        alert("Something went wrong");            
    });
  }

  fetchSensorDetails= async (rideId) => {
    //var rideId = 86;
    const response = await axios.get(`${url}/getSensorData?rideId=${rideId}`);
    if(response !== null)
    {
      var data = response.data.message[0];
      sessionStorage.setItem('sensorData', JSON.stringify(data));
    }
  }
  componentWillMount(){
   
        //API calls to get user data
    //document.getElementById("divRide").hide();
    const arr = [
      ['Santa Clara', 'San Francisco', 53.84, 10],
      ['Santa Clara', 'Los Angeles', 127.447, 20],
      ['Santa Clara', 'Las Gatos', 75.104, 12],
      ['Santa Clara', 'San Jose', 79.404, 13],
      ['Santa Clara', 'Fremont', 66.86 , 15],
      ['Santa Clara', 'San Francisco', 76.84, 10],
      ['Los Angeles', 'San Francisco', 81.546 , 25],
      ['Las Gatos', 'San Francisco', 77.4722, 18],
      ['San Jose', 'San Francisco', 81.091, 7],
      ['Fremont', 'San Francisco', 41.766, 5],     
    ]
    
    this.setState({
      sdArray: arr
    })
  }

  render() {
    var redirect = null;
    // if(sessionStorage.getItem('userid') === null)
    // {
    //   redirect = <Redirect to='/login' />;
    // }
    return (
      <div>
        {redirect}
        <Navheader />
        <SideNavbar/>
        <div  style = {{marginLeft:"15%", width: "83%", borderRadius:"15px"}}>
            <label style = {{fontWeight:"100", fontSize: "22px", marginLeft: "3%", marginTop: "1%"}}>Book a ride</label>    
            <hr style = {{borderColor:"#cbc0c0"}}></hr>
            <div>
                <label style = {{fontWeight:"100", fontSize: "22px", marginLeft: "3%", marginTop: "1%"}}>Source</label>    
                <label style = {{fontWeight:"100", fontSize: "22px", marginLeft: "38.2%", marginTop: "1%"}}>Destination</label> 
            </div>
            <div style = {{marginTop: "2%"}}>
                <input type = "text" id = "txtSource" placeholder = "Enter source location" style = {{ height: "30px", marginLeft:"3%", width: "28%", borderRadius: "5px"}}></input>   
                <input type = "text" id = "txtDestination" placeholder = "Enter destination location" style = {{height: "30px", marginLeft:"17%", width: "28%", borderRadius: "5px"}}></input>                   
            </div>
            <div style = {{marginTop:"1%"}}><label  style = {{fontWeight:"100", fontSize: "20px", marginLeft: "3%", marginTop: "1%"}}>Select Car Type</label></div>
            <select id = 'slctType' style = {{height: "30px", marginLeft: "3px", width: "28%", marginLeft: "3%", borderRadius: "5px"}}>
                <option>View Car Types</option>
                <option>Sedan</option>
                <option>SUV</option>
                <option>Limousine</option>
            </select><br/>
            <button onClick = {this.BookRide} style = {{marginTop: "3%", marginLeft: "3%", width: "10%", borderRadius: "5px", border: "1px solid", height: "35px", background: "rgb(3 70 114)"}}>
                Book Ride
            </button>
            <div id = 'divRide' style = {{marginTop: "2%", marginLeft: "3%", border: "1px solid", width: "28%", background: "white", borderRadius: "15px", display:"none"}}>
              <label style = {{marginTop: "4%", marginLeft: "2%"}}>
              Car Model : {this.state.carModel}<br/>
              Car Number : {this.state.carNo}<br/>
              Estimated time : {this.state.time} min<br/>
              Estimated Amount : {this.state.fare}$<br/>
              {/* Pickup Location : {this.state.location} */}
              </label>
            </div>
            
        </div> 
       
       
      </div>
    );
  }
}

export default HomePageUser;
