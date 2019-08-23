import React, { Component } from "react";
import "./App.css";
import ColumnChart from "./ColumnChart";
import LineChart from "./LineChart";
import "./charts.css";
// import Photo from "./Photo";
import { Button } from "react-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moistureData: [],
      pumpData: [],
      photoData : []
    };
  }

  componentDidMount() {
    this.fetchPumpData();
    this.fetchMoistureData();
    this.showPhoto();
  }

  // "credentials: include" configures js to append user-credentials into request-headers sent via fetch
  fetchPumpData = () => {
    fetch("http://localhost:6060/dataview/pump", { credentials: "include" })
      .then(response => response.json())
      .then(pumpData => {
        this.setState({
          pumpData: pumpData.pumpList
        });
      });
  };

  // "credentials: include" configures js to append user-credentials into request-headers sent via fetch
  fetchMoistureData = () => {
    fetch("http://localhost:6060/dataview/moisture", { credentials: "include" })
      .then(response => response.json())
      .then(moistureData => {
        this.setState({
          moistureData: moistureData.moistureList
        });
      });
  };

  showPhoto = () => {
    fetch("http://localhost:6060/readImage", { credentials: "include" })
    // response - was wir von Seite bekommen => wandeln in json-Format um
    .then(response => response.json())
    // photoData = response.json() als Parameter
    .then(photoData => {
      this.setState({
        photoData: photoData
       
      }) 
      console.log(this.state.photoData)

      

      });
   
    };


  render() {
    const moistureData = this.state.moistureData.map(data => {
      // map-function generates an Array and the return statement maps the data
      return {
        dateTime: data.moistureDateTime,
        percentage: parseInt(data.moisturePercentage)
      };
    });
    const pumpData = this.state.pumpData.map(data => {
      return {
        dateTime: data.startWatering,
        duration: parseInt(data.stopWatering) - parseInt(data.stopWatering)
      };
    });
   
    const img = "data:image/jpg;base64," + this.state.photoData.encodedImage
    console.log(img)
    
    return (
      <div className="App">
        <div className="container col-lg-12">
          <div className="row">
            <div className="col col-md-6">
              <LineChart
                div={"moistureChart"}
                data={moistureData}
                xAxisName={"dateTime"}
                yAxisName={"percentage"}
              />
            </div>
            <div className="col col-md-6">
              <img className="image" src={img} alt="error" style={{width: "inherit", height: "inherit"}}/>
            </div>
          </div>

          <div className="row">
            <div className="col col-md-6">
              <Button
                id="moistureButton"
                onClick={() => {
                  this.fetchMoistureData();
                }}
              >
                refresh
              </Button>
            </div>
            <div className="col col-md-6">
              <Button
                id="photoButton"

              >
                picture
              </Button>
            </div>
          </div>

          <div className="row">
            <div className="col col-md-6">
              <ColumnChart
                div={"pumpChart"}
                data={pumpData}
                xAxisName={"dateTime"}
                yAxisName={"duration"}
              />
            </div>
            <div className="col col-md-6">
              <ColumnChart
                div={"exposureChart"}
                data={moistureData}
                xAxisName={"dateTime"}
                yAxisName={"percentage"}
              />
            </div>
          </div>

          <div className="row">
            <div className="col col-md-6">
              <Button
                id="pumpButton"
                onClick={() => {
                  this.fetchMoistureData();
                }}
              >
                water
              </Button>
            </div>

            <div className="col col-md-6">
              <Button
                id="exposureButton"
                onClick={() => {
                  this.fetchMoistureData();
                }}
              >
                refresh
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
