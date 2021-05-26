import { Component } from 'react';

export default class ProvStats extends Component<{}, {provJSON: string[]}> {
    componentDidMount() {
        this.setState({...this.state});
        try {
            fetch('http://localhost:8080/location')
                .then(response => response.json())
                .then(result => {
                    this.setState({provJSON: result['features'][0]['attributes']});
                    console.log(this?.state?.provJSON);
                })
                .catch(e => {
                    console.log(e);
                    this.setState({...this.state});
                });
        }
        catch (e) {
            console.log(e);
        }
    }
    

    render() {
        const renderProvJSON = (<div><h6>{JSON.stringify(this?.state?.provJSON)}</h6></div>);
        return renderProvJSON;
    }
}