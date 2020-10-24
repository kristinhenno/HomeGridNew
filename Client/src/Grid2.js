import React from "react";
import styled from "styled-components";
import MuuriGrid from "react-muuri";
import Weather from "./Weather";
import Google from "./Google";
import Yelp from "./Yelp";
import Bing from "./Bing";
import Yahoo from "./Yahoo";
import Checklist from "./Checklist";
import Login from "./Login";
import API from "./utils/API";
import Words from "./Words";
import Settings from "./Settings";
import Stocks from "./Stocks";
import Gif from "./Gif";
import News from "./News";
import Maps from "./Maps";
import Streaming from "./Streaming";
import Calculator from "./Calculator";
import ClipLoader from "react-spinners/ClipLoader";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

import { getFromStorage, setInStorage } from "./utils/storage";

class Grid2 extends React.Component {
  state = {
    isLoggedIn: false,
    token: "",
    userId: "",
    isLoading: true,
    grid: [
      <Yelp />,
      <Maps />,
      <Words />,
      <Streaming />,
      <Google />,
      <Calculator />,
      <Weather />,
      <Gif />,
      <News />
    ],
    uerGrid: []
  };

  constructor(props) {
    super(props);
  }
  retrieveGrid = i => {
    if (i) {
      i.preventDefault();
    }
    const id = this.state.userId;

    API.retrieve(id).then(res => {
      if (res.data.grid.length > 0) {
       
        const gridArray = res.data.grid.map(item => item.widget);
      
        const Map = {
          Yelp: Yelp,
          Google: Google,
          Weather: Weather,
          Login: Login,
          Settings: Settings,
          Bing: Bing,
          Yahoo: Yahoo,
          Checklist: Checklist,
          Words: Words,
          Maps: Maps,
          Stocks: Stocks,
          News: News,
          Gif: Gif,
          Streaming: Streaming,
          Calculator: Calculator
     

        };
        const newGridArray = gridArray.map(item => {
          let Tagname = Map[item];
          return <Tagname />;
        });
        this.setState({
          grid: newGridArray,
          isLoading: false
        });
      } else {
        this.setState({
          grid: this.state.grid,
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
            userId: res.data.userId
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

  updateGridState = data => {

    let removed = this.state.grid.splice(data.fromIndex, 1)[0]; // you can remove more than one...
    this.state.grid.splice(data.toIndex, 0, removed);

    let grid = this.state.grid.map(item => {
      return { widget: item.type.name };
    });
 

    if (this.state.isLoggedIn) {
  
      const id = this.state.userId;
      API.update(id, grid).then(res => {
        if (res) {
     
        }
      });
    }
  };

  componentDidMount() {
    this.verify();

    if (isMobile) {
      this.grid = new MuuriGrid({
        node: this.gridElement,
        defaultOptions: {
          dragEnabled: false // See Muuri's documentation for other option overrides.
        }
      });
    } else {
        
    this.grid = new MuuriGrid({
      node: this.gridElement,
      defaultOptions: {
        dragEnabled: true // See Muuri's documentation for other option overrides.
      }
    });
    // set callback on move
    this.grid.getEvent("move", null, null, this.updateGridState);

    }
  }

  render() {

    return (
      <Style>
        <div >
          {/* Assign a ref to the grid container so the virtual DOM will ignore it for now (WIP). */}

          <div ref={gridElement => (this.gridElement = gridElement)}>
            {this.state.isLoading
              ? this.state.grid.map(components => (
                  <div className="item box">
                    <div id="loader" className="item-content"> <ClipLoader
                          size={50}
                          color={"#6342f5"}
                        /></div>
                  </div>
                ))
              : this.state.grid.map(components => (
                  <div className="item box">
                    <div className="item-content">{components}</div>
                  </div>
                ))}

            {/* {this.state.isLoggedIn &&
            this.state.userGrid.length != undefined
              ? this.state.userGrid.map(components => (
                  <div className="item box">
                    <div className="item-content">
                      {components}
                    </div>
                  </div>
                ))
              : this.state.grid.map(components => (
                  <div className="item box">
                    <div className="item-content">
                      {components}
                    </div>
                  </div>
                ))} */}
          </div>
        </div>


      </Style>
    );
  }
}

const Style = styled.section`

#loader{
  text-align: center;
  margin-top: 10vh;
}

  .item {
    /* color: white; */

    /* height: 200px;
    margin: 20px; */
    position: absolute; /* Required by Muuri */
    /* width: 200px; */
    width: 33.3%;
    height: 33.3vh;
    margin: auto;
  }

  .item-content {
    margin-top: 0.6%;
    margin-left: 0.25%;
    margin-right: 0.25%;
  }
  .google {
  }
  .muuri-item-dragging {
    z-index: 3; /* Required by Muuri */
  }

  .muuri-item-releasing {
    z-index: 2; /* Required by Muuri */
  }

  .muuri-item-hidden {
    z-index: 0; /* Required by Muuri */
  }

  .box1 {
    background-color: lightpink; /* Go */
  }

  .box2 {
    background-color: lightblue; /* Gators */
  }

  @media only screen and (min-width: 0px) and (max-width: 600px) { 
    .item{
      width: 100%;
      height: 33.3vh;
    }


  }
`;

export default Grid2;
