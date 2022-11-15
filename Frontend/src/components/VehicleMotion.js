import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import io from "socket.io-client";
import axios from "axios";

import URLs from "../URLs";
import {url} from './Constants'
import { Page, Grid, Card, colors } from "tabler-react";
import ListGroup from 'react-bootstrap/ListGroup';

const styles = {
    dial: {
        display: "inline-block",
        width: `300px`,
        height: `auto`,
        color: "#000",
        border: "0.5px solid #fff",
        //padding: "2px",
        paddingTop: "20px",
        paddingLeft: "5px"
    },
    title: {
        fontSize: "1em",
        color: "#000"
    }
};

export default class VehicleMotion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forward: "",
            backward: "",
            right: "",
            left:"",
            idle:"",
            stopped:"",
            rideData:this.props.rideData,
            redLight:false,
            redLightLoc:[]
        };    
    }

    componentDidMount = async () => {
      //var data = JSON.parse(sessionStorage.getItem('sensorData'));   
      const response = await axios.get(`${url}/getSensorData?rideId=${this.props.rideData.rideId}`);
      if(response.data !== null && response.data.message.length >0) {
        var data = response.data.message[0];
      console.log(data);
      console.log(data.Throttle.filter(n=>n[0]));
      console.log(data.Throttle.filter(n=>n[1]));
      console.log(data.Throttle.filter(n=>n[2]));
      //var fwd=data.Throttle
      this.setState({ forward: (data.Throttle[0]>0||data.Throttle[1]>0||data.Throttle[2]>0)?'Yes':'No' });                    
      //this.setState({ forward: (data.Throttle[1]>0)?'Yes':'No' });                    
      this.setState({ backward: data.Reverse?'Yes':'No' });
      // var stop=data.Throttle[0]==0&&data.Throttle[1]==0&&data.Throttle[2]==0;
      // var brakeZero=data.Brake[0]==0&&data.Brake[1]==0&&data.Brake[2]==0;
      // var steerZero=data.Steer[0]==0&&data.Steer[1]==0&&data.Steer[2]==0;
     
      //this.setState({ stopped: (stop && brakeZero &&steerZero)||(data['Hand Brake']==true)?'Yes':'No' });
      this.setState({ stopped: (data.Throttle[1] ==0 && data.Brake[1]==0 && data.Steer[1]==0)||(data['Hand Brake'])?'Yes':'No' });
      
      this.setState({ idle: (data.Steer[1]==0&&data.Throttle[1]==0)?'Yes':'No' });
      //var rt=data.Steer[0]>0||data.Steer[1]>0||data.Steer[2]>0;
      //var lt=data.Steer[0]<0||data.Steer[1]<0||data.Steer[2]<0;
      //var rt=data.Steer[1]>0||data.Steer[2]>0;
      //var lt=data.Steer[1]<0;
      // this.setState({ right: rt?'Yes':'No'});
      // this.setState({ left: lt?'Yes':'No' });
      this.setState({ right: data.Steer[1]>0?'Yes':'No'});
      this.setState({ left: data.Steer[1]<0?'Yes':'No' });
      console.log("fetch sensordata");

        const socket = io(URLs.socketURL+"/socket", {
            transports: ['websocket']
        });
        socket.on("newSensorData", (sensordata) => {
            console.log(this.state.sensorData);
            console.log(sensordata);
            var fwd=sensordata.Throttle.filter(i=>i[0]>0||i[1]>0||i[2]>0);
            this.setState({ forward: fwd.length>0?'Yes':'No' });                    
            this.setState({ backward: sensordata.Reverse?'Yes':'No' });
            var stop=sensordata.Throttle.filter(k=>k[1]==0);
            var brakeZero=sensordata.Brake.filter(b=>b[1]==0);
            var steerZero=sensordata.Steer.filter(v=>v[1]==0);
            var redLight=false;

            if(sensordata['Traffic Lights'].length>0 && 
            (sensordata['Brake'][0]==0.5&& sensordata['Brake'][1]==0&&sensordata['Brake'][2]==1)
            &&(sensordata['Steer'][0]==0&&sensordata['Steer'][1]==-1&&sensordata['Steer'][2]==1)
            &&(sensordata['Throttle'][0]==0&&sensordata['Throttle'][1]==0&&sensordata['Throttle'][2]==1))
            {
              redLight=true;
		   // const light = sensordata['Traffic Lights'][0] === null ? sensordata['Traffic Lights'][0]: sensordata['Traffic Lights'][0].toFixed(2);
		    //const light1 = sensordata['Traffic Lights'][1] === null ? sensordata['Traffic Lights'][1]: sensordata['Traffic Lights'][1].toFixed(2);

              this.setState({redLight:true});
              //this.setState({redLightLoc:light+light1})
              this.setState({ stopped: 'Red Light' });
            }else
            {
              this.setState({redLight:false});
              this.setState({ stopped: (stop.length>0 && brakeZero.length>0&&steerZero.length>0)||(sensordata['Hand Brake']==true)?'Yes':'No' });
            }
            

            // var redLight=false;
            // if(sensordata['Traffic Lights'].length>0 && 
            // (sensordata['Brake'][0]==0.5&& sensordata['Brake'][1]==0&&sensordata['Brake'][2]==1)
            // &&(sensordata['Steer'][0]==0&&sensordata['Steer'][1]==-1&&sensordata['Steer'][2]==1)
            // &&(sensordata['Throttle'][0]==0&&sensordata['Throttle'][1]==0&&sensordata['Throttle'][2]==1))
            // {
            //   redLight=true;
            //   this.setState({redLight:true});
            //   this.setState({redLightLoc:sensordata['Traffic Lights'][0]+','+sensordata['Traffic Lights'][1]+']'})
            //   this.setState({ stopped: 'Red Light' });
            // }else
            // {
            //   this.setState({redLight:false});
            //   this.setState({ stopped: (stop.length>0 && brakeZero.length>0&&steerZero.length>0)||(sensordata['Hand Brake']==true)?'Yes':'No' });
            // }        
            
            this.setState({ idle: stop.length>0?'Yes':'No' });
           // var rt=sensordata.Steer.filter(x=>x[0]>0||x[1]>0||x[2]>0);
            //var lt=sensordata.Steer.filter(x=>x[0]<0||x[1]<0||x[2]<0);
            var rt=sensordata.Steer[1];
            //data.Steer[1]>0?'Yes':'No'}
            this.setState({ right: rt>0?'Yes':'No'});
            this.setState({ left: rt<0?'Yes':'No' });
            console.log(this.state.sensorData);
        });
      }
    };

    render() {
        return (
            <Grid.Row>
        <Grid.Col width={11}>
          <Card title={'Vehicle Moving States'} style={{ width: '28rem' }}>
            <ListGroup>
              <ListGroup.Item>
                <Grid.Row>
                  <Grid.Col>
                    {'Forward'}
                  </Grid.Col>
                  <Grid.Col>{this.state.forward}</Grid.Col>
                </Grid.Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Grid.Row>
                  <Grid.Col>
                    {'Backward'}
                  </Grid.Col>
                  <Grid.Col>{this.state.backward}</Grid.Col>
                </Grid.Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Grid.Row>
                  <Grid.Col>
                    {'Stopped'}
                  </Grid.Col>
                  <Grid.Col>{this.state.stopped}</Grid.Col>                  
                </Grid.Row>
                {/* {this.state.redLight?<Grid.Row><Grid.Col></Grid.Col><Grid.Col>{this.state.redLightLoc}</Grid.Col></Grid.Row>:""} */}
                {this.state.redLight?<Grid.Row><Grid.Col></Grid.Col><Grid.Col></Grid.Col></Grid.Row>:""}
              </ListGroup.Item>
              <ListGroup.Item>
                <Grid.Row>
                  <Grid.Col>
                    {'Idle'}
                  </Grid.Col>
                  <Grid.Col>{this.state.idle}</Grid.Col>
                </Grid.Row>
              </ListGroup.Item>  
              <ListGroup.Item>
                <Grid.Row>
                  <Grid.Col>
                    {'Right'}
                  </Grid.Col>
                  <Grid.Col>{this.state.right}</Grid.Col>
                </Grid.Row>
              </ListGroup.Item>  
              <ListGroup.Item>
                <Grid.Row>
                  <Grid.Col>
                    {'Left'}
                  </Grid.Col>
                  <Grid.Col>{this.state.left}</Grid.Col>
                </Grid.Row>
              </ListGroup.Item>           
            </ListGroup>
          </Card>
        </Grid.Col>
      </Grid.Row>
        );
    }

}


