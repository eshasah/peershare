import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import Navheader from '../Navbar/navbar';
import './landingpage.css';

class LandingPage extends Component {
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
        <Navheader />
       
        <div className='landing' style = {{marginTop: "-2%"}}>
          <Image
            className='landingpic'
            src='/1.jpg'
            alt='landing page'
            height = '600px'
            width = '100%'
          />
        </div>
        <div class='text-on-image'>
		<br/>
          <h2>
            {' '}
            {/* <b>Welcome to Car Sharing Services!</b> */}
          </h2>
        </div>
      </div>
    );
  }
}

export default LandingPage;
