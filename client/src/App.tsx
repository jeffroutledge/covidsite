import logo from './logo.svg';
import './App.css';
import World from './World';
import ProvStats from './ProvStats';
import React, { Component } from 'react';
import { render } from 'react-dom';

let latitude : number;
let longitude : number;

class App extends Component<{}, {lat: any, lon: any}> {
    constructor(props: any) {
        super(props);
        navigator.geolocation.getCurrentPosition((position) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
        });
        this.state = {
            lat: latitude,
            lon: longitude
        };
    };

    // componentDidMount() {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //     latitude = position.coords.latitude;
    //     longitude = position.coords.longitude;
    //     const data = {longitude, latitude};
    //     console.log('Latitude = ' + data.latitude);
    //     console.log('Longitude = ' + data.longitude);
    //     });
    // };
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
        });
        this.setState({
            lat: latitude,
            lon: longitude
        });
    }
    componentWillUnmount() {
        
    }
    render(): any {
        return (
            <div className="App">
                <header className="App-header">
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
                    <World />
                    <ProvStats latitude={this.state.lat} longitude={this.state.lon} />
                </header>
            </div>
        )
    }
}
render(<App />, document.getElementById('root'));
export default App;
