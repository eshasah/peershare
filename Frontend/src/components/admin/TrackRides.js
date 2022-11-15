import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import io from "socket.io-client";
import axios from "axios";
import URLs from "../../URLs";
import { Page, Grid, Card, colors } from "tabler-react";
import { Row, Col, Accordion, Container, useAccordionButton } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import UserTrackingDashboard from "../UserTrackingDashboard";

export default class TrackRides extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rideData: this.props.rideData,
            sensorDetails: "",
            rideDetails: []
        };
        this.fetchRides = async () => {
            try {
                console.log("fetch fetchRides");
                const response = await axios.get(`${URLs.baseURL}/getAllRidesSensor`);

                if (response.data) {
                    console.log(response.data[0]);
                    this.setState({ rideDetails: response.data[0]});
                    // this.rideDetails = response.data.message.VehcileNum;
                    console.log(this.state.rideDetails);
                    // vehicleno = response.data.message.VehcileNum;

                } else {
                    //alert(response.data.message);
                }
            } catch (error) {
                console.log("Error with fetching Rides: ", error);
                // alert(
                //     "Error with fetching Ride. Please check the console for more info."
                // );
            }
        };
        // this.fetchSensorData = async (rideId) => {
        //     try {
        //         console.log("fetch sensordata");
        //         const response = await axios.get(`${URLs.baseURL}/users/sensordata/${rideId}`);
        //         if (response.data.success) {
        //             var data = response.data.message[0];
        //             console.log(data);
        //             this.setState({ sensorData: data });

        //             console.log("fetch sensordata");

        //         } else {
        //             //alert(response.data.message);
        //         }
        //     } catch (error) {
        //         console.log("Error with fetching rides: ", error);
        //         alert(
        //             "Error with fetching ride. Please check the console for more info."
        //         );
        //     }
        // };
    }
    componentDidMount = async () => {
        // const socket = io("http://localhost:3001/socket", {
        //     transports: ['websocket']
        // });
        // socket.on("newSensorData", (sensordata) => {
        //     console.log(this.state.sensorData);
        //     console.log(sensordata);
        //     this.setState({ sensorData: sensordata });
        //     console.log(this.state.sensorData);
        // });
        // await this.fetchSensorData(this.state.rideData.rideId);
        await this.fetchRides();
    };

    render() {
        return (
            <Container fluid="sm">

                {
                    this.state.rideDetails.map((data, i) =>
                    // console.log(data)
                        <Accordion defaultActiveKey="0" style={{width:"1050px"}}>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header width={100}>

                                                <ListGroup style={{width:"1050px",fontWeight:"1",fontSize:"medium"}}>
                                                    <ListGroup.Item variant="secondary">
                                                        <Grid.Row width="68rem" sm={3} md={3}>
                                                            {/* <Grid.Col>
                                                              {data.FirstName+" "+data.LastName}
                                                            </Grid.Col> */}
                                                            <Grid.Col>
                                                              {"Vehicle No: "+data.VehcileNum}
                                                            </Grid.Col>
                                                            <Grid.Col>
                                                              {data.RideOrigin+" - "+data.RideDestination}
                                                            </Grid.Col>
                                                            <Grid.Col>
                                                              {data.FirstName+" "+data.LastName}
                                                            </Grid.Col>
                                                            <Grid.Col></Grid.Col>
                                                        </Grid.Row>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                </Accordion.Header>
                                <Accordion.Body width={100}>
                                    <UserTrackingDashboard rideData={data.RideID} isAdmin={true} showStatus={false} title="Tracking details"/>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    )}
            </Container>
        );
    }

}


