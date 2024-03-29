import logo from './logo.svg';
import './App.css';
import World from './World';
import ProvStats from './ProvStats';
import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component<{}, {lat: any, lon: any}> {
    state = {lat: 50.46568, lon: -104.61759};
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
            console.log(this.state.lat);
            this.setState({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });
            console.log(this.state.lat);
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
