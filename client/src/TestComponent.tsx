import {Component} from 'react';
//import axios from 'axios';

export default class TestComponent extends Component<{}, { world: string}>{
    constructor(props: any) {
        super(props);
        this.state = {
            world: "null"
        }
    }
    render() {
        return (
            <div>
                <p>{this.state.world}</p>
            </div>
        )
    }
}