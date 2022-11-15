import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import io from "socket.io-client";
import axios from "axios";
import URLs from "../URLs";
import {url} from './Constants'
import { Page, Grid, Card, colors,ProgressCard } from "tabler-react";

export default class Direction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            direction: "",
            color:"",
            width:"",
            rideData:this.props.rideData
        };
       
    }
    componentDidMount = async () => {
        //var data = JSON.parse(sessionStorage.getItem('sensorData'));
        const response = await axios.get(`${url}/getSensorData?rideId=${this.props.rideData.rideId}`);
        try{     
        if(response.data != null) {
            var data = response.data.message[0];
        console.log(data);
        this.setState({ direction: data['Heading Direction'] });
        this.setState({ color: data['Heading Direction']=='W'?"red":data['Heading Direction']=='E'?"yellow":data['Heading Direction']=='S'?"green":data['Heading Direction']=='N'?'green':'orange' });
        this.setState({ width: 100});
        console.log("fetch sensordata");
        const socket = io(URLs.socketURL+"/socket", {
            transports: ['websocket']
        });
        socket.on("newSensorData", (sensordata) => {
            console.log(this.state.sensorData);
            console.log(sensordata);
            var data=sensordata;  
            //this.setState({ speed: sensordata['Heading Direction'] });
            this.setState({ direction: data['Heading Direction'] });
            this.setState({ color: data['Heading Direction']=='W'?"red":data['Heading Direction']=='E'?"yellow":data['Heading Direction']=='S'?"green":data['Heading Direction']=='N'?'blue':'orange' });
            this.setState({ width: 100});
            console.log(this.state.sensorData);
        });
	}
    }
	catch(err)  {console.log("error in direction", err)};
    };

    render() {
        return (
            <Grid.Row>
                <Grid.Col width={30}>
                  
                        <ProgressCard
                            header="Vehicle Direction"
                            content={this.state.direction}
                            progressColor={this.state.color}
                            progressWidth={this.state.width}
                        />
                  
                </Grid.Col>
            </Grid.Row>
        );
    }

}


