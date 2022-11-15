import * as React from "react";
import { useState } from 'react';
import '../userTracking.css'
import Navheader from '../Navbar/navbar';
import SideNavbar from '../Navbar/SideNavbar-Admin';
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
import "../../customstyles.css";

import TrackRides from "./TrackRides";
import SiteWrapper from "../SiteWrapper";
import { Navbar } from "react-bootstrap";

export default class AdminTrackingDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rideId: this.props.rideData   
     // rideId: 86
    }
    console.log(this.state)
  }
  render() {
    //const {data} = this.state;
    console.log(this.state);
    return (
      <SiteWrapper>
        <Navheader/>
        <SideNavbar/>

        <Page.Content title="Admin Tracking Dashboard">
          <Grid.Row cards={true}>
          
                <Grid.Col sm={6}>
                  <TrackRides rideData={this.state}
                  />
                
            </Grid.Col>
          </Grid.Row>
        </Page.Content>
      </SiteWrapper>
    );
  }
}

