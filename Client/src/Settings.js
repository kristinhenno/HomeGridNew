import React from "react";
import styled from "styled-components";
import API from "./utils/API";
import Arrow from "./images/arrow.png";
import { Shake } from "reshake";
import { getFromStorage } from "./utils/storage";

class Settings extends React.Component {
  state = {
    userId: "",
    token: "",
    isLoading: true,
    isLoggedIn: false,
    currentGrid: [],
    selected: "",
    shake: false,
    optionsArray: [
      "Yelp",
      "Weather",
      // "Google",
      // "Bing",
      // "Yahoo",
      "Checklist",
      "Words",
      // "Stocks", 
      "Gif",
      "News", 
      "Maps", 
      "Streaming", 
      "Calculator"
    ]
  };

  handleCheck(e) {
    this.setState({
      selected: e.currentTarget.dataset.id,
      shake: true
    });
  }

  handleCheckReplace(e) {
    // this.setState({currentGrid: })
    const newGrid = this.state.currentGrid.slice(); //copy the array
    
    if (
      e.currentTarget.dataset.name != "Google" &&
      e.currentTarget.dataset.name != "Bing"
    ) {
      newGrid[parseInt(e.currentTarget.dataset.id)] = this.state.selected; //execute the manipulations
      this.setState({ currentGrid: newGrid }); //set the new state
  
      this.setState({ selected: "", shake: false });
    }
  }

  retrieveGrid = i => {
    if (i) {
      i.preventDefault();
    }
    const id = this.state.userId;

    API.retrieve(id).then(res => {
      if (res.data.grid.length > 0) {
    
        const gridArray = res.data.grid.map(item => item.widget);
    
        this.setState({
          currentGrid: gridArray,
          isLoading: false
        });
      }
    });
  };

  verify = i => {
    if (i) {
      i.preventDefault();
    }
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      API.verify(token).then(res => {
        if (res) {
       
          this.setState({
            token: token,
            isLoggedIn: true,
            userId: res.data.userId,
            isLoading: true
          });
        
          this.retrieveGrid();
        } else {
          this.setState({
            isLoading: true
          });
        }
      });
    } else {
   
      this.setState({
        isLoading: false,
        isLoggedIn: false
      });
    }
  };

  refreshPage() {
    window.location.reload(false);
    this.setState({
      needRefresh: false
    });
  }

  save = i => {

    if (this.state.currentGrid.includes("Google") || this.state.currentGrid.includes("Yelp") || this.state.currentGrid.includes("Bing")){
    const id = this.state.userId;


    this.setState({ selected: "", shake: false });

    let grid = this.state.currentGrid.map(item => {
      return { widget: item };
    });
   

    API.update(id, grid).then(res => {
      if (res) {
        this.refreshPage();
      }
    });
  }
  };

  componentDidMount() {
    this.verify();
  }

  render() {
    console.log(this.state.selected)
    return (
      <Style>
        {this.state.isLoading ? (
          <div id="loadingDiv"></div>
        ) : (
          <div>
            <div id="settings">
              <div id="settingsBox">
                {this.state.optionsArray.map(option => (
                  <p
                    className={
                      this.state.selected === option
                        ? "selected"
                        : "notSelected"
                    }
                    onClick={this.handleCheck.bind(this)}
                    data-id={option}
                  >
                    <img
                      id="optionThumbnail"
                      src={`${process.env.PUBLIC_URL}/images/thumbnails/${option}.png`}
                    />
                  </p>
                ))}
              </div>

              <div id="replaceArrowBox">
                <img id="replaceArrow" src={Arrow} />
              </div>
              <div id="bodyBox">
                <tbody>
                  <tr id="row">
                    <td
                      onClick={this.handleCheckReplace.bind(this)}
                      data-id="0"
                      data-name={this.state.currentGrid[0]}
                    >
                      {this.state.currentGrid[0] === "Google" ||
                      this.state.currentGrid[0] === "Bing" ||
                      this.state.currentGrid[0] === "Yahoo" ? (
                        <img
                          className="thumbnail"
                          src={`${process.env.PUBLIC_URL}/images/thumbnails/${this.state.currentGrid[0]}.png`}
                        />
                      ) : (
                        <Shake
                          active={this.state.shake}
                          h={1}
                          v={1}
                          r={0}
                          dur={300}
                          int={10}
                          max={100}
                          fixed={true}
                          fixedStop={false}
                          freez={false}
                        >
                          <img
                            className="thumbnail"
                            src={`${process.env.PUBLIC_URL}/images/thumbnails/${this.state.currentGrid[0]}.png`}
                          />
                        </Shake>
                      )}
                    </td>
                    <td
                      onClick={this.handleCheckReplace.bind(this)}
                      data-id="1"
                      data-name={this.state.currentGrid[1]}
                    >
                      {this.state.currentGrid[1] === "Google" ||
                      this.state.currentGrid[1] === "Bing" ||
                      this.state.currentGrid[1] === "Yahoo" ? (
                        <img
                          className="thumbnail"
                          src={`${process.env.PUBLIC_URL}/images/thumbnails/${this.state.currentGrid[1]}.png`}
                        />
                      ) : (
                        <Shake
                          active={this.state.shake}
                          h={1}
                          v={1}
                          r={0}
                          dur={300}
                          int={10}
                          max={100}
                          fixed={true}
                          fixedStop={false}
                          freez={false}
                        >
                          <img
                            className="thumbnail"
                            src={`${process.env.PUBLIC_URL}/images/thumbnails/${this.state.currentGrid[1]}.png`}
                          />
                        </Shake>
                      )}
                    </td>
                    <td
                      onClick={this.handleCheckReplace.bind(this)}
                      data-id="2"
                      data-name={this.state.currentGrid[2]}
                    >
                      {this.state.currentGrid[2] === "Google" ||
                      this.state.currentGrid[2] === "Bing" ||
                      this.state.currentGrid[2] === "Yahoo" ? (
                        <img
                          className="thumbnail"
                          src={`${process.env.PUBLIC_URL}/images/thumbnails/${this.state.currentGrid[2]}.png`}
                        />
                      ) : (
                        <Shake
                          active={this.state.shake}
                          h={1}
                          v={1}
                          r={0}
                          dur={300}
                          int={10}
                          max={100}
                          fixed={true}
                          fixedStop={false}
                          freez={false}
                        >
                          <img
                            className="thumbnail"
                            src={`${process.env.PUBLIC_URL}/images/thumbnails/${this.state.currentGrid[2]}.png`}
                          />
                        </Shake>
                      )}
                    </td>
                  </tr>
                  <tr id="row">
                    <td
                      onClick={this.handleCheckReplace.bind(this)}
                      data-id="3"
                      data-name={this.state.currentGrid[3]}
                    >
                      {this.state.currentGrid[3] === "Google" ||
                      this.state.currentGrid[3] === "Bing" ||
                      this.state.currentGrid[3] === "Yahoo" ? (
                        <img
                          className="thumbnail"
                          src={`${process.env.PUBLIC_URL}/images/thumbnails/${this.state.currentGrid[3]}.png`}
                        />
                      ) : (
                        <Shake
                          active={this.state.shake}
                          h={1}
                          v={1}
                          r={0}
                          dur={300}
                          int={10}
                          max={100}
                          fixed={true}
                          fixedStop={false}
                          freez={false}
                        >
                          <img
                            className="thumbnail"
                            src={`${process.env.PUBLIC_URL}/images/thumbnails/${this.state.currentGrid[3]}.png`}
                          />
                        </Shake>
                      )}
                    </td>
                    <td
                      onClick={this.handleCheckReplace.bind(this)}
                      data-id="4"
                      data-name={this.state.currentGrid[4]}
                    >
                      {this.state.currentGrid[4] === "Google" ||
                      this.state.currentGrid[4] === "Bing" ||
                      this.state.currentGrid[4] === "Yahoo" ? (
                        <img
                          className="thumbnail"
                          src={`${process.env.PUBLIC_URL}/images/thumbnails/${this.state.currentGrid[4]}.png`}
                        />
                      ) : (
                        <Shake
                          active={this.state.shake}
                          h={1}
                          v={1}
                          r={0}
                          dur={300}
                          int={10}
                          max={100}
                          fixed={true}
                          fixedStop={false}
                          freez={false}
                        >
                          <img
                            className="thumbnail"
                            src={`${process.env.PUBLIC_URL}/images/thumbnails/${this.state.currentGrid[4]}.png`}
                          />
                        </Shake>
                      )}
                    </td>
                    <td
                      onClick={this.handleCheckReplace.bind(this)}
                      data-id="5"
                      data-name={this.state.currentGrid[5]}
                    >
                      {this.state.currentGrid[5] === "Google" ||
                      this.state.currentGrid[5] === "Bing" ||
                      this.state.currentGrid[5] === "Yahoo" ? (
                        <img
                          className="thumbnail"
                          src={`${process.env.PUBLIC_URL}/images/thumbnails/${this.state.currentGrid[5]}.png`}
                        />
                      ) : (
                        <Shake
                          active={this.state.shake}
                          h={1}
                          v={1}
                          r={0}
                          dur={300}
                          int={10}
                          max={100}
                          fixed={true}
                          fixedStop={false}
                          freez={false}
                        >
                          <img
                            className="thumbnail"
                            src={`${process.env.PUBLIC_URL}/images/thumbnails/${this.state.currentGrid[5]}.png`}
                          />
                        </Shake>
                      )}
                    </td>
                  </tr>
                  <tr id="row">
                    <td
                      onClick={this.handleCheckReplace.bind(this)}
                      data-id="6"
                      data-name={this.state.currentGrid[6]}
                    >
                      {this.state.currentGrid[6] === "Google" ||
                      this.state.currentGrid[6] === "Bing" ||
                      this.state.currentGrid[6] === "Yahoo" ? (
                        <img
                          className="thumbnail"
                          src={`${process.env.PUBLIC_URL}/images/thumbnails/${this.state.currentGrid[6]}.png`}
                        />
                      ) : (
                        <Shake
                          active={this.state.shake}
                          h={1}
                          v={1}
                          r={0}
                          dur={300}
                          int={10}
                          max={100}
                          fixed={true}
                          fixedStop={false}
                          freez={false}
                        >
                          <img
                            className="thumbnail"
                            src={`${process.env.PUBLIC_URL}/images/thumbnails/${this.state.currentGrid[6]}.png`}
                          />
                        </Shake>
                      )}
                    </td>
                    <td
                      onClick={this.handleCheckReplace.bind(this)}
                      data-id="7"
                      data-name={this.state.currentGrid[7]}
                    >
                      {this.state.currentGrid[7] === "Google" ||
                      this.state.currentGrid[7] === "Bing" ||
                      this.state.currentGrid[7] === "Yahoo" ? (
                        <img
                          className="thumbnail"
                          src={`${process.env.PUBLIC_URL}/images/thumbnails/${this.state.currentGrid[7]}.png`}
                        />
                      ) : (
                        <Shake
                          active={this.state.shake}
                          h={1}
                          v={1}
                          r={0}
                          dur={300}
                          int={10}
                          max={100}
                          fixed={true}
                          fixedStop={false}
                          freez={false}
                        >
                          <img
                            className="thumbnail"
                            src={`${process.env.PUBLIC_URL}/images/thumbnails/${this.state.currentGrid[7]}.png`}
                          />
                        </Shake>
                      )}
                    </td>
                    <td
                      onClick={this.handleCheckReplace.bind(this)}
                      data-id="8"
                      data-name={this.state.currentGrid[8]}
                    >
                      {this.state.currentGrid[8] === "Google" ||
                      this.state.currentGrid[8] === "Bing" ||
                      this.state.currentGrid[8] === "Yahoo" ? (
                        <img
                          className="thumbnail"
                          src={`${process.env.PUBLIC_URL}/images/thumbnails/${this.state.currentGrid[8]}.png`}
                        />
                      ) : (
                        <Shake
                          active={this.state.shake}
                          h={1}
                          v={1}
                          r={0}
                          dur={300}
                          int={10}
                          max={100}
                          fixed={true}
                          fixedStop={false}
                          freez={false}
                        >
                          <img
                            className="thumbnail"
                            src={`${process.env.PUBLIC_URL}/images/thumbnails/${this.state.currentGrid[8]}.png`}
                          />
                        </Shake>
                      )}
                    </td>
                  </tr>
                </tbody>
                <button id="save" onClick={e => this.save()}>
                  save
                </button>
              </div>
            </div>
          </div>
        )}
      </Style>
    );
  }
}

const Style = styled.section`
  #loadingDiv {
    padding-top: 15.33vh;
    text-align: center;
    background-color: white;
  }

  #row {
    height: 6vh;
    padding: 0;
    margin: 0;
  }
  #save {
    border: none;
    border-radius: 3px;
    padding: 1% 3%;
    font-size: 0.9em;
    /* font-weight: 600; */
    margin-top: 1%;
    text-align: right;
    color: #5f6368;
    line-height: 16px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
    font-weight: 500;
    margin-right: 1%;
    /* position: absolute;
    right: 2%;
    bottom: 4%; */
  }

  #save:hover {
    cursor: pointer;
    background-color: #ededed;
  }
  #replaceArrowBox {
    width: 4%;
    margin-right: 1%;
    margin-left: 1%;
  }
  #replaceArrow {
    width: 100%;
    filter: brightness(0) invert(0.8);
    margin-top: 10vh;
  }
  #settingsBox {
    width: 45%;
    margin-left: 1%;
    overflow: scroll;
    height: 26vh;
    border-radius: 3%;
  }
  #optionThumbnail {
    width: 100%;
  }
  #bodyBox {
    width: 84%;
    padding-right: 1%;
  }
  .thumbnail {
    width: 100%;
  }
  .selected {
    color: pink;
    margin: 0;
  }
  .notSelected {
    margin: 0;
  }
  #settings {
    display: flex;
    margin-top: 0.7vh;
  }
`;

export default Settings;
