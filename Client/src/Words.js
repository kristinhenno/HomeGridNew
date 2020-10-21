import React, { Component } from "react";
import styled from "styled-components";
import API from "./utils/API";
import Dictionary from "./Dictionary";
import Thesaurus from "./Thesaurus";

class Words extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <Style>
        <div id="words">
          <Dictionary />
          {/* <Thesaurus /> */}
        </div>
      </Style>
    );
  }
}

const Style = styled.section`
  #words {
    overflow: hidden;
    height: 32.4vh;
    border-radius: 15px;
  }
`;

export default Words;
