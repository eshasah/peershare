import React, { Component } from 'react';
import {Dropdown, Button, Nav, Navbar,Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

//import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';



function EditDeleteUsersAdmin(){

    function getAllUsers(){
        axios.get("http://localhost:3001/admin/users",{
            headers:{
              'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzY4MzU2NjIsImlhdCI6MTYzNjc4MTY2Miwic3ViIjo1M30.fYfotgf91fZByYXceLaQw7IyAzupV9ftAFSHMIPAJb8"  
            }
        })
        .then((response)=>{
            console.log(response.data);
            changeAllUsers(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const deleteUser =  async(event)=>{

        console.log("User being deleted is",user);

        if(user != -1){
            const userId = user;
            console.log(userId);
            const response = await axios.delete(`http://localhost:3001/admin/user/${userId}`,{
                headers:{
                    'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzY4MzU2NjIsImlhdCI6MTYzNjc4MTY2Miwic3ViIjo1M30.fYfotgf91fZByYXceLaQw7IyAzupV9ftAFSHMIPAJb8"  
                }}
            )
            console.log(response.status);
            console.log(response.data);

            if(response.status == 200){
                console.log("user has been deleted");
            }

            if(response.status == 400){
                console.log("User cannot be deleted");
            }


        }else{
            console.log("First select in the dropdown ");
        }

    }

    


    const[allUsers, changeAllUsers] = useState([]);
    const[user, changeUser] = useState(-1);

    useEffect(()=>{
        getAllUsers();
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

            <Row>
                <Col></Col>
                <Col>
                <Row>
                    <Dropdown>
                        <Dropdown.Toggle variant = "success" id="dropdown-basic">
                        Select user to delete
                        </Dropdown.Toggle>

                        <Dropdown.Menu>

                        {allUsers.map((user)=>(
                            <Dropdown.Item 
                            onClick={(event)=>{
                                console.log(user.UserID);
                                changeUser(user.UserID);
                    
                            }}

                            >
                              User ID : {user.UserID}  
                            </Dropdown.Item>
                        ))}

                        </Dropdown.Menu>

                    </Dropdown>

                    <Button onClick={(event)=>{
                        deleteUser(event);
                    }}>
                        Delete
                    </Button> 
                </Row> 
                </Col>
                <Col></Col>
            </Row>
            
        </div>
      
    );
}
  
export default EditDeleteUsersAdmin;



