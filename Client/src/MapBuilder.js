import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer,
  DirectionsService,
  Marker
} from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import styled from "styled-components";
Geocode.setApiKey("AIzaSyCwpDhxfo8aygIX4ZrfdC4NULGK8KKteVc");
Geocode.setLanguage("en");
Geocode.setRegion("us");
Geocode.enableDebug();


const google = window.google;

class MapBuilder extends Component {
  
  state = {
    directions: null,
    currentLat: 34.4253876,
    currentLong:-119.7045534,
    destination: "",
    destinationLat: 0,
    destinationLong: 0,
    startLat: 0, 
    startLong: 0, 
    start: "", 
    directions: [], 
    searched:false, 
    loaded: false,
    userInput: "",
    userDestination: "", 
    show: false

  };

  handleChange = event => {
    this.setState({ userInput: event.target.value });
  };

  handleChangeDest = event => {
    this.setState({ userDestination: event.target.value });
  };


  GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
      yesIWantToUseGoogleMapApiInternals
      defaultOptions={{mapTypeControl: false, streetViewControl: false, fullscreenControl: false}}
    center={ this.state.startLat === 0 ?  { lat: this.state.currentLat, lng: this.state.currentLong } : { lat: this.state.startLat, lng: this.state.startLong }}
        defaultZoom={9}
       
      >
        
        <DirectionsRenderer
          directions={this.state.directions}
          panel={ document.getElementById('panel') }
        />
      </GoogleMap> 
     ));


  getCoords = () => {
    
    Geocode.fromAddress(this.state.destination).then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      this.setState({
        destinationLat: lat,
        destinationLong: lng
      })
    },
    error => {
      console.error(error);
    }
  );
  }

  getCoordsStart = () => {
    
    Geocode.fromAddress(this.state.start).then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      this.setState({
       startLat: lat,
        startLong: lng
      })
    },
    error => {
      console.error(error);
    }
  );
  }

  getDirections =() => {
        
    const directionsService = new google.maps.DirectionsService();




    const origin = { lat: this.state.startLat, lng: this.state.startLong };
    const destination = { lat: this.state.destinationLat, lng: this.state.destinationLong };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result, 
            searched: true,

          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

 

 componentDidMount() {
  let currentComponent = this;

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {

      var lat = position.coords.latitude;
      var long = position.coords.longitude;

      

      currentComponent.setState({
        currentLat: lat,
        currentLong: long
      });

    });
  } else {
    console.log("Not Available");
  }
  
  }

  render() {


    return (
      
      <Style>
      <div>
        <this.GoogleMapExample
         panel={ document.getElementById('panel') }
          containerElement={<div style={{ height: `32.33vh;`, width: "99%", borderRadius: "15px" }} />}
          mapElement={<div style={{ height: `32.33vh`, borderRadius: "15px"  }} />}
        />




        <Autocomplete id="start"
    style={{width: '40%'}}
    onPlaceSelected={(place) => {
  
      this.setState({
        start: place.formatted_address,
        userInput: place.formatted_address
      } , ()=> {this.getCoordsStart()})
    }}
    types={['address']}
    componentRestrictions={{country: "us"}}
    value={this.state.userInput}
    placeholder="From"
    onChange={this.handleChange}

/>
        <Autocomplete id="destination"
    style={{width: '40%'}}
    onPlaceSelected={(place) => {
      this.setState({
        destination: place.formatted_address,
        userDestination: place.formatted_address
      } , ()=> {this.getCoords()})
    }}
    types={['establishment']}
    componentRestrictions={{country: "us"}}
  
    placeholder="To"
    onChange={this.handleChangeDest}
    value={this.state.userDestination}
/>

<div className={this.state.show ? "showPan" : "dontShow"} id="panel"></div> 

{this.state.searched ? <p onClick={()=> this.setState({show: true})} id="arrow">&#x2B05;</p> : <p></p>}

{this.state.show ? <p onClick={()=> this.setState({show: false})} id="arrow">&#x27A1;</p> : <p></p>}


<button id="search" onClick={() => this.getDirections()}>Route</button>
        {/* {this.state.currentLat != 0 ?  <Marker 
      position={{ lat: this.state.currentLat, lng: this.state.currentLong }}
    /> : <p></p> } */}
      </div>
      </Style>
    );
  }
}

const Style = styled.section`
.dontShow{
display:none;}

#start{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  width: 50%;
  border: 0;
    margin-top: 1.5%;
    margin-left: 1.5%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2), 0 -1px 0px rgba(0,0,0,0.02);
}

#start:focus{
outline:none;
}

#destination:focus{
  outline:none;
  }
  
#destination{
  margin-left: 1.5%;
  position: absolute;
  top: 20px;
  left: 0;
  z-index: 5;
  width: 50%;
  border: 0;
    margin-top: 1.5%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2), 0 -1px 0px rgba(0,0,0,0.02);
}

#search{
  position: absolute;
  top: 47px;
  margin-left: 1.5%;
  background-color: #5083d4;
  border: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2), 0 -1px 0px rgba(0,0,0,0.02);
  color: white;
  font-weight: 900;
}

#search:hover{
  cursor: pointer
}

#search:focus{
  outline: none;
}

#panel{
  position: absolute;
    direction: ltr;
    width: 50%;
    top: 0;
    background-color: white;
    right: 0;
    height: 32.33vh;
    overflow: scroll;
    font-size: 0.7em;
    margin-right: 1%;
}

.adp-marker2{

  height: 3vh;

}

#arrow{
  background-color: #5083d4;
  color: white;
  position: absolute;
  top: 0;
  right: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2), 0 -1px 0px rgba(0,0,0,0.02);
  padding: 1%;
  margin-right: 1%;
}

#arrow:hover{
  cursor: pointer
}
`;

export default MapBuilder;
