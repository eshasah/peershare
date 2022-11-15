import React, { Component } from 'react';
import { Image } from 'react-bootstrap';



class SideNavbarOwner extends Component {
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
        
        <div style = {{height:"147vh", width:"14%", float:"left", border:"1px solid", marginTop:"2px solid", background:"#034672", marginTop:"-41px", color:"white"}}>
          <ul>
            <li><a href = 'home-owner' style = {{color: "white"}}>Dashboard</a></li>           
            <li><a href = 'profileInfo' style = {{color: "white"}}>My Profile</a></li>  
          </ul>      
        </div>       
      </div>
    );
  }
}

export default SideNavbarOwner;
