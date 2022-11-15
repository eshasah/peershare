import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import axios from "axios";
import Navheader from '../Navbar/navbar';
import SideNavbar from '../Navbar/SideNavbar-Admin';
import './PieCharts.css';
import {url} from '../Constants'
import {Chart} from'react-google-charts'

class PieCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  demo = () => {
    
     
  }
  componentWillMount(){
    const allUsersInfo = JSON.parse(sessionStorage.getItem('allUsersInfo')); 
    const allCarsInfo = JSON.parse(sessionStorage.getItem('allCarsInfo')); 
    var usersCount = 2;
    var adminsCount = 1;
    var ownersCount = 3;

    // for(var i = 0; i < allUsersInfo.length; i++)
    // {
    //   if(allUsersInfo[i].UserRole === 'user')
    //   {
    //     usersCount++;
    //   }
    //   else if(allUsersInfo[i].UserRole === 'admin')
    //   {
    //     adminsCount++;
    //   }
    //   else if(allUsersInfo[i].UserRole === 'carowner')
    //   {
    //     ownersCount++;
    //   }
    // }

    var VehcileScheduleStatusBooked = 1;
    var VehcileScheduleStatusIdle = 2;

    // for(var i = 0; i < allCarsInfo.length; i++)
    // {
    //   if(allCarsInfo[i].VehcileScheduleStatus == 'booked')
    //   {
    //     VehcileScheduleStatusBooked++;
    //   }
    //   else if(allCarsInfo[i].VehcileScheduleStatus == 'idle')
    //   {
    //     VehcileScheduleStatusIdle++;
    //   }
    // }

    const vehiclePieScheduleArray = [
      ['Task', 'Autonomous Vehicle Scehdule State'],
    ['Booked', VehcileScheduleStatusBooked],
    ['Idle', VehcileScheduleStatusIdle]
    ]; 

     const userPieArray  = [
      ['Task', 'No. Of Users'],
      ['Car Owner', ownersCount],
      ['Users', usersCount],
      ['Admin', adminsCount]      
    ];
    this.setState({
      vehiclePieScheduleArray : vehiclePieScheduleArray,
      userPieArray : userPieArray
    })
  }

  render() {
    const ownersCount = this.state.ownersCount;
    const usersCount = this.state.usersCount;
    const adminsCount = this.state.adminsCount;
    return (
      <div>
        <Navheader />
        <SideNavbar/>
        {}
        <div>
        <Chart
  width={'500px'}
  height={'300px'}
  style = {{marginLeft: "28%"}}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={this.state.userPieArray}
  options={{
    title: 'Number of Users',
    // Just add this option
    is3D: true,
  }}
  rootProps={{ 'data-testid': '2' }}
/>

{/* <Chart
  width={'500px'}
  height={'300px'}
  style = {{marginLeft: "28%"}}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Task', 'Autonomous Vehicle State'],
    ['Active', ],
    ['Inactive', 6],
    ['Not Working', 0],
    
  ]}
  options={{
    title: 'Autonomous Vehicle State',
    // Just add this option
    is3D: true,
  }}
  rootProps={{ 'data-testid': '2' }}
/> */}

<Chart
  width={'500px'}
  height={'300px'}
  style = {{marginLeft: "28%"}}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={this.state.vehiclePieScheduleArray}
  options={{
    title: 'Vehicle State',
    // Just add this option
    is3D: true,
  }}
  rootProps={{ 'data-testid': '2' }}
/>
        </div>       
      </div>
    );
  }
}

export default PieCharts;
