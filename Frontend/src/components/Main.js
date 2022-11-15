import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Profilepage from './ProfilePage/profilePage';
import LandingPage from './LandingPage/landingPage';
import Login from './Login/login';
import Signup from './Signup/signup';
import HomePageOwner from './Home/Home-Owner';
import HomePageUser from './Home/Home-User';
import UserTransactions from './UserTransactions/UserTransactions'
import HomePageAdmin from './Home/Home-Admin'
import UserTripDetails from './UserTripDetails/UserTripDetails';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import EditDeleteRidesAdmin from './EditDeleteRidesAdmin/EditDeleteRidesAdmin.js';
import EditDeleteUsersAdmin from './EditDeleteUsersAdmin/EditDeleteUsersAdmin.js';
import AdminCharts from './PieCharts/PieCharts';
import VehicleSensorInfo from './VehicleSensorInfo/VehicleSensorInfo'
import carRepairInfo from './CarRepair/carRepair'
import UserTrackingDashboard from './UserTrackingDashboard';
import Map from './Map';
// import "tabler-react/dist/Tabler.css";
import SensorData from "./SensorData";
import Speedometer from "./Speedometer";
import VehicleMotion from "./VehicleMotion";
import AdminTrackingDashboard from "./admin/AdminTrackingDashboard";
import TripStatus from "./TripStatus";

//<Route path="/" component={Navbar}/>
//<Route path="/login" component={Login}/>

class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/profile' component={Profilepage} />
          <Route path='/home-owner' component={HomePageOwner} />
          <Route path='/home-user' component={HomePageUser} />
          <Route path='/userTransactions' component={UserTransactions} />
          <Route path='/home-admin' component={HomePageAdmin} />
          <Route path='/userTripDetails' component={UserTripDetails} />
          <Route path='/profileInfo' component={ProfileInfo} />
          <Route path='/admin-deleteRide' component = {EditDeleteRidesAdmin} />
          <Route path='/admin-deleteUser' component = {EditDeleteUsersAdmin} />
          <Route path='/admin-charts' component = {AdminCharts} />          
          <Route path='/admin-AVSensorInfo' component = {VehicleSensorInfo} />          
          <Route path='/carRepairInfo' component = {carRepairInfo} />  
          <Route path="/userTrackingDashboard" exact component={UserTrackingDashboard} />  
             
          <Route path="/map" exact component={Map}/>          
          <Route path="/SensorData" exact component={SensorData}/>          
          <Route path="/Speedometer" exact component={Speedometer}/>  
          <Route path="/VehicleMotion" exact component={VehicleMotion}/>  
          <Route path="/AdminTrackingDashboard" exact component={AdminTrackingDashboard}/>  
          <Route path="/TripStatus" exact component={TripStatus}/>         
        </Switch>
      </div>
    );
  }
}

export default Main;
