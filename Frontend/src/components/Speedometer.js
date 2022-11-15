import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import io from "socket.io-client";
import axios from "axios";
import URLs from "../URLs";

import {url} from './Constants'
import { Page, Grid, Card, colors } from "tabler-react";

const styles = {
  dial: {
    display: "inline-block",
    width: `300px`,
    height: 'auto',
    color: "#000",
    border: "0.5px solid #fff",
    //padding: "2px",
    paddingTop:"20px",
    paddingLeft:"5px"
  },
  title: {
    fontSize: "1em",
    color: "#000"
  }
};

export default class Speedometer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: "",
      rideData:this.props.rideData
    };
   
     

    
  }
  componentDidMount = async () => {
    //var data = JSON.parse(sessionStorage.getItem('sensorData'));   
    const response = await axios.get(`${url}/getSensorData?rideId=${this.props.rideData.rideId}`);
    if(response.data !== null) {
      var data = response.data.message[0];
    // console.log(data);
    // if(data != null) {
      try {
    const speed = data === null || data.length === null ? 0 : data['Speed (km/h)'];
    this.setState({ speed: speed });
      }
      catch(error) {
        this.setState({ speed: 0 });
      }

    console.log("fetch sensordata");
    const socket = io(URLs.socketURL+"/socket", {
      transports: ['websocket']
    });
    socket.on("newSensorData", (sensordata) => {
      console.log(this.state.sensorData);
      console.log(sensordata);
      this.setState({ speed: sensordata['Speed (km/h)'] });
      console.log(this.state.sensorData);
    });
  }
    
  };

  render() {
    return (
      <Grid.Row>
        <Grid.Col width={20}>
          <Card title={'Speed (km/hr)'} style={{ width: '30rem',height:'30rem' }}>
            <div style={styles.dial}>
              <ReactSpeedometer
                // forceRender={true}
                maxValue={120}
                minValue={0}
                height={180}
                width={250}
                value={this.state.speed}
                needleTransition="easeQuadIn"
                needleTransitionDuration={1000}
                needleColor="red"
                startColor="green"
                segments={10}
                endColor="blue"
              />             
            </div>
            <Card.Footer className="text-muted">
              Speed (m/sec): {(this.state.speed*(5/18)).toFixed(2)}
            </Card.Footer>
          </Card>
        </Grid.Col>
      </Grid.Row>
    );
  }

}


