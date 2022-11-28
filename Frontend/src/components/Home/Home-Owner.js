import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import Navheader from '../Navbar/navbar';
import SideNavbar from '../Navbar/SideNavbar-Owner';
import './Home-Owner.css';
import axios from 'axios';
import { url, ownerBearer, userBearer, adminBearer } from '../Constants';
import Login from '../Login/login'
import { Redirect } from 'react-router';


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carStatus: 'Idle',
      amount:0,
      carModel:'',
      carNo:'',
      carColor:'',
      carType:'',
      carStatus:''


    };
  }

  componentWillMount(){
    //API calls to get user data
    axios.defaults.withCredentials = true;
    // make a post request with the user data
    
    axios
      .get(url + '/car/getByUserId?userId=' + sessionStorage.getItem('userid'))
      .then((response) => {
       // console.log('Status Code : ', response.status);
        console.log('response ', response.data);
      
     
          this.setState({
            carModel: response.data.data[0].model,
            carNo: response.data.data[0].registration,
            carColor: response.data.data[0].color,
            carType: response.data.data[0].car_type,
            carStatus: response.data.data[0].status,
          });
          console.log(response.data);
          console.log(this.state);
          const vehicleId =  response.data.data[0].car_id;
          axios
          .get(url + '/ride/cars?carId=' + vehicleId)
          .then((response) => {
            console.log('Status Code : ', response.status);
            console.log('response ', response.data);
                          
           
            if(response.data != false)
            {
              var html = document.getElementById('tblRidesTaken').innerHTML;
              //var totalAmount = 0;

              for(var i = 0; i < response.data.data.length; i++)
              {
                //const amount = response.data[i].ride_status === 'booked' ? '-' : response.data[0].ride_amount;
                html += '<tr><td>' + (i+1) +'</td><td>'+ response.data.data[i].source + '</td><td>' + response.data.data[i].destination + '</td><td>' + response.data.data[i].created_at.substring(0, 10) + '</td><td>' + response.data.data[i].ride_status + '</td><td>' + response.data.data[i].ride_amount + '</td></tr>';                    
                //totalAmount += amount ==='-' ? 0 : response.data[0].ride_amount;
              }
              
              //this.setState({amount: totalAmount});              
              document.getElementById('tblRidesTaken').innerHTML = html;
            }
             
            console.log(response.data);    
            
            axios
            .get(url + '/txn/getBalance?walletId=' + sessionStorage.getItem('walletId'))//'0xe58A0dcADE74a3Ce842D5F0E360Fe9839b34f70c')
            .then((response) => {
              const dollars = response.data.balance * 1200;
              this.setState({
                amountEther : Math.round(response.data.balance * 100) / 100,
                amount: Math.round(dollars)
              })       
            })
            .catch((err) => {
            //alert("Something went wrong");   
            });
          })
          .catch((err) => {   
            console.log(err);
            //alert("Something went wrong");            
          });
      
        
      })
      .catch((err) => {
        //console.log(err.response.data);
        //alert("Something went wrong");
        // this.setState({
        //   errorMessage: err.response.data,
        // });
        this.setState({amount: 0});         

      });
  }

  startRide = () => {
    const source = prompt("Please enter Source", "Source");
    const destination = prompt("Please enter Destination", "Destination");

    alert("Ride Started Successfully");
    var html = document.getElementById('tblRidesTaken').innerHTML;
    html += '<th>1</th><th>' + source + '</th><th>' + destination + '</th><th>5/24/2022</th><th>Active</th><th>15$</th>';
    document.getElementById('tblRidesTaken').innerHTML = html;
    this.setState({carStatus:'Booked', amount:"15"});
  }

  render() {
    var redirect = null;
    if(sessionStorage.getItem('userId') === null)
    {
      //redirect = <Redirect to='/login' />;
    }
    return (
      <div>
        {redirect}
        <Navheader />               
        <SideNavbar/>
        <div >   
        <div id = "div1" >
            {/* <input type="textbox" id="txtLanguage" defaultValue={} style=""/> */}
            <label style = {{marginLeft: "40%", marginTop: "12%", color:"white",fontSize:"21px", fontWeight:"100"}}>{sessionStorage.getItem('username')}</label><br/>
            <label style = {{marginLeft:"23%", color:"white", fontSize:"21px", fontWeight:"100"}}>Available Amount : ${this.state.amount == ' ' ? 0 : this.state.amount}</label>
            <label style = {{marginLeft:"23%", color:"white", fontSize:"21px", fontWeight:"100"}}>Available Ether : {this.state.amountEther == ' ' ? 0 : this.state.amountEther}</label>

            {/* <button
              onClick={this.startRide}
              class="btn btn-primary"
              style={{
                backgroundColor: "white",
                border: "0px",
                borderRadius: "6px",
                color:"black",
                marginLeft:"37%",
                marginTop:"2%",
                widtd:"24%"
              }}
            >
              Start Ride
            </button> */}
        </div>
        <div style = {{marginTop:"3%", border: "1px solid", marginLeft:"15%", borderRadius:"15px"}}>
            <label id = "lblCarInfo">Car Information</label>
            <hr style = {{marginTop:"8px"}}></hr>
            <div style = {{marginLeft : "4%"}}>
                <table id = "tblCarInfo">
                    <tr>
                        <th>CAR MODEL</th>
                        <th>CAR NO.</th>
                        <th>CAR COLOR</th>
                        <th>CAR TYPE</th>
                        <th>CAR STATUS</th>
                        {/* <td>BATTERY</td> */}
                    </tr>
                    <tr>
                        <td>{this.state.carModel}</td>
                        <td>{this.state.carNo}</td>
                        <td>{this.state.carColor}</td>
                        <td>{this.state.carType}</td>
                        <td>{this.state.carStatus}</td>    
                        
                    </tr>
                    {/* <tr>
                        <td>BMW X3</td>
                        <td>98765</td>
                        <td>Blue</td>
                        <td>SUV</td>
                        <td>Inactive</td>
                        
                    </tr> */}
                </table>
            </div>
        </div>
        <div style = {{marginTop:"3%", border: "1px solid", marginLeft:"15%",  borderRadius:"15px"}}>
            <label id = "lblCarInfo">Rides Taken</label>
            <hr style = {{marginTop:"8px"}}></hr>
            <div>
                <table id = "tblRidesTaken">
                    <tr>
                        <th>#</th>
                        <th>SOURCE</th>
                        <th>DESTINATION</th>
                        <th>DATE</th>
                        <th>TRIP STATUS</th>
                        <th>AMOUNT</th>
                    </tr>                    
                </table>
            </div>
        </div>
       
       
      </div>
      </div>
    );
  }
}

export default HomePage;
