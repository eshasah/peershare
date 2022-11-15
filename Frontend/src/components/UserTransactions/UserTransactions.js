import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import Navheader from '../Navbar/navbar';
import SideNavbar from '../Navbar/SideNavbar-Owner';
import './UserTransactions.css';


class UserTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
        test : "<tr><td>Heyy</td></tr>"
    };
  }

  componentWillMount(){
    //API calls to get user data
  }

  render() {
    return (
      <div>
        <Navheader />
        <SideNavbar/>
        <div id = "div1">
            {/* <input type="textbox" id="txtLanguage" defaultValue={} style=""/> */}
            <label style = {{marginLeft: "40%", marginTop: "12%", color:"white",fontSize:"21px", fontWeight:"100"}}>Varun</label><br/>
            <label style = {{marginLeft:"23%", color:"white", fontSize:"21px", fontWeight:"100"}}>Available Amount : $0.00</label>
            <button
              //onClick={}
              class="btn btn-primary"
              style={{
                backgroundColor: "white",
                border: "0px",
                borderRadius: "6px",
                color:"black",
                marginLeft:"37%",
                marginTop:"2%",
                widtd:"24%"
              }}
            >
              Add Amount
            </button>
        </div>
        <div style = {{marginTop:"3%", border: "1px solid", marginLeft:"15%", borderRadius:"15px", width: "82%"}}>            
            {/* <hr style = {{marginTop:"8px"}}></hr> */}
            <div style = {{marginLeft: "1%"}} >
            <table id = "tblTransactions" style = {{marginTop: "1%"}}>
                    <tr>
                        <td>#</td>
                        <td>SOURCE</td>
                        <td>DESTINATION</td>
                        <td>DATE</td>
                        <td>AMOUNT</td>
                        <td>TRIP STATUS</td>
                    </tr>
                    
                   
                   
                </table>
            </div>
        </div>
        {/* <div dangerouslySetInnerHTML={{__html: this.state.test}}>

        </div> */}
       
      </div>
    );
  }
}

export default UserTransactions;
