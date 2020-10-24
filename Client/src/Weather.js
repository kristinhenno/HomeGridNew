import React, { useState, Component } from "react";
import styled from "styled-components";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import searchLogo from "./images/Search.png";
import CurrentLocation from "./images/CurrentLocation.png";
import API from "./utils/API";
import key from "./utils/googleKey";

const id = "weather";

class Weather extends Component {
  state = {
    moduleInstanceId: "pooooop",
    currentCity: "",
    userInput: "Santa Barbara",
    userEntry: "",
    city: "",
    temp: "",
    name: "",
    maxTemp: "",
    minTemp: "",
    description: "",
    icon: "",
    forecast: [],
    hourlyForecast: [],
    hourlyTimes: [],
    hourly: false,
    apiError: false,
    style: {
      fontWeight: 900
    },
    cityLength: true,
    cityDescription: true
  };

  componentDidMount() {
    this.displayWeather();
    this.displayForecast();
    this.displayHourly();
    this.getCityLength();
    // this.getUserLocation();
  }

  handleChange = event => {
    this.setState({
      userInput: event.target.value
    });
    event.preventDefault();
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.checkWeather();
    }
  };

  getCityLength = () => {
    this.state.currentCity.length > 14
      ? this.setState({
          cityLength: false
        })
      : this.setState({
          cityLength: true
        });
  };

  getCityDescription = () => {
    this.state.description.length > 9
      ? this.setState({
          cityDescription: false
        })
      : this.setState({
          cityDescription: true
        });
  };

  getUserLocation = i => {
    if (i) {
      i.preventDefault();
    }

    navigator.geolocation.getCurrentPosition(position => {
      Geocode.setApiKey(key);
      Geocode.setLanguage("en");
      Geocode.setRegion("es");
      Geocode.enableDebug();
      Geocode.fromLatLng(
        position.coords.latitude,
        position.coords.longitude
      ).then(
        response => {
          const address = response.results[0].formatted_address;
          const userCity = address.split(",", 3);
          const city = userCity[1];
          this.setState(
            {
              userInput: city,
              currentCity: city,
              apiError: false
            },
            () => {
              this.displayWeather();
              this.displayForecast();
              this.displayHourly();
              this.getCityLength();
            }
          );
        },
        error => {
          console.error(error);
          this.setState({
            apiError: true
          });
        }
      );
    });
  };

  checkWeather = i => {
    if (i) {
      i.preventDefault();
    }

    API.getCurrentWeather(this.state.userInput)
      .then(res => {
        this.setState({
          apiError: false
        });
        this.displayWeather();
        this.displayForecast();
        this.displayHourly();
        this.getCityDescription();
        this.getCityLength();
      })
      .catch(err => {
        console.log(err);
      });
  };

  displayWeather = i => {
    if (i) {
      i.preventDefault();
    }

    API.getCurrentWeather(this.state.userInput)
      .then(res =>
        this.setState({
          name: res.data.name,
          description: res.data.weather[0].description,
          temp: res.data.main.temp,
          minTemp: res.data.main.temp_min,
          maxTemp: res.data.main.temp_max,
          icon: res.data.weather[0].icon,
          apiError: false
        })
      )
      .catch(err => {
        console.log(err);
        this.setState({
          apiError: true
        });
      });
    this.getCityDescription();
  };

  displayForecast = i => {
    if (i) {
      i.preventDefault();
    }

    API.getWeeklyWeather(this.state.userInput)
      .then(res =>
        this.setState({
          forecast: res.data.list,
          apiError: false
        })
      )

      .catch(err => {
        console.log(err);
        this.setState({
          apiError: true
        });
        this.setState({
          currentCity: this.state.currentCity
        });
      });
  };

  displayHourly = i => {
    if (i) {
      i.preventDefault();
    }
    API.getDailyWeather(this.state.userInput)
      .then(res =>
        this.setState({
          hourlyForecast: res.data.list.slice(0, 10),
          apiError: false
        })
      )
      .catch(err => console.log(err));

      const hours = new Date();
      const hour = hours.getHours();
    

      var i;


    



    API.getDailyWeather(this.state.userInput)
      .then(res =>
        res.data.list.slice(0, 10).map((list, index) => {
          const date = new Date(list.dt_txt + " UTC");
         

          var time = 0;
  
  if(hour > 12) {
    time = (hour-12) + index;
    if (time > 12){
      time = time-12;
     var timed = time.toString();
    var  times = timed + " am";
      this.setState({hourlyTimes: this.state.hourlyTimes.concat(times) });
    } else{
      time = time.toString();
   
      var  times = time + " pm";
      this.setState({hourlyTimes: this.state.hourlyTimes.concat(times) });
    } 

    }
    else {
      time = (hour) + index;
      if (time > 12){
        time = time-12;
   
       var timed = time.toString();
      var  times = timed + " am";
        this.setState({hourlyTimes: this.state.hourlyTimes.concat(times) });
      } else{
        time = time.toString();
  
        var  times = time + " pm";
        this.setState({hourlyTimes: this.state.hourlyTimes.concat(times) });
      }
  } 


    

          // this.setState({
          //   hourlyTimes: this.state.hourlyTimes.concat(
          //     date
          //       .toLocaleTimeString("en-US")
          //       .replace(":00:00", "")
          //       .toLowerCase()
          //   )
          // });
        })
      )
      .catch(err => {
        console.log(err);
        this.setState({
          apiError: true
        });
      });
  };

  render() {
    const d = new Date();
    const weekday = new Array(14);

    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    weekday[7] = "Sunday";
    weekday[8] = "Monday";
    weekday[9] = "Tuesday";
    weekday[10] = "Wednesday";
    weekday[11] = "Thursday";
    weekday[12] = "Friday";
    weekday[13] = "Saturday";
    weekday[14] = "Sunday";

    return (
      <Style id={this.state.moduleInstanceId}>
        <div id="weatherBox">
          <div id="nav">
            <div id="inputBox2">
              <Autocomplete
                id="inputBox"
                onKeyPress={this.handleKeyPress}
                onFocus={e => {
                  this.setState({ userInput: "" });
                }}
                value={this.state.userInput || ""}
                name="inputBox"
                placeholder={this.state.userInput}
                onChange={this.handleChange}
                types={["(cities)"]}
                componentRestrictions={{ country: "us" }}
                onPlaceSelected={place => {
                  const autoCompleteAdddres = place.formatted_address;
                  if (autoCompleteAdddres != null) {
                    const autoCompleteCity = autoCompleteAdddres.split(",", 3);
                    const city = autoCompleteCity[0];
                    this.setState({
                      currentCity: city,
                      userInput: autoCompleteCity,
                      userEntry: autoCompleteAdddres
                    });
                    this.checkWeather();
                  } else {
                    console.log("invalid");
                  }
                }}
              />
              <img
                onClick={e => {
                  this.getUserLocation();
                }}
                id="currentLocation"
                src={CurrentLocation}
              />
              <img id="search" src={searchLogo} />
            </div>
            <div id="options">
              <div id="optionsBox">
                <p
                  style={
                    this.state.hourly
                      ? { fontWeight: "normal" }
                      : { fontWeight: 900 }
                  }
                  className="hover"
                  onClick={e => {
                    this.setState({
                      hourly: false
                    });
                  }}
                  id="daily"
                >
                  Daily
                </p>
                <p id="linebreak"> | </p>
                <p
                  style={
                    this.state.hourly
                      ? { fontWeight: 900 }
                      : { fontWeight: "normal" }
                  }
                  className="hover"
                  onClick={e => {
                    this.setState({
                      hourly: true
                    });
                  }}
                  id="hourly"
                >
                  Hourly
                </p>
              </div>
            </div>
          </div>
          {this.state.apiError === false ? (
            <div className="box">
              <div className="current">
                <div id="leftBoxCurrent">
                  <div id={this.state.cityLength ? "city" : "longcity"}>
                    {this.state.name}
                  </div>
                  <div id="leftInner">
                    <div id="leftSide">
                      {this.state.temp === "" ? (
                        <p></p>
                      ) : (
                        <h1 id="currentTemp">{parseInt(this.state.temp)}°</h1>
                      )}

                      <h5
                        id={
                          this.state.cityDescription
                            ? "cityDescription"
                            : "longCityDescription"
                        }
                      >
                        {this.state.description}
                      </h5>
                    </div>
                  </div>
                  <div id="rightSide">
                    <div id="center">
                      {this.state.icon != "" ? (
                        <img
                          id="iconPic"
                          src={
                            "http://openweathermap.org/img/wn/" +
                            this.state.icon +
                            "@2x.png"
                          }
                        />
                      ) : (
                        <p></p>
                      )}
                      <div id="temps">
                        {this.state.temp === "" ? (
                          <p></p>
                        ) : (
                          <h5 className="minMax">
                            {parseInt(this.state.minTemp)}°
                          </h5>
                        )}
                        {this.state.temp === "" ? (
                          <p></p>
                        ) : (
                          <h5 className="minMax">
                            {parseInt(this.state.maxTemp)}°
                          </h5>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div id="rightBox">
                  {" "}
                  {this.state.hourly === false ? (
                    <div className="daily">
                      {this.state.forecast
                        .slice(-15)
                        .map(({ temp, weather }, index) => {
                          return (
                            <div id="dayBox">
                              <h1 id="day">
                                {weekday[d.getDay() + index + 1]}
                              </h1>
                              <img
                                id="dayPic"
                                src={
                                  "http://openweathermap.org/img/wn/" +
                                  weather[0].icon +
                                  "@2x.png"
                                }
                              />
                              <div id="dayTemp">
                                <p id="dayMin">{parseInt(temp.min)}°</p>
                                <p id="dayMax">{parseInt(temp.max)}°</p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div className="hourly">
                      {this.state.hourlyForecast
                        .slice(-10)
                        .map(({ main, weather }, index) => {
                          return (
                            <div id="hourBox">
                              <h1 id="hour">{this.state.hourlyTimes[index]}</h1>

                              <img
                                id="hourPic"
                                src={
                                  "http://openweathermap.org/img/wn/" +
                                  weather[0].icon +
                                  "@2x.png"
                                }
                              />
                              <div id="hourTemp">
                                <p id="hours">{parseInt(main.temp)}°</p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p>invalid city</p>
          )}
        </div>
      </Style>
    );
  }
}

export default Weather;

const Style = styled.section`
#weatherBox{
	overflow:hidden;
	height:32.33vh;
	border-radius: 15px;
}

#dayBox{
	display:inline-block;
	display:flex;
		width: 100%;
		margin-top: -5%;

}

#dayMin{
	display:inline-block;
	margin-right: 20%;
	padding-top: 13%;
}
#dayMax{
	display:inline-block;

}

#dayPic{
	display:inline-block;
	flex-grow:1;   
  width: 18%;
  height: 18%;
	margin-top: 2.7%;

}

#dayTemp{
	display:inline-block;
	flex-grow:1;
	font-size: 1vw;
	margin-right:5%;
	width: 27%;
}


#day{
	display:inline-block;	
	font-size: 1vw;
	text-align:left;
	align-self:left;

	flex-grow: 1;
    
	
	width: 31%;
    margin-left: 8%;
    font-weight: 600;
    margin-top: 10%;
    margin-bottom: 0;
}

#hourBox{
	display:inline-block;
	display:flex;
		width: 100%;
		margin-top:-5%
}

 #hours{
	display:inline-block;
	margin-right: 1%;
	padding-top: 1%;
	margin-left: 1%;
	margin-top: 28%;
}


#hourPic{
	display:inline-block;
  width: 22%;
  height: 22%;
    margin-left: 7%;
    margin-top: 3.5%;

}

#hourTemp{
	display:inline-block;
	flex-grow:1;
	font-size: 1vw;
	margin-right:1%;
	width: 7%;
	text-align:center;
}


#hour{
	display:inline-block;	
	font-size: 1vw;
	text-align:left;
	align-self:left;
	flex-grow:1;
	width: 7%;
   margin-left: 1%;
   font-weight: 600;
   margin-top: 10%;
	text-align:center;
}


.title{
	margin:0;
}
#temps{
  margin-top: -0.4%;
  text-align: center;

}
  #leftBoxCurrent {
    display: flex;
    width: 43%;
	flex-wrap: wrap;
    width: 50%;
	height: 23vh;
    overflow: scroll;
	margin: 2%;
	margin-right:1%;
    border-radius: 15px;
    background-color: #133467;
	overflow: hidden;
  }
  #rightBox {
	width: 50%;
	height: 23vh;
	overflow: scroll;
	margin-top: 2%;
    border-radius: 15px;
	margin-left: 1%;
	margin-right: 2%;
	background-color: #0c1f3e;

  }

  #leftInner{
	
	display: flex;
	width: 49%;
  }
  #leftSide {
    flex-grow: 1;
    color: white;
	margin-Left: 11%;
  }
  #rightSide {
    flex-grow: 1;
	display: flex;
	margin-top: -1%;
	width: 49%;
}



  }

  .minMax {
	display: inline-block;
    padding: 0 1%;
    color: white;
    margin: 0;
	font-size: 1vw;
  font-weight: 400;
  margin-left: 6%;
	

  }

  #iconPic {
    text-align: center;
	/* filter: brightness(0) invert(1); */
    /* margin-top: 9.2%;	   */
	  width: 90%;
  }

  .hover {
    position: relative;
    display: inline-block;
  }

  .hover:before {
    content: "";
    position: absolute;
    height: 4px;
    bottom: -6px;
    left: 0;
    background-color: #fff;
    width: 0%;
    transition: all 0.35s ease-in-out;
    opacity: 0;
  }

  .hover:hover:before {
    width: 100%;
    opacity: 1;
  }

  #cityDescription {
	text-transform: uppercase;

	font-size: 1vw;
margin-top: 6%;
    font-weight: 400;
    margin-bottom: 0;
    text-align: center;
  
  }

  #longCityDescription{
	text-transform: uppercase;

font-size: 1vw;
margin-top: 6%;
font-weight: 400;
margin-bottom: 0;
text-align: center;

  }

#currentTemp{
    font-size: 4.5vw;
	margin:0px;	
	/* margin: 0 0 0 0.5em; */
	margin-top: 0%;
	font-weight:500;
}

  
  #currentText {
  }

  #currentText:hover {
    cursor: pointer;
  }

  #center{
    margin-left: 22%;
  }

  #nav {
    background-color: #133467;
    padding: 2%;
	padding-bottom: 3%;
    padding-top: 2%;
  }

  #current {
	  display:flex;
    display: inline-block;
    font-size: 13px;
    flex-grow: 1;
    text-align: left;
    margin-left: 8%;
  }

  #options {
   color:white;
  }

  #hourly {
    display: inline-block;
    margin-left: 0.3em;
	margin-top:1%;
	margin-bottom: 0%;
  }

  #hourly:hover {
    cursor: pointer;
  }

  #daily {
    display: inline-block;
    margin-right: 0.3em;
	margin-left: 2%;
	margin-top:1%;
	margin-bottom: 0%;
  }

  #daily:hover {
    cursor: pointer;
  }

#optionsBox{
	text-align: right;
	font-size: 0.8em;
}
  #linebreak {
    display: inline-block;
	margin-top:1%;
	margin-bottom: 0%;
  }
  #navOptions {
    background-color: #0c1f3e;
    color: white;
    display: flex;
  }
  #search {
    width: 1em;
    position: absolute;
    right: -1%;
    top: 20%;
  }
  #currentLocation {
    width: 0.65em;
    position: absolute;
    left: 2%;
    top: 20.5%;
  }


  #currentLocation:hover {
    cursor: pointer;
  }

  #city {
    text-transform: capitalize;

	font-size: 1.9vw;
    width: 100%;
    color: white;
	margin-bottom:0;
	font-weight: 400;
  align-self: center;
  text-align: center;

  }

  #longcity {
    text-transform: capitalize;

	font-size: 1em;
    width: 100%;
    color: white;
	margin-bottom:0;
	font-weight: 400;
	align-self: center;
	margin-top: 8%;

  }
  #inputBox {
    margin: 0 auto;
    border-radius: 10px;
    border: 0;
    background-color: #425c86;
    color: white;
    padding: 1.5%;
    width: 100%;
    text-align: center;
    font-size: 14px;
    text-transform: capitalize;
  }
  #inputBox2 {
    position: relative;
    width: 60%;
	display: inline-block;
	float: left;
   
  }

  #inputBox:focus {
    outline: none;
  }
  #inputBox::placeholder {
    color: lightgray;
  }
  .box {
    /* outline: red 1px solid; */
    height: 26vh;
    width: 100%;
  } 
  .current {
    background-color: #425c86;
	display:flex;
	min-height: min-content;
	height: 27vh;

  }
  .daily {
    background-color: #0c1f3e;;
margin-top:0; 
color:white; }

  .hourly {
    background-color: #0c1f3e;
	margin-top:0;
	color:white;

  }

  @media only screen and (min-width: 0px) and (max-width: 600px) { 
 #city {
      text-transform: capitalize;
      font-size: 1.2em;
      width: 100%;
      color: white;
      margin-bottom: 0;
      font-weight: 400;
      -webkit-align-self: center;
      -ms-flex-item-align: center;
      align-self: center;
      text-align: center;
  }

  #currentTemp {
    font-size: 3.5em;
    margin: 0px;
    margin-top: 0%;
    font-weight: 500;

  }

  #cityDescription {
    text-transform: uppercase;
    font-size: 0.8em;
    margin-top: 6%;
    font-weight: 400;
    margin-bottom: 0;
    text-align: center;
}

.minMax {
  display: inline-block;
  padding: 0 1%;
  color: white;
  margin: 0;
  font-size: 0.9em;
  font-weight: 400;
  margin-left: 6%;
}
    #iconPic {
    text-align: center;
    width: 97%;
}

#day {
  display: inline-block;
  font-size: 0.7em;
  text-align: left;
  -webkit-align-self: left;
  -ms-flex-item-align: left;
  align-self: left;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  width: 31%;
  margin-left: 8%;
  font-weight: 600;
  margin-top: 10%;
  margin-bottom: 0;
}

 #dayTemp {
  display: inline-block;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  font-size: 0.5em;
  margin-right: 5%;
  width: 27%;
}

#hour {
  display: inline-block;
  font-size: 0.7em;
  text-align: left;
  -webkit-align-self: left;
  -ms-flex-item-align: left;
  align-self: left;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  width: 7%;
  margin-left: 1%;
  font-weight: 600;
  margin-top: 10%;
  text-align: center;
}

#hourTemp {
  display: inline-block;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  font-size: 0.8em;
  margin-right: 1%;
  width: 7%;
  text-align: center;
}
  
  }


`;
