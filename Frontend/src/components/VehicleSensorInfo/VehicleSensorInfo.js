import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import axios from "axios";
import Navheader from '../Navbar/navbar';
import SideNavbar from '../Navbar/SideNavbar-Admin';
import './VehicleSensorInfo.css';
import {url} from '../Constants'
import {Chart} from'react-google-charts'

class VehicleSensorInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  demo = () => {
    
     
  }
  componentDidMount(){
    const allCarsInfo = JSON.parse(sessionStorage.getItem('allCarsInfo')); 
    var html = "<option>Select AV<option>";
    for(var i = 0; i < allCarsInfo.length; i++)
    {
      const curVal = allCarsInfo[i].VehcileModel + ' ' + allCarsInfo[i].VehcileNum;
      html += '<option value = '+ curVal+'>' + curVal + '</option>';
    }
    

    document.getElementById('dropdownVehicleList').innerHTML = html;
  }

  onChangeVehicleDropdown = (e) => {
    if(e.target.value == '' || e.target.value == 'Select AV')
    {
      document.getElementById('divDisplaySensorInfo').style.display = 'none';
      return;
    }

    document.getElementById('divDisplaySensorInfo').style.display = '';
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
          <div id = 'divVehicleInfo'>
            <select style = {{width: "14%", border: "2px solid", borderRadius: "5px", fontSize: "17px"}} id = 'dropdownVehicleList' onChange = {this.onChangeVehicleDropdown}></select>
          </div>
          <div id = 'divDisplaySensorInfo' style = {{display : 'none'}}>
          <label>Vehicle Number</label>
            <label style = {{marginLeft: "14%"}}>Tailight Status</label><br/>
            <input type = 'textbox' id = 'txtFirstName' style = {{borderRadius: "5px"}} defaultValue = {'123456'}></input>
            <input type = 'textbox' id = 'txtLastName' style = {{borderRadius: "5px", marginLeft:"8%"}} defaultValue = {'ON'}></input><br/><br/>
            <label>Road Info</label>
            <label style = {{marginLeft: "17%"}}>HeadLight Status</label><br/>
            <input type = 'textbox' id = 'txtBirthday' style = {{borderRadius: "5px"}} placeholder = "" ></input>
            <input type = 'textbox' id = 'Gender' style = {{borderRadius: "5px", marginLeft:"8%"}} defaultValue = 'ON'></input><br/><br/>
            <label>Temperature Status</label>
            <label style = {{marginLeft: "12%"}}>GPS</label><br/>
            <input type = 'textbox' id = 'txtEmail' style = {{borderRadius: "5px"}} defaultValue = '55.2 C' readOnly></input>
            <input type = 'textbox' id = 'txtPhone' style = {{borderRadius: "5px", marginLeft:"8%"}} defaultValue = "0.002456766889, -0.00254665"></input><br/><br/>
          </div>
        <Chart
  width={'500px'}
  height={'300px'}
  style = {{marginLeft: "28%"}}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[['Task', 'Autonomous Vehicle Moving States'],
  ['Stopped', 4],
  ['Forward', 3],
  ['Backward', 1],
  ['Idle',5]
  ]}
  options={{
    title: 'Autonomous Vehicle Moving States',
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

export default VehicleSensorInfo;
