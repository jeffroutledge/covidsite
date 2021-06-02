import { Component } from 'react';
import CanadaNationalStats from './Models/CanadaNationalStats';

export default class NationalStats extends Component<{longitude: any, latitude: any}, {canadaNationalStats: CanadaNationalStats}> {
    async componentDidMount(): Promise<void> {
    }
    async componentDidUpdate(prevProps: {longitude: any, latitude: any}): Promise<void> {
        if (prevProps.longitude !== this.props.longitude && prevProps.latitude !== this.props.latitude) {
            this.setState({canadaNationalStats: await this.getLocationFromPosition(this.props.longitude, this.props.latitude)});
        }
    }
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    async getLocationFromPosition(longitude: any, latitude: number): Promise<any> {

        try {
            const url = `/location/natstats?longitude=${longitude.toPrecision(5)}&latitude=${latitude.toPrecision(5)}`;
            let result: any = await (await fetch(url)).json();//.json();
            const tStats: CanadaNationalStats = result;
            return tStats;
        }
        catch (e) {
            console.log(e);
        }
    }
    
    render() {
        let renderNatJSON;
        try
        {
        renderNatJSON = (
        <div>
            <h6>Canada National Stats:</h6>
            <h6>New Cases: {this?.state?.canadaNationalStats.CasesNew}</h6>
            <h6>Total Cases: {this?.state?.canadaNationalStats.CasesTotal}</h6>
            <h6>Daily Recovered: {this?.state?.canadaNationalStats.DailyRecovered}</h6>
            <h6>Total Recovered: {this?.state?.canadaNationalStats.Recovered}</h6>
            <h6>Daily Deaths: {this?.state?.canadaNationalStats.DailyDeaths}</h6>
            <h6>Total Deaths: {this?.state?.canadaNationalStats.TotalDeaths}</h6>
            <h6>Daily Vaccinated: {this?.state?.canadaNationalStats.DailyVaccinated}</h6>
            <h6>Total Vaccinated: {this?.state?.canadaNationalStats.TotalVaccinated}</h6>
        </div>);
        }
        catch(e: any){
            console.log(e);
            return null;
        }
        return renderNatJSON;
    }
}