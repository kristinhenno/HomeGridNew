import React from "react";
import styled from "styled-components";
import YahooPic from "./images/Yahoo.png";
import searchLogo from "./images/Search.png";
import Gear from "./images/Gear.png";
import Login from "./Login";
import X2 from "./images/X2.png";

class Yahoo extends React.Component {
  state = {
    userInput: "",
    settings: false
  };
  componentDidMount() {}

  handleKeyPress = event => {
    if (event.key === "Enter") {
      // console.log(this.state.userInput);
      window.location.href =
        "https://search.yahoo.com/search?p=" +
        this.state.userInput;
    }
  };

  handleChange = event => {
    this.setState({ userInput: event.target.value });
    event.preventDefault();
  };

  showSettings = event => {
    this.setState({
      settings: true
    });
  };

  noSettings = event => {
    this.setState({
      settings: false
    });
  };

  render() {
    // console.log(this.state.settings);
    return (
      <Style>
        {this.state.settings ? (
          <img
            id="x"
            onClick={e => this.noSettings()}
            src={X2}
          />
        ) : (
          <img
            id="gear"
            onClick={e => this.showSettings()}
            src={Gear}
          />
        )}

        {this.state.settings ? (
          <div>
            <div>
              <Login />
            </div>
          </div>
        ) : (
          <div id="yahooBox">
            <img id="yahooPic" src={YahooPic} />
            <div id="inputboxYahoo">
              <input
                id="inputYahoo"
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
              ></input>

              <img id="searchYahoo" src={searchLogo} />
            </div>
          </div>
        )}
      </Style>
    );
  }
}

const Style = styled.section`
  #gearbox {
    text-align: left;
    position: absolute;
  }
  #gearbox {
    text-align: left;
    position: absolute;
  }
  #gear {
    width: 5%;
    text-align: left;
    float: left;
    padding-left: 2.5%;
    padding-top: 2.5%;
    position: absolute;
  }

  #x {
    width: 2.2%;
    text-align: left;
    float: left;
    padding-left: 3%;
    padding-top: 3%;
    position: absolute;
  }

  #yahooBox {
    height: 32.33vh;
    border-radius: 15px;
    border: 1px solid #4600bf;
    background-color: white;
    text-align: center;
  }
  #inputboxYahoo {
    position: relative;
  }
  #searchYahoo {
    width: 1.2em;
    position: absolute;
    right: 3%;
    top: -1%;
    background-color: #4600bf;
    padding: 1.7%;
  }
  #inputYahoo {
    background: #fff;
    display: flex;
    border: 0px solid #00809d;
    padding: 1.5%;
    border-radius: 2px;
    z-index: 3;
    margin: 0 auto;
    width: 88%;
    margin-left: 4.8%;
    margin-top: 3vh;
    color: rgba(0, 0, 0, 0.87);
    word-wrap: break-word;
    outline: none;
    display: flex;
    flex: 100%;
    font-size: 16px;
    padding-left: 1.5%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    /* text-align: center; */
  }

  #yahooPic {
    width: 33%;
    margin-top: 7vh;
  }
  #input:focus {
    outline: none;
  }
`;

export default Yahoo;
