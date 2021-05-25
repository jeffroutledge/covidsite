import { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip } from 'recharts';

export default class World extends Component<{}, {world: string[]}> {
    componentDidMount() {
        this.setState({...this.state});
        try {
            fetch('http://localhost:8080/world')
                .then(response => response.json())
                .then(result => {
                    console.log(result)
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
    

    render() {
        const renderLineChart = (
            <LineChart width={1000} height={500} data={this?.state?.world}  >
                <XAxis label={"Date"}/>
                <YAxis width={300} type="number" domain={[0, 4000000]} mirror={true}/>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="TotalDeaths" stroke="#82ca9d" />
                {/* <Line type="monotone" dataKey="NewDeaths" stroke="#8884d8" /> */}
            </LineChart>
        );
        return renderLineChart;
    }
}