import React, { Component } from "react";
import API from "./utils/API";
import styled from "styled-components";
import searchLogo from "./images/Search.1.png";
import Pic1 from "./images/1.jpg";
import Pic2 from "./images/2.jpg";
import Pic3 from "./images/3.jpg";
import Pic4 from "./images/4.jpg";
import Pic5 from "./images/5.jpg";
import Pic6 from "./images/6.jpg";
import Pic7 from "./images/7.jpg";
import yelpPic from "./images/Yelp.png";
import Geocode from "react-geocode";
import ClipLoader from "react-spinners/ClipLoader";
import StarRatings from "react-star-ratings";

class Yelp extends Component {
  state = {
    businesses: [],
    searchTerm: "",
    searchCity: "",
    yelpPics: [Pic1, Pic2, Pic3, Pic4, Pic5, Pic6, Pic7],
    picNumber: 0,
    searched: false,
    background: {
      backgroundImage: "none",
      marginLeft: 0,
      marginRight: 0
    },
    backgroundColor: {
      background: "linear-gradient(#d90007, #c91400)"
    },
    loading: false,
    userLoc: ""
  };

  handleChangeTerm = event => {
    this.setState({ searchTerm: event.target.value });
  };
  handleChangeCity = event => {
    this.setState({ searchCity: event.target.value });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.searched();
      this.setState({
        searched: true,
        loading: true
      });
    }
  };

  getUserLocation = i => {
    if (i) {
      i.preventDefault();
    }

    navigator.geolocation.getCurrentPosition(position => {
      Geocode.setApiKey(
        "AIzaSyCwpDhxfo8aygIX4ZrfdC4NULGK8KKteVc"
      );
      Geocode.setLanguage("en");
      Geocode.setRegion("es");
      Geocode.enableDebug();
      Geocode.fromLatLng(
        position.coords.latitude,
        position.coords.longitude
      ).then(
        response => {
          const address =
            response.results[0].formatted_address;
          const userCity = address.split(",", 3);

          const city = userCity[1];

          this.setState(
            {
              searchCity: city,
              userLoc: city
            },
            () => {}
          );
        },
        error => {
          console.error(error);
          this.setState({ apiError: true });
        }
      );
    });
  };

  retrieveBusinesses = () => {
    API.getYelpSearch(
      this.state.searchTerm,
      this.state.searchCity
    )
      .then(res =>
        this.setState({
          businesses: res.data,
          loading: false
        })
      )
      .catch(err => console.log(err));
  };

  getYelpPic = () => {
    const half = Math.floor(Math.random() * 2);
    let number = 0;

    if (half != 1) {
      number = Math.floor(Math.random() * 7);
    } else {
      number = 0;
    }

    this.setState({
      background: {
        backgroundImage: `url(${this.state.yelpPics[number]})`
      }
    });
  };

  noResults = () => {
    this.setState({
      background: {
        backgroundImage: "none"
      },
      searched: true,
      loading: true,
      backgroundColor: {
        background: "#f5f5f5"
      }
    });

    setTimeout(() => {
      this.retrieveBusinesses();
    }, 1000);
  };

  searched = () => {
    if (
      this.state.searchTerm.length > 0 &&
      this.state.searchCity.length > 0
    ) {
      this.setState({
        background: {
          backgroundImage: "none"
        },
        searched: true,
        loading: true,
        backgroundColor: {
          background: "#f5f5f5"
        }
      });
      this.retrieveBusinesses();
    } else {
      if (this.state.userLoc.length < 1) {
        this.setState({
          searchCity: "San Francisco"
        });
      }
      if (this.state.searchTerm.length > 0) {
        this.setState({
          searchCity: this.state.userLoc
        });
      }
      if (this.state.searchCity.length > 0) {
        this.setState({
          searchTerm: "coffee"
        });
      }
      this.noResults();
    }
  };

  componentDidMount() {
    this.getYelpPic();
    this.getUserLocation();
  }

  render() {
    return (
      <Style>
        <div id="yelp" style={this.state.backgroundColor}>
          <div id="yelpSearch">
            <div
              id="backgroundPic"
              style={this.state.background}
            >
              {!this.state.searched ? (
                <img src={yelpPic} id="yelpPic" />
              ) : (
                <div></div>
              )}

              <div id="inputDiv">
                <div id="inputTitle1">
                  <p className="inputTitle2">Find</p>
                </div>
                <input
                  onKeyPress={this.handleKeyPress}
                  id="input1"
                  placeholder="coffee, takeout, etc.."
                  value={this.state.searchTerm}
                  onChange={this.handleChangeTerm}
                  onFocus={e => {
                    this.setState({ searchTerm: "" });
                  }}
                ></input>
                <div id="inputTitle2">
                  <p className="inputTitle2">Near</p>
                </div>
                <input
                  onKeyPress={this.handleKeyPress}
                  id="input2"
                  placeholder={this.state.searchCity}
                  value={this.state.searchCity}
                  onChange={this.handleChangeCity}
                  types={["(cities)"]}
                  componentRestrictions={{ country: "us" }}
                ></input>

                <div
                  onClick={e => {
                    this.searched();
                    this.setState({
                      searched: true,
                      loading: true
                    });
                  }}
                  id="searchButton"
                >
                  <img id="searchYelp" src={searchLogo} />
                </div>
              </div>

              {this.state.searched ? (
                <div id="yelpResults">
                  {this.state.businesses.length != 0 ? (
                    this.state.loading ? (
                      <p className="spinner">
                        <ClipLoader
                          size={30}
                          color={"#d90007"}
                        />
                      </p>
                    ) : (
                      this.state.businesses.map(
                        business => (
                          <a
                            target="_blank"
                            id="card"
                            href={business.url}
                          >
                            <div id="businessCard">
                              <div id="imgDiv">
                                <img
                                  id="businessPic"
                                  src={business.imgurl}
                                />
                              </div>
                              <div id="infoDiv">
                                <p id="name">
                                  <a
                                    id="link"
                                    href={business.url}
                                  >
                                    {business.name}
                                  </a>
                                </p>
                                <div id="ratings">
                                  <StarRatings
                                    rating={business.rating}
                                    starRatedColor="#dfe1e6"
                                    numberOfStars={5}
                                    name="rating"
                                    starDimension="2vh"
                                    starSpacing="0.7%"
                                    className="star"
                                    starEmptyColor="white"
                                  />
                                  <p id="reviewCount">
                                    {business.reviewcount}
                                  </p>
                                </div>
                                <p id="description">
                                  {
                                    business.categories[0]
                                      .title
                                  }
                                </p>
                              </div>
                            </div>
                          </a>
                        )
                      )
                    )
                  ) : this.state.loading ? (
                    <p className="spinner">
                      <ClipLoader
                        size={30}
                        color={"#d90007"}
                      />
                    </p>
                  ) : (
                    <p> no results </p>
                  )}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </Style>
    );
  }
}
const Style = styled.section`
  #ratings {
    /* display: flex; */
  }

  #reviewCount {
    margin: 0;
    font-size: 0.8vw;
	margin-left: 1%;

	display: inline-block;
}
  }
  #card {
    text-decoration: none;
  }
  #description {
    margin: 0;
    text-decoration: none;
    font-size: 1vw;
  }
  #name {
    margin: 0;
    text-decoration: none;
  }

  #link {
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 1.1vw;
  }
  #businessCard {
    color: white;
    display: flex;
    border-radius: 5px;
    border: 2px solid #d90007;
    width: 93%;
    margin-top: 1vh;
    margin-left: 3%;
    background: linear-gradient(#d90007, #c91400);
  }
  #infoDiv {
    width: 75%;
    text-align: left;
    margin-left: 3%;
    margin-top: 1.5%;
  }
  .star {
    width: 100%;
  }
  .star-ratings {
    width: 7vw;
  }
  .spinner {
    margin-top: 10vh;
  }
  #businessPic {
    height: 10vh;
    width: 4vw;
    border-radius: 6%;
    margin: 5%;
  }
  #yelpPic {
    padding-bottom: 2%;
    width: 34%;
    padding-top: 1%;
    padding-top: 3%;
  }
  #yelpResults {
    overflow: scroll;
    height: 84%;
    width: 100%;
    margin-top: 1%;
  }
  #backgroundPic {
    margin-left: 2%;
    margin-right: 2%;
    background-size: cover;
    border-radius: 15px;
    height: 30vh;
  }
  #searchButton {
    background: linear-gradient(#d90007, #c91400);
    width: 12%;
    margin-bottom: 0%;
    padding: 0%;
    border-radius: 2px;
  }
  #searchYelp {
    filter: brightness(0) invert(1);
    width: 1em;

    padding-left: 5%;
    padding-top: 16%;
  }

  #yelpSearch {
    padding-top: 10vh;
    height: 83%;
    padding-top: 1.2vh;
	text-align: center;
  }

  #inputTitle1 {
    padding-top: 1.5%;
    padding-bottom: 1.5%;
  }

  #inputTitle2 {
    padding-top: 1.5%;
    padding-bottom: 1.5%;
  }

  .inputTitle2 {
    margin: 0;
    padding-top: 1.5%;
    padding-bottom: 1.5%;
    color: #666;
    font-weight: 700;
  }

  #yelp {
    height: 32.33vh;
    border-radius: 15px;
    top: 16.2vh;
  }
  #inputDiv {
    background: #fff;
    box-shadow: none;
    z-index: 3;
    margin: 0 auto;
    width: 93.5%;
    margin-left: 2.8%;
    color: rgba(0, 0, 0, 0.87);
    word-wrap: break-word;
    outline: none;
    display: flex;
    flex: 100%;
    justify-content: space-between;

    font-size: 16px;
    padding-left: 1%;
    border: none;
    border-radius: 2px;
  }

  #input1 {
    border: 0;

    width: 35%;
    margin-left: 2%;
	margin-top: .2vh;
  }

  #input2 {
    border: 0;
    margin-left: 2%;
    width: 30%;
	margin-top: .2vh;
  }
  #input1:focus {
    outline: none;
  }
  #input2:focus {
    outline: none;
  }
  .pac-container {
    border: blue 5px solid !important;
  }
`;
export default Yelp;
