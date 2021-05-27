import { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Label, Tooltip } from 'recharts';

export default class World extends Component<{}, {world: any[]}> {
    componentDidMount() {
        this.setState({...this.state});
        try {
            fetch('http://localhost:8080/world')
                .then(response => response.json())
                .then(result => {
                    this.setState({world: result})
                })
                .catch(e => {
                    console.log(e)
                    this.setState({...this.state})
                });
        }
        catch (e) {
            console.log(e);
        }
    }

    private getTime(date?: Date) {
        return date != null ? date.getTime() : 0;
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
            <LineChart width={1000} height={300} data={sortedData} margin={{ top: 15, right: 10, left: 20, bottom: 25 }}>
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