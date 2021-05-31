import logo from './logo.svg';
import './App.css';
import World from './World';
import ProvStats from './ProvStats';
import React, { Component } from 'react';
import { render } from 'react-dom';
import div, { Col, Container, Row } from 'react-bootstrap';

class App extends Component<{}, {lat: any, lon: any}> {
    state = {lat: 0, lon: 0};
    constructor(props: any) {
        super(props);
        // navigator.geolocation.getCurrentPosition((position) => {
        //     //console.log(this.state.lat);
        //   this.setState({
        //     lat: position.coords.latitude,
        //     lon: position.coords.longitude
        //   });
        // });
    };

    componentDidMount() {
        
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });
        });
    }
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
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
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    Learn React
                    </a>
                    <Container>
                        <Row>
                            <Col><World /></Col>
                            <Col><World /></Col>
                        </Row>
                        <Row>
                            <Col><World /></Col>
                            <Col><World /></Col>
                        </Row>
                    </Container>
                    <ProvStats latitude={this.state.lat} longitude={this.state.lon} />
                </header>
            </div>
        )
    }
}
render(<App />, document.getElementById('root'));
export default App;
