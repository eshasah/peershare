import React, { Component } from 'react';
import {Dropdown, Button, Navbar, Nav, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';


function EditDeleteRidesAdmin(){

    function getAllRides(){

        axios.get("http://localhost:3001/admin/rides",{
            headers:{
              'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzY4MzU2NjIsImlhdCI6MTYzNjc4MTY2Miwic3ViIjo1M30.fYfotgf91fZByYXceLaQw7IyAzupV9ftAFSHMIPAJb8"  
            }
        })
        .then((response)=>{
            console.log(response.data.data);
            changeAllRides(response.data.data);
            
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const deleteRide =  async(event)=>{

        console.log("Ride being deleted is",ride);
        if(ride.RideID != -1){
            const RideID = ride;
            console.log(RideID);
            if(ride.RideStatus === "booked" || ride.RideStatus === "completed"){ /// Checking status of rides
                    const response = await axios.delete(`http://localhost:3001/admin/rides/${RideID}`,{
                    headers:{
                        'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzY4MzU2NjIsImlhdCI6MTYzNjc4MTY2Miwic3ViIjo1M30.fYfotgf91fZByYXceLaQw7IyAzupV9ftAFSHMIPAJb8"  
                    }}
                )
                console.log(response.status);
                if(response.status == 200){
                    console.log(response.data);
                    changeResult("Ride has been deleted!");
                }

                if(response.status == 400){
                    changeResult("Ride could not be deleted!");
                } 

            }else{
                changeResult("You can  only delete rides which are booked or completed");
            }
                   

        }else{
            console.log("First select in the dropdown ");
        }

    }

    const[allRides, changeAllRides] = useState([]);
    const[ride, changeRide] = useState({});
    const[result, changeResult] = useState("");

    useEffect(()=>{
        getAllRides();
    },[])

    let isloggedin = null;

    if (cookie.load('cookie')) {
      console.log('Able to read cookie');
      const profilepic = sessionStorage.getItem('profilepic');
      isloggedin = (
        <ul className='nav navbar-nav navbar-right'>
          <li>
            <Button className='Home-default' variant='default'>
              <Link to='/dashboard'> Home </Link>
            </Button>
          </li>
          <li>
            <Image
              src={profilepic}
              className='avatar'
              alt='profile pic'
              roundedCircle
            />
          </li>
          <li>
            Hi, {sessionStorage.getItem('username')}{' '}
            {/* <Dropdown id='nav-dropdown' default>
              Hi, {sessionStorage.getItem('username')}{' '}
              {sessionStorage.getItem('mileage_reward')}
              <Dropdown.Toggle variant='default' />
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link
                    className='logout-class'
                    to='/'
                    onClick={this.handleLogout}
                  >
                    Logout
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </li>
          <li>
            <Link className='nav-link1' to='/profile'>
              My Profile{' '}
            </Link>
          </li>
          <li>
            <Link className='logout-class' to='/' onClick={this.handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      console.log('Not Able to read cookie');
      isloggedin = (
        <ul className='nav navbar-nav navbar-right'>
          <li>
            <Button className='login-default'>
              <Link to='/login'>Login </Link>
            </Button>

            <Button className='Signup-default'>
              <Link to='/signup'>Create Account</Link>
            </Button>
          </li>
        </ul>
      );
    }
   

    return (
        <div>
            <Navbar className='navbar-default'>
                <Navbar.Brand classname='Navbar-Brand' variant='light' href='/'>
                    <img src='/car_Icon.png' className='icon' alt='icon' />
                    <span className='NavItem'>Autonomous Car Rental Services</span>
                </Navbar.Brand>
                <Navbar.Collapse class='nav navbar-nav navbar-right'>
                    {/* <ul class='nav navbar-nav navbar-right'> */}
                    <Nav>{isloggedin}</Nav>
                    {/* </ul> */}
                </Navbar.Collapse>
            </Navbar>

            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                    <Row>
                    <Dropdown>
                        <Dropdown.Toggle variant = "success" id="dropdown-basic">
                        Select rides to delete
                        </Dropdown.Toggle>

                        <Dropdown.Menu>

                        {allRides.map((ride)=>(
                            <Dropdown.Item 
                            value ={ride.RideID}
                            onClick={(event)=>{
                                console.log(ride.RideID);
                                changeRide(ride);
                            }}

                            >
                                Ride ID:{ride.RideID}
                            </Dropdown.Item>
                        ))}

                        </Dropdown.Menu>

                    </Dropdown>

                    <Button onClick={(event)=>{
                        deleteRide(event);
                    }}>
                        Delete
                    </Button>
                    {result} 
                    </Row>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>

            
        </div>
      
    );
}
  
export default EditDeleteRidesAdmin;



