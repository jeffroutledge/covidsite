import logo from './logo.svg';
import './App.css';
import World from './World';
import ProvStats from './ProvStats';
import React, { Component } from 'react';
import { render } from 'react-dom';

let latitude : number;
let longitude : number;
let data: any;
class App extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            lat: 0,
            lon: 0
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
        data = {longitude, latitude};
        });
        this.setState({
            lat: data.latitude,
            lon: data.longitude
        });
    };
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
                    <ProvStats latitude = {data.latitude} longitude = {data.longitude} />
                </header>
            </div>
        )
    }
}
render(<App />, document.getElementById('root'));
export default App;
