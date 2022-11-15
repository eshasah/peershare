import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import Navheader from '../Navbar/navbar';
import SideNavbarOwner from '../Navbar/SideNavbar-Owner';
import SideNavbarUser from '../Navbar/SideNavbar-User';
import SideNavbarAdmin from '../Navbar/SideNavbar-Admin';
import './ProfileInfo.css';
import {url} from '../Constants';
import axios from "axios";



class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        test : ""
    };
  }

  componentWillMount(){
    //API calls to get user data
    // axios.defaults.withCredentials = true;
    // // make a post request with the user data
    // axios
    //   .get(url + '/getUserDetails?userId=' + sessionStorage.getItem('userid'))
    //   .then((response) => {
    //     console.log('Status Code : ', response.status);
    //     console.log('response ', response.data);
    //     if (response.status === 200) {
    //       sessionStorage.setItem('firstName', response.data[0].FirstName);
    //       sessionStorage.setItem('lastName', response.data[0].LastName);
    //       sessionStorage.setItem('userPhone', response.data[0].UserPhone);
    //       sessionStorage.setItem('birthday', response.data[0].Birthday);
    //       sessionStorage.setItem('gender', response.data[0].Gender);  
    //     } else {
    //       alert("Something went wrong");                  
    //     }
    //   })
    //   .catch((err) => {       
    //     alert("Something went wrong")        
    //   });
  }

  saveUserDetails = () => {
    const data = {
      userId : sessionStorage.getItem('userid'),
      firstName : document.getElementById('txtFirstName').value,
      lastName : document.getElementById('txtLastName').value,
      birthday : document.getElementById('txtBirthday').value,
      gender : document.getElementById('txtGender').value,
      phone : document.getElementById('txtPhone').value
    }

    sessionStorage.setItem('firstName', data.firstName);
            sessionStorage.setItem('lastName', data.lastName);
            sessionStorage.setItem('userPhone', data.phone);
            sessionStorage.setItem('birthday', data.birthday);
            sessionStorage.setItem('gender', data.gender); 

            alert("User Details Saved successfully"); 
            window.location.reload(); 
            return;
            
    axios.defaults.withCredentials = true;
      // make a post request with the user data
      axios
        .post(url + '/saveUserDetails', data)
        .then((response) => {
          console.log('Status Code : ', response.status);
          if (response.status === 200) {            
            sessionStorage.setItem('firstName', data.firstName);
            sessionStorage.setItem('lastName', data.lastName);
            sessionStorage.setItem('userPhone', data.phone);
            sessionStorage.setItem('birthday', data.birthday);
            sessionStorage.setItem('gender', data.gender);  
            alert("User Details Saved successfully"); 
            window.location.reload();           
          } else {
            //alert("Something went wrong");          
          }
        })
        .catch((err) => {
          console.log(err.response);
          //alert("Something went wrong");          
        });
    
  }

  render() {
    var sidenavbar;
    if(sessionStorage.getItem("userType") == 'carowner')
    {
      sidenavbar = <SideNavbarOwner/>
    }
    else if(sessionStorage.getItem("userType") == 'admin')
    {
      sidenavbar = <SideNavbarAdmin/>
    }
    else if(sessionStorage.getItem("userType") == 'user')
    {
      sidenavbar = <SideNavbarUser/>
    }

    
    return (
      
      <div>
          
        <Navheader />
        {sidenavbar}
        <div style = {{width: "60%", border: "1px solid", marginLeft: "17%", borderRadius: "15px"}}>
            <br/>
            <div style = {{marginLeft: "2%"}}>
            <img style = {{width:"25%"}} src = 'https://images.ctfassets.net/q8mvene1wzq4/3vPjFHVyZSHnLO1Xw801BY/c753a2cfa6a2b2963d5955ecb134ff41/Graphic_icon.svg?w=1500&q=60&fm='></img><br/>

            <label style = {{fontWeight: "100", fontSize: "19px"}}>Role</label><br/> <br/>
            <input type = 'textbox' id = 'txtRole' defaultValue = {sessionStorage.getItem('userType')} style = {{borderRadius: "5px"}} readOnly></input><br/><br/>
            <label style = {{fontSize:"20px"}}>General Information</label><br/>
            <label>First Name</label>
            <label style = {{marginLeft: "27%"}}>Last Name</label><br/>
            <input type = 'textbox' id = 'txtFirstName' style = {{borderRadius: "5px"}} defaultValue = {sessionStorage.getItem('firstName')}></input>
            <input type = 'textbox' id = 'txtLastName' style = {{borderRadius: "5px", marginLeft:"8%"}} defaultValue = {sessionStorage.getItem('lastName')}></input><br/><br/>
            <label>Birthday</label>
            <label style = {{marginLeft: "30%"}}>Gender</label><br/>
            <input type = 'textbox' id = 'txtBirthday' style = {{borderRadius: "5px"}} placeholder = "mm/dd/yyyy" ></input>
            <input type = 'textbox' id = 'txtGender' style = {{borderRadius: "5px", marginLeft:"8%"}} defaultValue = {sessionStorage.getItem('gender') === 'null' ? '' : sessionStorage.getItem('gender')}></input><br/><br/>
            <label>Email</label>
            <label style = {{marginLeft: "33%"}}>Phone</label><br/>
            <input type = 'textbox' id = 'txtEmail' style = {{borderRadius: "5px"}} defaultValue = {sessionStorage.getItem('useremail')} readOnly></input>
            <input type = 'textbox' id = 'txtPhone' style = {{borderRadius: "5px", marginLeft:"8%"}} defaultValue = {sessionStorage.getItem('userPhone') === 'null' ? '' : sessionStorage.getItem('userPhone')}></input><br/><br/>
            <button onClick = {this.saveUserDetails} style = {{borderRadius: "5px", border : " 1px solid", height: "33px", background: "#034672", color: "white", width:"122px", marginBottom: "2%"}}>Save Details</button>
            </div>
        </div>      
      </div>
    );
  }
}

export default ProfileInfo;
