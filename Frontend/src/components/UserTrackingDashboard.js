import * as React from "react";
import { useState } from 'react';
import axios from "axios";
import URLs from "../URLs";
import Navheader from './Navbar/navbar';
import Navbar from './Navbar/SideNavbar-User'
//import "tabler-react/dist/Tabler.css";


import {
  Page,
  Avatar,
  Icon,
  Grid,
  Card,
  Text,
  Table,
  Alert,
  Progress,
  colors,
  Dropdown,
  Button,
  StampCard,
  StatsCard,
  ProgressCard,
  Badge,
} from "tabler-react";
import C3Chart from "react-c3js";
import "../c3jscustom.css";
import "../customstyles.css";
import SiteWrapper from "./SiteWrapper";
import ChartsPage from "../components/ChartsPage";
import MapComponent from "../components/Map";
import SensorData from "../components/SensorData";
import Speedometer from "../components/Speedometer";
import VehicleMotion from "../components/VehicleMotion";
import Direction from "../components/Direction";
import TripStatus from "../components/TripStatus";

export default class UserTrackingDashboard extends React.Component { 
  constructor(props) {
    super(props);
      this.state = {
        //rideId: this.props.rideData   
        rideId: sessionStorage.getItem('rideId') === null ? this.props.rideData : sessionStorage.getItem('rideId'),
        showStatus:this.props.showStatus,
        isAdmin:this.props.isAdmin,
        title: this.props.title?this.props.title:"User Tracking Dashboard"
    }
    console.log(this.state)
  }

  //  getRideData = async () => {
  //   try {
  //     console.log("fetch sensordata");
  //     var rideId = 86;
  //     const response = await axios.get(`${URLs.baseURL}/getSensorData?rideId=${rideId}`);
  //     if (response.data.success) {
  //         var data = response.data.message[0];
  //         sessionStorage.setItem('sensorData', JSON.stringify(data));
  //         console.log(data);
  //         this.setState({ direction: data['Heading Direction'] });
  //         this.setState({ color: data['Heading Direction']=='W'?"red":data['Heading Direction']=='E'?"yellow":data['Heading Direction']=='S'?"green":data['Heading Direction']=='N'?'green':'orange' });
  //         this.setState({ width: 100});
  //         console.log("fetch sensordata");

  //     } else {
  //         //alert(response.data.message);
  //     }
  // } catch (error) {
  //     console.log("Error with fetching rides: ", error);
  //     alert(
  //         "Error with fetching ride. Please check the console for more info."
  //     );
  // }
  // }
  componentWillMount() {
    //this.getRideData();
  }
  render() {
    //const {data} = this.state;
    console.log(this.state);
    return (
      <div>
        <Navheader /><Navbar />
        <div>
          {/*  */}
          <div style={{float:"left", width:"22%"}}><Speedometer width = "25%" rideData = {this.state} /></div>
          <div style = {{width:"25%", float:"left", marginLeft:"2%"}}><Direction rideData={this.state} /></div>
          <div style={{width:"22%", position:"absolute", marginLeft:"38%", marginTop:"9%"}}><TripStatus rideData = {this.state}/></div>
          <div style={{position:"absolute", marginLeft:"14%", marginTop:"25%"}}><MapComponent  rideData = {this.state}/></div>
        </div>
      </div>
     );
    //   <SiteWrapper>
    //     {this.state.isAdmin?(<div></div>)
    //     :(<><Navheader /><Navbar /></>)}
  
    //     <Page.Content title={this.state.title}>
    //       <Grid.Row cards={true}>

    //         {/* <Grid.Col lg={6}>
    //           <SensorData rideData = {this.state} />
    //         </Grid.Col> */}

    //         <Grid.Col md={6}>
    //           <Grid.Row>
    //             <Grid.Col sm={6}>
    //               <Speedometer rideData = {this.state}                    
    //               />
    //             </Grid.Col>
    //             {/* <Grid.Col sm={6}>
    //               <VehicleMotion rideData = {this.state}  />
    //             </Grid.Col> */}
    //             <Grid.Col sm={6}>
    //               <Direction rideData={this.state} />
    //               {/* <ProgressCard
    //                 header="Vehicle Direction"
    //                 content="W"
    //                 progressColor="red"
    //                 progressWidth={28}
    //               /> */}
    //             </Grid.Col>
                             
    //             <Grid.Col sm={6}>
    //               <TripStatus rideData = {this.state}/>
    //             </Grid.Col>  
    //             <Grid.Col>
    //           {/* <MapContainer/> */}
    //           <MapComponent  rideData = {this.state}/>
    //         </Grid.Col>            
    //           </Grid.Row>
    //         </Grid.Col>


    //       </Grid.Row>
    //       <Grid.Row>           
            
    //         {/* <Grid.Col width={100}>
    //           <ChartsPage rideData = {this.state}  />
    //         </Grid.Col> */}
          
    //       </Grid.Row>
    //     </Page.Content>
    //   </SiteWrapper>
    // );
  }
}

