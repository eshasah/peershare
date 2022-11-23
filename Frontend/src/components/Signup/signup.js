import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Navheader from '../Navbar/navbar';
import Button from 'react-bootstrap/Button';
import { Form, Image } from 'react-bootstrap';
import '../Navbar/navbar.css';
import '../Constants'
import { url } from '../Constants';
import WAValidator from 'wallet-address-validator';
//var WAValidator = require('wallet-address-validator');
const saltRounds = 10;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      userrole: '',
      email: '',
      password: '',
      firstnameerrors: '',
      emailerrors: '',
      passworderrors: '',
      redirecttohome: null,
      carColor:'',
      carNo:'',
      carType:'',
      walletAddress:'',
      walletPrivateKey:'',
      walletAddressErrors:'',
      walletPrivateKeyError:''
    };

    // Bind the handlers to this class
    this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
    this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
    this.userroleChangeHandler = this.userroleChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.carNoChangeHandler = this.carNoChangeHandler.bind(this);
    this.carColorChangeHandler = this.carColorChangeHandler.bind(this);
    this.carTypeChangeHandler = this.carTypeChangeHandler.bind(this);
    this.submitsignup = this.submitsignup.bind(this);
    this.carModelChangeHandler = this.carModelChangeHandler.bind(this);
    this.walletAddrChangeHandler=this.walletAddrChangeHandler.bind(this);
    this.walletPrivateKeyChangeHandler=this.walletPrivateKeyChangeHandler.bind(this);
  }

  carModelChangeHandler = (e) => {
    this.setState({
      carModel: e.target.value,
    });
  }

  carNoChangeHandler = (e) => {
    this.setState({
      carNo: e.target.value,
    });
  }

  carColorChangeHandler = (e) => {
    this.setState({
      carColor: e.target.value,
    });
  }

  carTypeChangeHandler = (e) => {
    this.setState({
      carType: e.target.value,
    });
  }
  firstnameChangeHandler = (e) => {
    this.setState({
      firstname: e.target.value,
    });
  };
  lastnameChangeHandler = (e) => {
    this.setState({
      lastname: e.target.value,
    });
  };
  userroleChangeHandler = (e) => {
    this.setState({
      userrole: e.target.value,
    });
    
    if(e.target.value == 'carowner')
      document.getElementById("divOwnerFields").style.display = '';
    else
      document.getElementById("divOwnerFields").style.display = 'none';
  };

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  walletAddrChangeHandler= (e) => {
    this.setState({
      walletAddress: e.target.value,
    });
  };
  walletPrivateKeyChangeHandler= (e) => {
    this.setState({
      privateKey: e.target.value,
    });
  };

  isformvalid = () => {
    console.log('is form valid');
    let formisvalid = true;
    const signuperrors = {
      firstnameerrors: '',
      emailerrors: '',
      passworderrors: '',
      walletAddressErrors:''
    };

    const emailpattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,4})$/;
    const pwdpattern =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,50}$/;

    const { firstname, email, password,walletAddress } = this.state;

    if (firstname.length === 0) {
      formisvalid = false;
      signuperrors.firstnameerrors = 'Firstname cannot be blank!';
    }

    if (!emailpattern.test(email)) {
      formisvalid = false;
      if (email.length === 0) {
        signuperrors.emailerrors = 'Email address cannot be blank!';
      } else {
        signuperrors.emailerrors = 'Email ID is not Valid!';
      }
      console.log(signuperrors.emailerrors);
    }
    if (!pwdpattern.test(password)) {
      formisvalid = false;
      signuperrors.passworderrors =
        'Password is not valid and must contain minimum 8 characters with a numeric, special character , lower and upper case letters!';
      console.log(signuperrors.passworderrors);
    }
    if(!WAValidator.validate(walletAddress,'ETH')){
      formisvalid = false;
      signuperrors.walletAddressErrors= 'Please enter valid Wallet Address';
    }
    this.setState((prevstate) => ({
      ...prevstate,
      ...signuperrors,
    }));

    console.log(
      formisvalid,
      signuperrors.firstnameerrors,
      signuperrors.emailerrors,
      signuperrors.passworderrors
    );
    return formisvalid;
  };

  // submit Login handler to send a request to the node backend
  submitsignup = async (e) => {
    
   // alert("Signup Successful. Please Login");
    // const redirectVar1 = <Redirect to='/login' />;
    // this.setState({ redirecttohome: redirectVar1 });
    // return;
    
    // prevent page from refresh
    e.preventDefault();
    const formisvalidated = await this.isformvalid();
    console.log(formisvalidated);
    if (formisvalidated) {
      const { firstname, lastname, userrole, email, password, carType, carNo, carColor,walletAddress,walletPrivateKey} = this.state;
     
      const data = {
        // firstname,
        // lastname,
        // userrole,
        // email,        
        // encryptpassword: await bcrypt.hash(password, saltRounds),
        first_name:firstname,
        last_name:lastname,
        userrole:userrole == 'user' ? 'user' : userrole,
        email: email,
        password: password,
        confirm_password:password,
        ethereum_address:walletAddress,
        ethereum_private_key:walletPrivateKey,
        user_type:userrole
        //password:await bcrypt.hash(this.state.password, saltRounds),        
      }
     
      var path = url;    
      path += '/user/register'; 
      
      console.log(data);
      // set the with credentials to true
      axios.defaults.withCredentials = true;
      // make a post request with the user data
      axios
        .post(path, data)
        .then((response) => {
          console.log('Status Code : ', response.status);
          if (response.status === 200) {
            console.log(response.data);
            if(this.state.userrole == 'carowner')
            {
              console.log('owner:',this.state.userrole );
              const data1 = {
                registration :this.state.carNo,
                car_type: this.state.carType,
                model: this.state.carModel,
                color: this.state.carColor,               
                user_id: response.data.userDetails.user_id
              }              
              
              axios
              .post(url + '/car/add', data1)
              .then((res) => {
                if (response.status === 200) {
                const registration=this.state.carNo;
                const car_type=this.state.carType;
                const model=this.state.carModel;
                const color=this.state.carColor;
                const car_id=res.data.carDetails.car_id;
                sessionStorage.setItem('registration', registration);
                sessionStorage.setItem('car_type', car_type);
                sessionStorage.setItem('model', model);
                sessionStorage.setItem('color', color);
                sessionStorage.setItem('car_id', car_id);
                }

              }).catch((err) => {
                console.log(err);
                alert(err.response.data);
                this.setState({
                  errorMessage: err.response.data,
                });
              });
            }
            
            // console.log(response.data.username);
          const resuserid = response.data.userDetails.user_id;
          const resfirstname = response.data.userDetails.first_name;
          const resemail = response.data.userDetails.email;
          const userType = response.data.userDetails.user_type;
         // const resprofilepic = response.data.userDetails.img;
          const lastName = response.data.userDetails.last_name;
          const ethereumAddress = response.data.userDetails.ethereum_address;
          const ethereumPrvKey = response.data.userDetails.ethereum_private_key;
          //const birthday = response.data[0].Birthday;
          //const gender = response.data[0].Gender;
          sessionStorage.setItem('userid', resuserid);
          sessionStorage.setItem('firstName', resfirstname);
          sessionStorage.setItem('lastName', lastName);
          sessionStorage.setItem('useremail', resemail);
          //sessionStorage.setItem('profilepic', resprofilepic);
          sessionStorage.setItem('userType', userType);
          sessionStorage.setItem('ethereumAddress', ethereumAddress);
          sessionStorage.setItem('ethereumPrvKey', ethereumPrvKey);
            alert("Signup Successful. Please Login");
            const redirectVar1 = <Redirect to='/login' />;
            this.setState({ redirecttohome: redirectVar1 });
          } else {
            this.setState({
              redirecttohome: null,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Email already exists");          
        });
    }
  };

  render() {
    let redirectVar = null;
    // if (cookie.load('cookie')) {
    //   redirectVar = <Redirect to='/dashboard' />;
    // }
    const { firstnameerrors, emailerrors, passworderrors, userrole, walletAddressErrors, walletPrivateKeyError } =
      this.state;
    const { redirecttohome } = this.state;
    return (
      <form>
        <div>
          <Navheader />
          <div className='container'>
            {redirectVar}
            {redirecttohome}
            <div className='signup-form'>
              <div className='main-div' style = {{borderRadius:"15px", background:"#eeeeee"}}>
                <div className='panel' style = {{width: "106%", marginLeft: "-5%", borderRadius: "12px"}}>
                  <h2>WELCOME TO CAR SHARING SERVICES!</h2>
                  <br />
                  <br />
                </div>
                <div className='form-group'>
                  <h3 style = {{}}>Introduce Yourself</h3>
                  <br />
                  <br />
                  <label htmlFor='username' style = {{}}>
                    Hi there! <br />
                    My First name is
                    <input
                      type='text'
                      onChange={this.firstnameChangeHandler}
                      className='form-control'
                      name='firstname'
                      placeholder='First Name'
                      required
                      formNoValidate
                    />
                  </label>
                  <br />
                  {firstnameerrors && (
                    <span className='errmsg' style={{ color: 'maroon' }}>
                      {' '}
                      {firstnameerrors}{' '}
                    </span>
                  )}
                  <label htmlFor='username' style = {{}}>
                    My Last Name is
                    <input
                      type='text'
                      onChange={this.lastnameChangeHandler}
                      className='form-control'
                      name='lastname'
                      placeholder='Last Name'
                      required
                      formNoValidate
                    />
                  </label>
                  <br />

                 
                </div>
                <div className='form-group'>
                  <label htmlFor='username'>
                    Here’s my email address:
                    <input
                      type='text'
                      onChange={this.emailChangeHandler}
                      className='form-control'
                      name='email'
                      placeholder='Email Address'
                      required
                      formNoValidate
                    />
                  </label>
                  <br />
                  {emailerrors && (
                    <span className='errmsg' style={{ color: 'maroon' }}>
                      {' '}
                      {emailerrors}{' '}
                    </span>
                  )}
                </div>

                <div className='form-group'>
                  <label htmlFor='walletAddress'>
                    Here’s my Wallet Address:
                    <input
                      type='text'
                      onChange={this.walletAddrChangeHandler}
                      className='form-control'
                      name='walletAddress'
                      placeholder='Wallet Address'
                      required
                      formNoValidate
                    />
                  </label>
                  <br />
                  {walletAddressErrors && (
                    <span className='errmsg' style={{ color: 'maroon' }}>
                      {' '}
                      {walletAddressErrors}{' '}
                    </span>
                  )}
                </div>
                <div className='form-group'>
                  <label htmlFor='walletPrivateKey'>
                    Here’s my Wallet Private Key:
                    <input
                      type='text'
                      onChange={this.walletPrivateKeyChangeHandler}
                      className='form-control'
                      name='walletPrivateKey'
                      placeholder='Wallet Private Key'
                      required
                      formNoValidate
                    />
                  </label>
                  <br />
                  {walletPrivateKeyError && (
                    <span className='errmsg' style={{ color: 'maroon' }}>
                      {' '}
                      {walletPrivateKeyError}{' '}
                    </span>
                  )}
                </div>

                <div className='form-group'>
                  <label htmlFor='username'>
                    And here’s my password:
                    <input
                      type='password'
                      onChange={this.passwordChangeHandler}
                      className='form-control'
                      name='password'
                      placeholder='Password'
                      required
                      formNoValidate
                    />
                  </label>
                  <br />

                  {passworderrors && (
                    <span className='errmsg' style={{ color: 'maroon' }}>
                      {' '}
                      {passworderrors}{' '}
                    </span>
                  )}
                  <br />
                
                  <Form.Group controlId='userrole'>
                    <Form.Label>Here's my role</Form.Label>
                    <Form.Control
                      as='select'
                      value={userrole}
                      placeholder={userrole}
                      onChange={this.userroleChangeHandler}
                      defaultValue = 'User'
                      style = {{marginLeft: "15%", width: "71%"}}
                    >
                      <option value='user'>User</option>
                      <option value='carowner'>Car Owner</option>
                      {/* <option value='admin'>
                        System Administrator
                      </option> */}
                    </Form.Control>                   
                  </Form.Group>
                  <div id = "divOwnerFields" style = {{display: "none"}}>
                  <label>Your Car No.</label><br/>
                   <input type = "text" id = "txtCarNo" placeholder = "Car No." onChange={this.carNoChangeHandler}></input><br/>
                   <label>Your Car Color</label><br/>
                  <input type = "text" id = "txtCarNo" placeholder = "Car Color" onChange={this.carColorChangeHandler}></input>
                  <br />
                  <label>Select your Car Type</label><br/>
                  <input type = "text" id = "txtCarNo" placeholder = "Car Type" onChange={this.carTypeChangeHandler}></input>
                  <br />
                  <label>Select your Car Model</label><br/>
                  <input type = "text" id = "txtCar" placeholder = "Car Model" onChange={this.carModelChangeHandler}></input>
                  </div>
                </div>
                <button
                  type='submit'
                  onClick={this.submitsignup}
                  className='Signup-default'
                  formNoValidate
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
// export Signup Component
export default Signup;
