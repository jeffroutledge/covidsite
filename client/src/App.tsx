import logo from './logo.svg';
import './App.css';
import World from './World';
import ProvStats from './ProvStats';
import React, { Component } from 'react';
import { render } from 'react-dom';
import div, { Col, Container, Row } from 'react-bootstrap';
import NationalStats from './NationalStats';
import ProvGraph from './ProvGraph';

class App extends Component<{}, {lon: any, lat: any}> {
    state = {lon: 0, lat: 0};

    componentDidMount() {  
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                lon: position.coords.longitude,
                lat: position.coords.latitude
            });
        });
    }
    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }
    render(): any {
        return (
            <div className="App">
                <header className="App-header">
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                        crossOrigin="anonymous"
                    />
                    <img src={logo} className="App-logo" alt="logo" />
                    <Container>
                        <Row>
                            <Col>
                                <h6>World Deaths:</h6>
                                <World />
                            </Col>
                            <Col>
                                <ProvGraph longitude={this.state.lon} latitude={this.state.lat}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col><World /></Col>
                            <Col><World /></Col>
                        </Row>
                        <Row>
                            <Col><NationalStats longitude={this.state.lon} latitude={this.state.lat}/></Col>
                            <Col><ProvStats longitude={this.state.lon} latitude={this.state.lat}/></Col>
                        </Row>
                    </Container>
                </header>
            </div>
        )
    }
}
render(<App />, document.getElementById('root'));
export default App;
