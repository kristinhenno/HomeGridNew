import React, { Component } from "react";
import styled from "styled-components";
import API from "./utils/API";

class Thesaurus extends React.Component {
  state = {
    userInput: "thesaurus",
    syn: []
  };

  handleChange = event => {
    this.setState({
      userInput: event.target.value
    });
    event.preventDefault();
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.retrieveThesaurus();
    }
    // console.log(this.state.syn);
  };

  retrieveThesaurus = i => {
    if (i) {
      i.preventDefault();
    }

    API.thesaurus(this.state.userInput).then(res => {
      this.setState({
        syn: res.data
      });
    });
  };

  componentDidMount() {
    this.retrieveThesaurus();
  }

  render() {
    return (
      <Style>
        <div>
          <input
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}
          ></input>
          {this.state.syn.map(def => (
            <div>
              <h2>{def.meta.id.split(":")[0]}</h2>

              {def.meta.syns[0].map(syn => (
                <p>{syn}</p>
              ))}
            </div>
          ))}
        </div>
      </Style>
    );
  }
}

const Style = styled.section``;

export default Thesaurus;
