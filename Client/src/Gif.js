import React, { Component } from 'react';
import API from "./utils/API";
import styled from "styled-components";
import {CopyToClipboard} from 'react-copy-to-clipboard';
// import Input from "./components/Form";
// import Button from "./components/Button";


class Gif extends Component {
   state = {
   srcs: [],
   userinput: "gif",
   srcClicked: "",
   opacity: 0
  }

  handleKeyPress = event => {
    if (event.key === "Enter") {
        this.GIF();
    }
  };

  handleClick= event => {
    event.preventDefault();
  this.setState({opacity: 1}, () => {
      if(!this.timeout)
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => this.setState({opacity:0}),1000);
 });
}


handleChange = (event) => {
  this.setState({userinput: event.target.value});
}

  componentDidMount(){
    this.GIF();
  }

     GIF = (i) => {
         if (i){
      i.preventDefault();
    }
  
  
    API.getGifs(this.state.userinput)
      .then(res =>
        this.setState({ srcs: res.data.data})
      
      )
      .catch(err => console.log(err));
  };









  render() {
    return (
    <Style>
      <div id="gifBox">
       <div className="t-nav2">
    <p style={{opacity: this.state.opacity, transition: "opacity 0.2s"}} id="copied">copied!</p>
      <form>
      <input className="gifsearch"
              placeholder={this.state.userinput} onKeyPress={this.handleKeyPress} onChange={this.handleChange}
              />
                <button className="searchbutton1"
                onClick={this.GIF}
              >

              </button>
              </form>
      </div>
<div id="gifResults">
                {this.state.srcs.map((src) => (
                  <div  onClick={this.handleClick} className ="allGifs">
                                                 

<CopyToClipboard className="gifs" text={src.url}>
<img className="gifs" height="80px" src={src.images.downsized.url}/>  
</CopyToClipboard> 
</div>
      ))}

</div>
      </div>
      </Style>
    );

  }

}

const Style = styled.section`

#copied{
    margin:0;
    padding: 0;
    color: white;
  position:absolute;
  top: 1vh;
  left: 4%;
}


#gifBox{
    height: 32.33vh;
    border-radius: 15px;
    border: 1px solid #black;
    background-color: #b784cf;
    color:white;
    overflow:scroll;
  

}

.allGifs:hover{
    cursor:pointer
}

.gifs{
	text-align: left;

    padding: 1%;
}

.gifs:hover{
    cursor: pointer;
}

.allGifs{
	    margin-left: 2%;
        margin-right: 2%;
        background-color: white;
        border-radius: 5px;
 
    
}

#gifResults{
    background-color: white;
    width: 96%;
    margin-left: 2%;
    border-radius: 5px;
    height: 26vh;
    overflow: scroll;
    display:flex;
    flex-wrap: wrap;

}

.t-nav2{
    background-color: #b784cf;
    padding-top: 2%;
    color: black;
    display: flex;
    padding-top: 1vh;
        

}

.title3{
    font-family: 'Anton',sans-serif;
    font-size: 0.9em;
    margin: 0%;
    color: white;
    margin-left: 3%;

}

.gifsearch{
    height: 20px;
    width: 19vw;
    margin-left: 2.5%;
    color: black;
    margin-top: -2.5%;
    border-radius: 5px;
    border: 0;
    margin-bottom: 2%;
    margin-left: 6.5vw;
}

.searchbutton1{
    height: 21px;
    border: none;
    margin-top: -6%;
    margin-right: 2.5%;
    display:none;
}

.gifsearch:focus{
outline: none
}
`


export default Gif;