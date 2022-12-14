import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import Navheader from '../Navbar/navbar';
import SideNavbar from '../Navbar/SideNavbar-User';
import './UserTripDetails.css';
import axios from 'axios';
import { url, ownerBearer, userBearer, adminBearer } from '../Constants';

class UserTripDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 100
    };
  }

  componentDidMount(){
    // var html = document.getElementById('tblUserCarInfo').innerHTML;
    // html += '<tr><th>1</th><th>Santa Clara</th><th>San Francisco</th><th>5/24/2022</th><th>15$</th><th>Trip Booked</th></tr>';  
    // document.getElementById('tblUserCarInfo').innerHTML = html;
    // return;
    //API calls to get user data
    axios.defaults.withCredentials = true;
    // make a post request with the user data
    axios
      .get(url + '/ride/getUserTripDetails?userId=' + sessionStorage.getItem('userid'))
      .then((response) => {
        console.log('Status Code : ', response.status);
        console.log('response ', response.data);
        if (response.status === 200) {
          var html = document.getElementById('tblUserCarInfo').innerHTML;
          //var fare = 0;
          for(var i = 0; i < response.data.data.length; i++){
            //fare += response.data[i].RideStatus === 'booked' ? 0 : response.data[i].RideAmount;
            //const status = response.data[i].RideStatus === 'booked' ? '-' : response.data[i].RideAmount;
            html += "<tr><td>" + (i + 1) + "</td><td>" + response.data.data[i].source+ "</td><td>" + response.data.data[i].destination + "</td><td>" + response.data.data[i].created_at.substring(0, 10) + "</td><td>" + response.data.data[i].ride_amount + "</td><td>" + response.data.data[i].ride_status + "</td></tr>";   
          }

          //fare -= this.state.amount;
          

          document.getElementById('tblUserCarInfo').innerHTML = html;

          const data = {walletId: '0xe58A0dcADE74a3Ce842D5F0E360Fe9839b34f70c'};//sessionStorage.getItem('walletId')
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
        }
        else {        
            //alert("Something went wrong");        
        }
      })
      .catch((err) => {
        //alert("Something went wrong");   
      });
  }

  addMoney = () => {
    var val = window.confirm("Rediecting to the Payments Page");
  }
  render() {
    return (
      <div>
        <Navheader />
        <SideNavbar/>
        <div id = "div1">
            {/* <input type="textbox" id="txtLanguage" defaultValue={} style=""/> */}
            <label style = {{marginLeft: "40%", marginTop: "12%", color:"white",fontSize:"21px", fontWeight:"100"}}>{sessionStorage.getItem('username')}</label><br/>
            <label style = {{marginLeft:"23%", color:"white", fontSize:"21px", fontWeight:"100"}}>Available Amount : ${this.state.amount}</label>
            <label style = {{marginLeft:"23%", color:"white", fontSize:"21px", fontWeight:"100"}}>Available Ether : {this.state.amountEther}</label>
            {/* <button
              onClick={this.addMoney}
              class="btn btn-primary"
              style={{
                backgroundColor: "white",
                border: "0px",
                borderRadius: "6px",
                color:"black",
                marginLeft:"37%",
                marginTop:"2%",
                width:"22%"
              }}
            >
              Add Money
            </button> */}
        </div>
        <div style = {{marginTop:"3%", border: "1px solid", marginLeft:"15%", borderRadius:"15px"}}>
            <label id = "lblCarInfo">User Trip Details</label>
            <hr style = {{marginTop:"8px"}}></hr>
            <div style = {{marginLeft : "4%"}}>
                <table id = "tblUserCarInfo">
                    <tr>
                        <th>#</th>
                        <th>SOURCE</th>
                        <th>DESTINATION</th>
                        <th>DATE</th>
                        <th>AMOUNT</th>
                        <th>TRIP STATUS</th>
                        {/* <td>BATTERY</td> */}
                    </tr>                  
                </table>
            </div>
        </div>       
      </div>
    );
  }
}

export default UserTripDetails;
