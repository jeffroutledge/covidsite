import { Component } from 'react';
import TerritoryStats from './TerritoryStats';

export default class ProvStats extends Component<{}, {territoryStats: TerritoryStats}> {
    componentDidMount() {
        this.setState({...this.state});
        try {
            fetch('http://localhost:8080/location')
                .then(response => response.json())
                .then(result => {
                    console.log(result['features'][0]['attributes']['NAME']);
                    let tStats = new TerritoryStats(
                        (result['features'][0]['attributes']['OBJECTID']),
                        (result['features'][0]['attributes']['NAME']),
                        (result['features'][0]['attributes']['Recovered']),
                        (result['features'][0]['attributes']['Tests']),
                        (result['features'][0]['attributes']['Last_Updated']),
                        (result['features'][0]['attributes']['SourceURL']),
                        (result['features'][0]['attributes']['ActiveCases']),
                        (result['features'][0]['attributes']['Hospitalized']),
                        (result['features'][0]['attributes']['ICU']),
                        (result['features'][0]['attributes']['ICUVents']),
                        (result['features'][0]['attributes']['Deaths']),
                        (result['features'][0]['attributes']['Case_Total']),
                        (result['features'][0]['attributes']['Vaccinated']));
                    this.setState({territoryStats: tStats});
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
        let renderProvJSON;
        try
        {
        renderProvJSON = (
        <div>
            <h6>Province/Territory: {this?.state?.territoryStats.Name}</h6>
            <h6>Active Cases: {this?.state?.territoryStats.ActiveCases}</h6>
            <h6>Total Cases: {this?.state?.territoryStats.CaseTotal}</h6>
            <h6>Hospitalized: {this?.state?.territoryStats.Hospitalized}</h6>
            <h6>ICU: {this?.state?.territoryStats.ICU}</h6>
            <h6>Deaths: {this?.state?.territoryStats.Deaths}</h6>
            <h6>Vaccinated: {this?.state?.territoryStats.Vaccinated}</h6>
        </div>);
        }
        catch(e: any){
            return null;
        }
        return renderProvJSON;
    }
}