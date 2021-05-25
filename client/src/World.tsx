import { Component } from 'react';

export default class World extends Component {
    private stuff: any;

    componentDidMount() {
        try {
            fetch('http://localhost:8080/world')
                .then(response => this.stuff = response)
                .then(data => console.log(data));
        }
        catch (e) {
            console.log(e);
        }
    }

    render() {
        return <div>{JSON.stringify(this.stuff)}</div>;
    }
}