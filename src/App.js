import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import './App.css';
import ColumnChart from './ColumnChart';
import LineChart from "./LineChart";
import "./charts.css"
import Photo from "./Photo";
import MyNavbar from "./Navbar";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            moistureData: [],
            pumpData: [],
        }
    }

    componentDidMount() {
        this.fetchPumpData()
        this.fetchMoistureData()
    }

    // "credentials: include" configures js to append user-credentials into request-headers sent via fetch
    fetchPumpData = () => {
        fetch("http://localhost:6060/dataview/pump", {credentials: 'include',})
            .then(response => response.json())
            .then(pumpData => {
                this.setState({
                    pumpData: pumpData.pumpList,
                })
            })
    }

    // "credentials: include" configures js to append user-credentials into request-headers sent via fetch
    fetchMoistureData = () => {
        fetch("http://localhost:6060/dataview/moisture", {credentials: 'include',})
            .then(response => response.json())
            .then(moistureData => {
                this.setState({
                    moistureData: moistureData.moistureList,
                })
            })
    }

    render() {
        const moistureData = this.state.moistureData.map(data => {
            return {dateTime: data.moistureDateTime, percentage: parseInt(data.moisturePercentage)}
        })
        const pumpData = this.state.pumpData.map(data => {
            return {dateTime: data.startWatering, duration: parseInt(data.stopWatering) - parseInt(data.stopWatering)}
        })

        return (
            <div className="App">
                <div>
                    <MyNavbar/>
                </div>
                <div className="container col-lg-12">
                    <div className="row">
                        <div className="col col-md-6">
                            <LineChart div={"moistureChart"} data={moistureData} xAxisName={"dateTime"}
                                       yAxisName={"percentage"}/>
                            <Button id="moistureButton" onClick={() => {
                                this.fetchMoistureData()
                            }}>refresh</Button>
                        </div>
                        <div className="col col-md-6">
                            <Photo/>
                            <Button id="photoButton" onClick={() => {
                                this.fetchMoistureData()
                            }}>picture</Button>
                        </ div>
                    </div>
                    <div className="row">
                        <div className="col col-md-6">
                            <ColumnChart div={"pumpChart"} data={pumpData} xAxisName={"dateTime"}
                                         yAxisName={"duration"}/>
                            <Button id="pumpButton" onClick={() => {
                                this.fetchMoistureData()
                            }}>water</Button>
                        </div>
                        <div className="col col-md-6">
                            <ColumnChart div={"exposureChart"} data={moistureData} xAxisName={"dateTime"}
                                         yAxisName={"percentage"}/>
                            <Button id="exposureButton" onClick={() => {
                                this.fetchMoistureData()
                            }}>refresh</Button>

                        </div>
                    </div>
                </div>
            </div>
        );
    }


}