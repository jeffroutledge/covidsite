import { Component } from 'react';
// import { NoSubstitutionTemplateLiteral } from 'typescript';
import TerritoryStats from './Models/TerritoryStats';

export default class ProvStats extends Component<{longitude: any, latitude: any}, {territoryStats: TerritoryStats}> {
    async componentDidMount(): Promise<void> {
        // navigator.geolocation.getCurrentPosition(async (position) => {
        //     this.setState({territoryStats: await this.getLocationFromPosition(position.coords.latitude, position.coords.longitude)});
        // });
        this.setState({territoryStats: await this.getLocationFromPosition(this.props.latitude, this.props.longitude)});
    }
    async componentWillReceiveProps(nextProps: {latitude: any, longitude: any}): Promise<void> {
        this.setState({territoryStats: await this.getLocationFromPosition(nextProps.latitude, nextProps.longitude)});
        console.log(nextProps.latitude);
    }
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    async getLocationFromPosition(latitude: number, longitude: number): Promise<any> {

        try {
            const url = `http://localhost:8080/location?longitude=${longitude.toPrecision(5)}&latitude=${latitude.toPrecision(5)}`;
            let result: any = await (await fetch(url)).json();//.json();
            const tStats: TerritoryStats = result;
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