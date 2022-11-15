import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import axios from "axios";
import Navheader from '../Navbar/navbar';
import SideNavbar from '../Navbar/SideNavbar-Admin';
import  './carRepair.css';
import {url} from '../Constants'
import {Chart} from'react-google-charts'

class VehicleSensorInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { repairCount: 0,
      allCarsInfo: []};
  }

  demo = () => {
    
     
  }
  componentDidMount(){
    let allCarsInfo = JSON.parse(sessionStorage.getItem('allCarsInfo')); 
    var html = document.getElementById("tblVehicleInfo").innerHTML;
    var count = 0;
    var arr = [];
    allCarsInfo = [{VehcileModel : "Toyota Corolla", VehcileNum : "CA98765",  VehcileStatus: "Perfect", VehcileID:"1"}, {VehcileModel : "Honda Civic", VehcileNum : "CA54387",  VehcileStatus: "Perfect", VehcileID:"2"}, {VehcileModel : "Mazda CX5", VehcileNum : "CA82635",  VehcileStatus: "Perfect", VehcileID:"3"}];

    for(var i = 0; i < allCarsInfo.length; i++) {
      if(allCarsInfo[i].VehcileStatus === 'Repair') {
        html += "<tr><td>" + allCarsInfo[i].VehcileModel + " " + allCarsInfo[i].VehcileNum + "</td><td>Repair</td><td></td></tr>";
        //arr.push("btn" + allCarsInfo[i].VehcileID);
        count++;
      }
      else {
        html += "<tr><td>" + allCarsInfo[i].VehcileModel + " " + allCarsInfo[i].VehcileNum + "</td><td> <label id = '" + allCarsInfo[i].VehcileID + "'>Active</label></td><td><button id = 'btn" + allCarsInfo[i].VehcileID +"'>Repair</button></td></tr>";
       
        arr.push("btn" + allCarsInfo[i].VehcileID);        
      }
    }

    document.getElementById("tblVehicleInfo").innerHTML = html;

    for(var i = 0; i < arr.length; i++) {
      document.getElementById(arr[i]).onclick = this.repair;
    }
    
    this.setState({
      repairCount: count,
      allCarsInfo: allCarsInfo
    })
    

    //document.getElementById('divVehicleInfo').innerHTML = html;
  }

  repair = (e) => {
    document.getElementById(e.target.id).style.display = "none";
    document.getElementById("2").innerHTML = "Repair";
    this.setState({
      repairCount: 1
    })
    
    const data = {
      vehicleId : e.target.id.substring(3,e.target.id.length)
    }

    // axios
    // .post(url + '/repairVehicle', data)
    // .then((response) => {
    //   alert("Vehicle sent to garage for repair");
    //   var allCarsInfo = this.state.allCarsInfo;
    //   for(var i = 0; i < allCarsInfo.length; i++) {
    //     if(allCarsInfo[i].VehcileID == data.vehicleId) {
    //       allCarsInfo[i].VehcileStatus = 'Repair';
    //       break;
    //     }
    //   }

    //   sessionStorage.setItem('allCarsInfo', JSON.stringify(allCarsInfo));
    //   window.location.reload();
    // })
    // .catch((err) => {            
    //   //alert("Something went wrong");            
    // });
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
          <div id = 'divVehicleInfo' style = {{float: "left"}}>
          <label style = {{fontSize:"30px", marginLeft:"20px"}}>   Status of Vehicles:</label>
          <table id = 'tblVehicleInfo'>
              <tr>
                  <th>Vehicle Name:</th>
                  <th>Status:</th>
                  <th></th>
              </tr>         
          </table>
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
  style = {{marginLeft: "35%"}}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[['Task', 'Autonomous Vehicle Moving States'],
  ['Repairing', this.state.repairCount],
  ['In Service', this.state.allCarsInfo.length - this.state.repairCount],
 
  ]}
  options={{
    title: 'Vehicle Out of Service Moving States',
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
