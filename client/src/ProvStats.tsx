import { Component } from 'react';
// import { NoSubstitutionTemplateLiteral } from 'typescript';
import TerritoryStats from './Models/TerritoryStats';

export default class ProvStats extends Component<{longitude: any, latitude: any}, {territoryStats: TerritoryStats}> {
    private latitude: number = 0;
    private longitude: number = 0;

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