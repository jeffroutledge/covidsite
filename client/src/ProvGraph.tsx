import { Component } from 'react';
import TerritoryStats from './Models/TerritoryStats';
import { LineChart, Line, XAxis, YAxis, Label, Tooltip } from 'recharts';

export default class ProvGraph extends Component<{longitude: any, latitude: any}, {territoryStats: TerritoryStats}> {
    async componentWillReceiveProps(nextProps: {latitude: any, longitude: any}): Promise<void> {
        if (nextProps.latitude !== 0 && nextProps.longitude !== 0) {
            this.setState({territoryStats: await this.getLocationFromPosition(nextProps.latitude, nextProps.longitude)});
            console.log(nextProps.latitude);
        }
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
        const data = this?.state?.world;
        const sortedData = data?.slice()?.sort((a: any, b: any) => {
            console.log(a.Date);
            return this.getTime(new Date(a.Date)) - this.getTime(new Date(b.Date));
        });
        console.log(data);
        console.log(sortedData);
        const renderLineChart = (
            <LineChart width={500} height={300} data={sortedData} margin={{ top: 15, right: 10, left: 20, bottom: 25 }}>
                <XAxis dataKey="Date">
                    <Label value="Date" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis width={150} type="number" domain={['dataMin - 10000', 'dataMax + 10000']}/>
                <Tooltip />
                <Line type="monotone" dataKey="TotalDeaths" stroke="#82ca9d" />
            </LineChart>
        );
        return renderLineChart;
    }
}