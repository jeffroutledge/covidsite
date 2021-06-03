import { Component } from 'react';
import Location from './Models/Location';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, Label, Tooltip } from 'recharts';
import { extent as d3Extent, max as d3Max } from 'd3-array';
import { scaleLinear as d3ScaleLinear, scaleTime as d3ScaleTime} from 'd3-scale';
import { format as d3Format } from 'd3-format';

export default class ProvGraph extends Component<{longitude: any, latitude: any}, {prov: any, location: Location, selectedData: string}> {
    async componentDidUpdate(prevProps: {longitude: any, latitude: any}): Promise<void> {
        if (prevProps.longitude !== this.props.longitude && prevProps.latitude !== this.props.latitude) {
            this.setState({prov: await this.getCovidStatsByLocation(this.props.longitude, this.props.latitude)});
            this.setState({location: await this.getLocationFromPosition(this.props.longitude, this.props.latitude)});
        }
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }
    
    private getTime(date?: Date) {
        return date != null ? date.getTime() : 0;
    }

    async getCovidStatsByLocation(longitude: any, latitude: number): Promise<any> {

        try {
<<<<<<< HEAD
            const url = `/location/location/provgraph?longitude=${longitude.toPrecision(5)}&latitude=${latitude.toPrecision(5)}`;
=======
            const url = `/api/v1/location?longitude=${longitude.toPrecision(5)}&latitude=${latitude.toPrecision(5)}&component=provgraph`;
>>>>>>> Added proxy, got it almost working. Server should now return build site to users.
            let result: any = await (await fetch(url)).json();//.json();
            return result;
        }
        catch (e) {
            console.log(e);
        }
    }
    
    async getLocationFromPosition(longitude: any, latitude: number): Promise<any> {

        try {
<<<<<<< HEAD
            const url = `/location?longitude=${longitude.toPrecision(5)}&latitude=${latitude.toPrecision(5)}`;
=======
            const url = `/api/v1/location?longitude=${longitude.toPrecision(5)}&latitude=${latitude.toPrecision(5)}&component=locationdata`;
>>>>>>> Added proxy, got it almost working. Server should now return build site to users.
            let result: any = await (await fetch(url)).json();//.json();
            return result;
        }
        catch (e) {
            console.log(e);
        }
    }

    private sortData(data: any): any {
        const sortedData = data?.slice()?.sort((a: any, b: any) => {
            return this.getTime(new Date(a.attributes.SummaryDate)) - this.getTime(new Date(b.attributes.SummaryDate));
        });
        return sortedData;
    }

    private getDataKeys(): Object {
        let destinationObj = [{}];
<<<<<<< HEAD
        Object.assign(destinationObj, this?.state?.prov.features[0].attributes);
=======
        const data = this?.state?.prov?.features;
        Object.assign(destinationObj, this?.state?.prov?.features[0].attributes);
>>>>>>> Added proxy, got it almost working. Server should now return build site to users.
        const dataKeys = Object.keys(destinationObj);
        let dropDownMenuItems: any[] = [];
        for(var i = 0; i < dataKeys.length; i++) {
            dropDownMenuItems.push(<Dropdown.Item eventKey={dataKeys[i]} key={dataKeys[i]}>{dataKeys[i]}</Dropdown.Item>)
        }
        return dropDownMenuItems;
    }
    
    private handleSelect=(e: any)=>{
            this.setState({selectedData: e});
    }

    private getXTickFormat(data: any): any {
        let domain: any
        let xTickFormat: any;
        if(data !== undefined) {
            domain = d3Extent (data, (d: any)=>new Date(d.attributes.SummaryDate)); 
            const tScale = d3ScaleTime().domain(domain).range([0, 1]);
            xTickFormat = tScale.tickFormat();
            return xTickFormat;
        }
    }

    private getYTickFormat(): any {
        const kbDomain: any = [0, (d: any)=>d3Max([d.setsize,d.getsize])];
        const kbScale = d3ScaleLinear().domain(kbDomain).range([0, 1]);
        const yTickFormat = kbScale.tickFormat(5,d3Format(".1f").toString());
        return yTickFormat;
    }
    
    private getProvName(): string | undefined {
        return this?.state?.location?.Territory;
    }

    render() {
        let provName = this.getProvName();
        let xTickFormat = this.getXTickFormat(this?.state?.prov.features);
        let yTickFormat = this.getYTickFormat();
        let dataKeys = this.getDataKeys()
        let sortedData = this.sortData(this?.state?.prov.features);

        const renderLineChart = (
            <div>
                <h6>{provName}</h6>
                <DropdownButton
                alignRight
                title={(((this?.state?.selectedData === undefined) ? 'Select a Data Set' : this?.state?.selectedData))}
                id='drop-down-menu-align-right'
                onSelect={this.handleSelect}>
                    {dataKeys}
                </DropdownButton>
                <LineChart width={525} height={300} data={sortedData} margin={{ top: 15, right: 10, left: 20, bottom: 25 }}>
                    <XAxis dataKey="attributes.SummaryDate" tickFormatter= {xTickFormat}>
                        <Label value="Date" offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis width={150} type="number" label={this?.state?.selectedData} tickFormatter={yTickFormat}/>
                    <Tooltip />
                    <Line type="monotone" dataKey={"attributes." + this?.state?.selectedData} stroke="#82ca9d" />
                </LineChart>
            </div>
        );
        return renderLineChart;
    }
}