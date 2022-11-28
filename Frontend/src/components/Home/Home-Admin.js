import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import axios from "axios";
import Navheader from '../Navbar/navbar';
import SideNavbar from '../Navbar/SideNavbar-Admin';
import './Home-Owner.css';
import {url} from '../Constants'

class HomePageAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    //API calls to get user data
    axios.defaults.withCredentials = true;
    // let config = {
    //   headers: {
    //     'Authorization': 'Bearer ' + sessionStorage.getItem('auth')
    //   }
    // }

    
    axios
    .get(url + '/car/getCarsList')
    .then((response) => {
        console.log('Status Code : ', response.status);
        console.log('response ', response.data);
           
        if(response.data != false)
        {
           sessionStorage.setItem('allCarsInfo', JSON.stringify(response.data.data[0]));
           var carInfoHtml = document.getElementById('tblCarInfoAdmin').innerHTML;
           for(var i = response.data.data[0].length - 1; i >= 0; i--)
           {
			  //  if(response.data.data[0].length - i == 5)
				//    break;
            carInfoHtml += '<tr><td>' + response.data.data[0][i].model + '</td><td>' + response.data.data[0][i].registration+ '</td><td>' + (response.data.data[0][i].color == null ? 'black' : response.data.data[0][i].color)+ '</td><td>' + (response.data.data[0][i].make == null ? 'Sedan' : response.data.data[0][i].make)+ '</td><td>' + response.data.data[0][i].status+ '</td></tr>'
           }
           
           document.getElementById('tblCarInfoAdmin').innerHTML = carInfoHtml;
           axios
           .get(url + '/user/getAllUsersInfo')
           .then((response) => {
               console.log('Status Code : ', response.status);
               console.log('response ', response.data);
                  
               if(response.data != false)
               {
                  sessionStorage.setItem('allUsersInfo', JSON.stringify(response.data.data.user));
                  var userInfoHtml = document.getElementById('tblUserInfoAdmin').innerHTML;
                  for(var i = 0; i < response.data.data.user.length; i++)
                  {
                    userInfoHtml += '<tr><td>' + response.data.data.user[i].f_name + ' ' + response.data.data.user[i].l_name + '</td><td>' + response.data.data.user[i].user_type+ '</td><td>' + response.data.data.user[i].email_id+ '</td><td>' + (response.data.data.user[i].eth_account)+ '</td></tr>';
                  }     
       
                  document.getElementById('tblUserInfoAdmin').innerHTML = userInfoHtml;                  
               }
                    
               console.log(response.data);          
            })
           .catch((err) => {            
               //alert("Something went wrong");            
           });
        }
             
        console.log(response.data);          
     })
    .catch((err) => {            
        //alert("Something went wrong");            
    });
  }

  // onclickbtnAccessSensorInfo = () => {
  //   this.props.history.push('/admin-AVSensorInfo');
  // }

  render() {
    return (
      <div>
        <Navheader />
        <SideNavbar/>
        <div>
        {/* <button
              onClick= {this.onclickbtnAccessSensorInfo}
              class="btn btn-primary"
              style={{
                backgroundColor: "#034672",
                border: "0px",
                borderRadius: "6px",
                color:"white",
                marginLeft:"2%",
                marginTop:"2%",
                width:"12%"
              }}
            >
              Access Sensor Data
            </button> */}
            {/* <button
              //onClick={}
              class="btn btn-primary"
              style={{
                backgroundColor: "#034672",
                border: "0px",
                borderRadius: "6px",
                color:"white",
                marginLeft:"1%",
                marginTop:"2%",
                width:"12%"
              }}
            >
              Access Image Data
            </button> */}
        </div>
        <div></div>
        <div></div>       
        <div style = {{marginTop:"3%", border: "1px solid", marginLeft:"15%", borderRadius:"15px"}}>
            <label id = "lblCarInfo">All Cars Information</label>
            <hr style = {{marginTop:"8px"}}></hr>
            <div style = {{marginLeft: "4%"}}>
                <table id = "tblCarInfoAdmin">
                    <tr>
                        <th>CAR MODEL</th>
                        <th>CAR NO.</th>
                        <th>CAR COLOR</th>
                        <th>CAR TYPE</th>
                        <th>CAR STATUS</th>                        
                    </tr>                      
                </table>
            </div>
        </div>
        <div style = {{marginTop:"3%", border: "1px solid", marginLeft:"15%", borderRadius:"15px"}}>
            <label id = "lblCarInfo">All Users Information</label>
            <hr style = {{marginTop:"8px"}}></hr>
            <div  style = {{marginLeft: "4%"}}>
                <table id = "tblUserInfoAdmin">
                    <tr>
                        <th>USERNAME</th>
                        <th>ROLE</th>
                        <th>EMAIL</th>
                        <th>ETH_Account</th>                       
                    </tr>                       
                </table>
            </div>
        </div>
       
       
      </div>
    );
  }
}

export default HomePageAdmin;
