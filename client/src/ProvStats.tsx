import { Component } from 'react';
// import { NoSubstitutionTemplateLiteral } from 'typescript';
import TerritoryStats from './Models/TerritoryStats';

export default class ProvStats extends Component<{longitude: any, latitude: any}, {territoryStats: TerritoryStats}> {
    private latitude: number = 0;
    private longitude: number = 0;

    // constructor(props: any) {
    //     super(props);
    //     navigator.geolocation.getCurrentPosition(async (position) => {
    //         this.latitude = position.coords.latitude;
    //         this.longitude = position.coords.longitude;
    //         console.log(this.latitude, position.coords.latitude)
    //         this.setState(await this.getLocationFromPosition(position.coords.latitude, position.coords.longitude));
    //     });
    // }

    // constructor(props: any) {
    //     super(props);

    //     navigator.geolocation.getCurrentPosition(async (position) => {
    //         this.latitude = position.coords.latitude;
    //         this.longitude = position.coords.longitude;
    //         console.log(this.latitude, position.coords.latitude)
    //         this.setState(await this.getLocationFromPosition(position.coords.latitude, position.coords.longitude));
    //     });
    // }
    // constructor(props: any) {
    //     super(props);
    //     try {
    //         fetch(`http://localhost:8080/location?longitude=${this.props.longitude}&latitude=${this.props.latitude}`)
    //         // fetch(`http://localhost:8080/location?longitude=49.183&latitude=-122.868`)
    //             .then(response => response.json())
    //             .then(result => {
    //                 const tStats: TerritoryStats = {
    //                     ObjectID : result['features'][0]['attributes']['OBJECTID'],
    //                     Name : result['features'][0]['attributes']['NAME'],
    //                     Recovered : result['features'][0]['attributes']['Recovered'],
    //                     Tests : result['features'][0]['attributes']['Tests'],
    //                     LastUpdated : result['features'][0]['attributes']['Last_Updated'],
    //                     SourceURL : result['features'][0]['attributes']['SourceURL'],
    //                     ActiveCases : result['features'][0]['attributes']['ActiveCases'],
    //                     Hospitalized : result['features'][0]['attributes']['Hospitalized'],
    //                     ICU : result['features'][0]['attributes']['ICU'],
    //                     ICUVentilator : result['features'][0]['attributes']['ICUVents'],
    //                     Deaths : result['features'][0]['attributes']['Deaths'],
    //                     CaseTotal : result['features'][0]['attributes']['Case_Total'],
    //                     Vaccinated : result['features'][0]['attributes']['Vaccinated'],
    //                 }
    //                 this.setState({territoryStats: tStats});
    //             })
    //             .catch(e => {
    //                 console.log(e);
    //                 this.setState({...this.state});
    //             });
    //         }
    //         catch (e) {
    //             console.log(e);
    //         }
    //     // this.state = {
    //     //     latituade = this.props.latitude;
    //     //     longitude = this.props.longitude;
    //     // }
    // }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(async (position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            console.log(this.latitude, position.coords.latitude)
            this.setState(await this.getLocationFromPosition(position.coords.latitude, position.coords.longitude));
        });
        // this.setState({...this.state});
    }

    async getLocationFromPosition(latitude: number, longitude: number): Promise<any> {

        try {
            const url = `http://localhost:8080/location?longitude=${longitude.toPrecision(5)}&latitude=${latitude.toPrecision(5)}`;
            let result: any = await (await fetch(url)).json();//.json();
            console.log(url);
            const tStats: TerritoryStats = result;
            console.log(tStats)
            return tStats;
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
            console.log(e);
            return null;
        }
        return renderProvJSON;
    }
}