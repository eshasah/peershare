import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Navheader from '../Navbar/navbar';
import '../Navbar/navbar.css';
import { url, ownerBearer, userBearer, adminBearer } from '../Constants';

// Define a Login Component
class Login extends Component {
  // call the constructor method
  constructor(props) {
    // Call the constrictor of Super class i.e The Component
    super(props);
    // maintain the state required for this component
    this.state = {
      email: '',
      password: '',
    };
    // Bind the handlers to this class
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  componentWillMount() {
    this.setState({
      redirecttohome: null,
    });
  }

  // username change handler to update state variable with the text entered by the user
  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  // password change handler to update state variable with the text entered by the user
  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  // submit Login handler to send a request to the node backend
  submitLogin = async (e) => {
    // prevent page from refresh
    e.preventDefault();
    const { email, password } = this.state;
    var redirectVar1 = '';

    sessionStorage.setItem('userid', '1');    
    sessionStorage.setItem('useremail', email);
    //sessionStorage.setItem('profilepic', resprofilepic);
    sessionStorage.setItem('userPhone', '6697865436');
    sessionStorage.setItem('birthday', '09/10/1997');
    sessionStorage.setItem('gender', 'Male');

    if(email.indexOf('admin') != -1)
    {
      sessionStorage.setItem('firstName', 'admin1');
      sessionStorage.setItem('lastName', '');
      sessionStorage.setItem('userType', 'admin');
      redirectVar1 = <Redirect to='/home-admin' />;
    }
    else if(email.indexOf('user') != -1)
    {
      sessionStorage.setItem('firstName', 'user1');
      sessionStorage.setItem('lastName', '');
      sessionStorage.setItem('userType', 'user');
      redirectVar1 = <Redirect to='/home-user' />;
    }
    else if(email.indexOf('owner') != -1)
    {
      sessionStorage.setItem('firstName', 'owner1');
      sessionStorage.setItem('lastName', '');
      sessionStorage.setItem('userType', 'carowner');
      redirectVar1 = <Redirect to='/home-owner' />;
    }
    else
    {
      alert("Internal Server Error");
    }
    //const redirectVar1 = <Redirect to='/home-user' />;
    //const redirectVar1 = <Redirect to='/home-owner' />;

    this.setState({
      redirecttohome: redirectVar1,
    });
    return;
    //const { email, password } = this.state;
    if (email === '') {
      alert('Please enter email address');
      this.setState({
        errorMessage1: 'Please enter email address!',
      });
      return;
    }
    if (password === '') {
      alert('Please enter a password');
      this.setState({
        errorMessage2: 'Please enter a password!',
      });
      return;
    }
    const data = {
      email : email,
      password : password
    };
    this.setState({
      errorMessage1: '',
    });

   
    // set the with credentials to true
    axios.defaults.withCredentials = true;
    // make a post request with the user data
    axios
      .get(url + '/login?email=' + data.email + '&password=' + data.password)
      .then((response) => {
        console.log('Status Code : ', response.status);
        console.log('response ', response.data);

        if (response.status === 200) {
          if(response.data == false)
          {
            alert("Please enter valid credentials");
            return;
          }
          console.log(response.data);
          const resuserid = response.data[0].UserID;
          const resfirstname = response.data[0].FirstName;
          const resemail = response.data[0].Email;
          const userType = response.data[0].UserRole;
          const resprofilepic = response.data[0].ProfilePicture;
          const lastName = response.data[0].LastName;
          const userPhone = response.data[0].UserPhone;
          const birthday = response.data[0].Birthday;
          const gender = response.data[0].Gender;
          sessionStorage.setItem('userid', resuserid);
          sessionStorage.setItem('firstName', resfirstname);
          sessionStorage.setItem('lastName', lastName);
          sessionStorage.setItem('useremail', resemail);
          sessionStorage.setItem('profilepic', resprofilepic);
          sessionStorage.setItem('userType', userType);
          sessionStorage.setItem('userPhone', userPhone);
          sessionStorage.setItem('birthday', birthday);
          sessionStorage.setItem('gender', gender);

          //alert(response.data.token.accessToken);
          //const authToken = response.data.token.accessToken;
          //sessionStorage.setItem('auth', authToken);
         
          //cookie.set('cookie', 'test');
          //cookie.set('cookie', 'cookie', {path : '/'});
          
          if(userType == 'admin')
          {
            redirectVar1 = <Redirect to='/home-admin' />;
          }
          else if(userType == 'user')
          {
            redirectVar1 = <Redirect to='/home-user' />;
          }
          else if(userType == 'carowner')
          {
            redirectVar1 = <Redirect to='/home-owner' />;
          }
          else
          {
            alert("Internal Server Error");
          }
          //const redirectVar1 = <Redirect to='/home-user' />;
          //const redirectVar1 = <Redirect to='/home-owner' />;

          this.setState({
            redirecttohome: redirectVar1,
          });
        } else {
          console.log(response.data);
          //alert(response.data);
          this.setState({
            redirecttohome: null,
          });
        }
      })
      .catch((err) => {
        //console.log(err.response.data);
        alert("Please enter valid credentials");
        // this.setState({
        //   errorMessage: err.response.data,
        // });
      });
  };

  render() {
    let redirectVar = null;
    // if (cookie.load('cookie')) {
    //   redirectVar = <Redirect to='/dashboard' />;
    // }
    const { errorMessage, errorMessage1 } = this.state;
    const { redirecttohome } = this.state;
    return (
      <div>
        {redirectVar}
        {redirecttohome}
        <Navheader />
        <div className='container'>
          <div className='login-form'>
            <div className='main-div' style = {{borderRadius: "15px"}}>
              <div className='panel' style = {{width: "107%", borderRadius: "15px", marginLeft: "-5%"}}>
                <h2 style = {{paddingTop: "12%", paddingBottom: "6%"}}>WELCOME TO CAR SHARING SERVICES!</h2>
              </div>
              <div className='form-group'>
                <label htmlFor='email'>
                  Email
                  <input
                    type='text'
                    className='form-control'
                    name='email'
                    id='email'
                    placeholder='Email'
                    onChange={this.emailChangeHandler}
                    required
                    formNoValidate
                    style = {{borderRadius: "10px"}}
                  />
                </label>
                <p className='errmsg' style={{ color: 'maroon' }}>
                  {' '}
                  {errorMessage1}{' '}
                </p>
              </div>
              <div className='form-group'>
                <label htmlFor='email'>
                  Password
                  <input
                    type='password'
                    className='form-control'
                    name='password'
                    id='password'
                    placeholder='Password'
                    onChange={this.passwordChangeHandler}
                    required
                    formNoValidate
                    style = {{borderRadius: "10px"}}
                  />
                </label>
              </div>
              <button
                data-testid='login'
                type='submit'
                className='Signup-default '
                onClick={this.submitLogin}
                formNoValidate
              >
                Login
              </button>
              <p className='errmsg' style={{ color: 'maroon' }}>
                {' '}
                {errorMessage}{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// export Login Component
export default Login;
