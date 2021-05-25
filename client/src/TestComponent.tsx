// import {Component} from 'react';
// import axios from 'axios';

export default class TestComponent{}
// export default class TestComponent extends Component {
//     state = {
//         externalData: null,
//     };
//     private _asyncRequest: string; 

//     componentWillMount() {
//         this._asyncRequest = loadMyAsyncData().then(
//             externalData => {
//                 this._asyncRequest = null;
//                 this.setState({ externalData });
//             }
//         );
//     }  

//     componentWillUnmount() {
//         if (this._asyncRequest) {
//         this._asyncRequest.cancel();
//         }
//     }

//     render() {
//         if (this.state.externalData === null) {
//          return (<div>Data not yet loaded</div>)
//         } else {
//             return (<div></div>)
//     }
//   }
// }