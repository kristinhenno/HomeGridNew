import React from "react";
import styled from "styled-components";
import API from "./utils/API";
import googlePic from "./images/thumbnails/Google.png";
import bingPic from "./images/thumbnails/Bing.png";
import yahooPic from "./images/thumbnails/Yahoo.png";
import { getFromStorage } from "./utils/storage";

class Preferences extends React.Component {
  state = {
    userId: "",
    token: "",
    selectedOption: "",
    currentGrid: [],
    isLoading: false
  };

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
    const selection = changeEvent.target.value;
    console.log(selection);
    const newGrid = this.state.currentGrid.slice(); //copy the array
    console.log(newGrid);

    var i;
    for (i = 0; i < newGrid.length; i++) {
      if (
        newGrid[i] === "Google" ||
        newGrid[i] === "Yahoo" ||
        newGrid[i] === "Bing"
      ) {
        // console.log(newGrid[i]);
        newGrid.splice(i, 1, selection);
        // console.log(newGrid);
        this.setState({ currentGrid: newGrid }, ()=> console.log(this.state.currentGrid)); //set the new state
        // return newGrid;
      }
    }

    // // newGrid[i] = this.state.selectedOption; //execute the manipulations
    // this.setState({ currentGrid: newGrid }); //set the new state
    // console.log(this.state.currentGrid);
  };

  retrieveGrid = i => {
    if (i) {
      i.preventDefault();
    }
    const id = this.state.userId;
    API.retrieve(id).then(res => {
      if (res.data.grid.length > 0) {
        // console.log(res.data.grid);
        const gridArray = res.data.grid.map(
          item => item.widget
        );
        // console.log(gridArray);
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
          // console.log("token checked");
          // console.log(res);
          this.setState({
            token: token,
            userId: res.data.userId,
            isLoading: true
          });
          // console.log("loggedIn");
          this.retrieveGrid();
        } else {
          this.setState({
            isLoading: true
          });
        }
      });
    } else {
      // console.log("no token");
      this.setState({
        isLoading: false,
        isLoggedIn: false
      });
    }
  };

  //   test = test => {
  //     console.log(this.state.currentGrid);
  //   };

  save = i => {
    const id = this.state.userId;
    // console.log(this.state.currentGrid);

    // this.setState({ selected: "", shake: false });

    let grid = this.state.currentGrid.map(item => {
      return { widget: item };
    });
    console.log(grid);

    API.update(id, grid).then(res => {
      if (res) {
        // console.log("array added");
        this.refreshPage();
      }
    });
  };
  refreshPage() {
    window.location.reload(false);
    this.setState({
      needRefresh: false
    });
  }

  componentDidMount() {
    this.verify();
  }

  render() {
    // console.log(this.state.selectedOption);
    return (
      <Style>
        <div id="preferencesBox">
          <p id="text">Default Search Engine</p>
          <div>
            <input
              type="radio"
              id="Google"
              name="search"
              value="Google"
              onChange={this.handleOptionChange}
              checked={
                this.state.selectedOption === "Google"
              }
            />
            <label for="Google">
              <img className="thumbnail" src={googlePic} />
            </label>
            <input
              type="radio"
              id="Yahoo"
              name="search"
              value="Yahoo"
              onChange={this.handleOptionChange}
              checked={
                this.state.selectedOption === "Yahoo"
              }
            />

            <label for="Yahoo">
              <img className="thumbnail" src={yahooPic} />
            </label>
            <input
              onChange={this.handleOptionChange}
              checked={this.state.selectedOption === "Bing"}
              type="radio"
              name="search"
              id="Bing"
              value="Bing"
            />
            <label for="Bing">
              <img className="thumbnail" src={bingPic} />
            </label>
          </div>
          <button id="save" onClick={e => this.save()}>
            save
          </button>
        </div>
      </Style>
    );
  }
}

const Style = styled.section`
  #Google {
    position: absolute;
    margin-left: 2%;
  }
  #Bing {
    position: absolute;
    margin-left: 2%;
  }
  #Yahoo {
    position: absolute;
    margin-left: 2%;
  }
  .thumbnail {
    width: 31%;
    margin-right: 1%;
    margin-left: 1%;
  }
  #preferencesBox {
    width: 100%;
    margin-top: 1.2vh;
    text-align: left;
  }
  #text {
    text-align: left;
    width: 100%;
    margin-left: 2%;
    margin-top: 3%;
  }
  #save {
    border: none;
    border-radius: 2px;
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
    margin-right: 2.1%;
    float: right;
  }
`;

export default Preferences;
