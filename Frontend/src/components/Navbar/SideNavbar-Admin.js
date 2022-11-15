import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

class SideNavbarAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    //API calls to get user data
  }

  render() {
    return (
      <div>
        
        <div style = {{height:"500vh", width:"14%", float:"left", border:"1px solid", marginTop:"2px solid", background:"#034672", marginTop:"-23px", color:"white"}}>
          <ul>
            <li><a href = 'home-admin' style = {{color: "white"}}>Dashboard</a></li>  
            <li><a href = 'admin-charts' style = {{color: "white"}}>Comparision Charts</a></li>  
            <li><a href = 'profileInfo' style = {{color: "white"}}>My Profile</a></li>              
            {/* <li><a href = 'admin-deleteUser' style = {{color: "white"}}>Delete Users</a></li>
            <li><a href = 'admin-deleteRide' style = {{color: "white"}}>Delete Rides</a></li>   */}      
            {/* <li><a href = 'admin-AVSensorInfo' style = {{color: "white"}}>AV Sensor Info</a></li>  */}
            <li><a href = 'AdminTrackingDashboard' style = {{color: "white"}}>Admin Tracking Dashboard</a></li>              
            <li><a href = 'carRepairInfo' style = {{color: "white"}}>Car Repair Information</a></li>              
          </ul>      
        </div>       
      </div>
    );
  }
}

export default SideNavbarAdmin;
