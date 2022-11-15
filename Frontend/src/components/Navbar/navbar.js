import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Image } from 'react-bootstrap';
import './navbar.css';
// #fb7a00

class Navheader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    cookie.remove('cookie', { path: '/' });
    sessionStorage.clear();
  };

  render() {
    let isloggedin = null;
    //if (cookie.load('cookie')) {
      if(sessionStorage.getItem('userid') != null) {
      console.log('Able to read cookie');
      const profilepic = sessionStorage.getItem('profilepic');
      isloggedin = (
        <ul className='nav navbar-nav navbar-right'>
          <li>
            {/* <Button className='Home-default' variant='default'>
              <Link to='/dashboard'> Home </Link>
            </Button> */}
          </li>
          <li>
            {/* <Image
              src={profilepic}
              className='avatar'
              alt='profile pic'
              roundedCircle
            /> */}
          </li>
          <li style = {{paddingTop : "18px"}}>
            Hi, {sessionStorage.getItem('firstName') + ' ' + sessionStorage.getItem('lastName')}{' '}
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
          <li style = {{paddingTop : "3px"}}>
            <Link className='nav-link1' to='/profile'>
              My Profile{' '}
            </Link>
          </li>
          <li style = {{paddingTop : "3px"}}>
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
            <span className='NavItem'>Car Sharing Services</span>
          </Navbar.Brand>
          <Navbar.Collapse class='nav navbar-nav navbar-right'>
            {/* <ul class='nav navbar-nav navbar-right'> */}
            <Nav>{isloggedin}</Nav>
            {/* </ul> */}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
export default Navheader;
