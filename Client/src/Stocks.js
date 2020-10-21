import React, { Component } from "react";
import styled from "styled-components";
import API from "./utils/API";

class Stocks extends React.Component {
  state = {
    userInput: "",
    symbols:[],
    search: [],
    selected: ""
  };

  
  handleChange = event => {
    this.setState({
      userInput: event.target.value
    }, () => {
        this.filterStocks();
  });
  }

  handleKeyPress = event => {
 
    if (event.key === "Enter") {
      // console.log('enter');
      if (this.state.selected === ""){
this.setState({
  selected: this.state.search[0].displaySymbol
}, ()=>
{
  API.getDailyStocks(this.state.selected).then(res => {
    // console.log(res);
  })
  // console.log(this.state.selected);
})
      } 
    }

  };

  setSelected = event => {
    var selected = event.target.getAttribute("symb")
    this.setState({
      selected: selected,
      userInput: selected
    }, ()=>
    {
      // console.log(this.state.selected);
      API.getDailyStocks(this.state.selected).then(res => {
        // console.log(res);
      })
    });
    

  };

  retrieveStocks = i => {
    if (i) {
      i.preventDefault();
    }



  API.getStocks().then(res => {

    var date = new Date();
    var newDate = date.getMonth() + "-" + date.getDate();

    if (newDate !== res.data[0].time)
    {
        API.updateStocks().then(res =>
            {
                this.setState({
                    symbols: res.data
                },() => {
                    // console.log(this.state.symbols);
                    // console.log("updating mongo");
                    API.updateStocksMongo("5f42cd52e2e4a857ad161fd1", this.state.symbols).then(results =>
                        {
                            // console.log(results)
                        })
                  })
            })
    } else {
        this.setState({
            symbols: res.data[0].stocks
        })
        // console.log(this.state.symbols)
    }
  // console.log(res);
    });
    
  };

  filterStocks = () => {

  var data = this.state.symbols;
  var input = this.state.userInput.toUpperCase();

  data = data.filter(function (item) {
    return (item.description.includes(input) || item.displaySymbol.includes(input));
}); 
this.setState({
    search: data
})
  }
 
  componentDidMount() {
   this.retrieveStocks();
  }

  render() {
      // console.log(this.state.userInput)
      // console.log(this.state.search)
    return (
      <Style>
          <div id="stockBox">
        <div id="stockSearch">
       <input onKeyPress={this.handleKeyPress} id="stockSearchInput" onChange={this.handleChange}></input>
       {this.state.search.length < 1 || this.state.userInput === "" 
       ? 
       <div></div>
        : 
        <div id="autocomplete">   
            {
this.state.search.slice(0, 7).map((item) => 
<div onClick={this.setSelected} symb={item.displaySymbol} id="autocompleteOption">
    <p onClick={this.setSelected} symb={item.displaySymbol} id="symbolTicker">{item.displaySymbol}</p>
<p onClick={this.setSelected} symb={item.displaySymbol} id="descriptionTicker">{item.description.toLowerCase()}</p>
</div>
)
            }
            </div>}
        </div>
        </div>
      </Style>
    );
  }
}

const Style = styled.section`
#symbolTicker{
margin:0;
align-self: flex-end;
font-size: 0.95em;
margin-right: 2%;
margin-left: 2%;
}

#descriptionTicker{
    margin:0;
    text-transform: capitalize;
    align-self: flex-end;
    font-size: 0.7em;
    
}

#autocompleteOption{
   margin: 0.25% 1.5% 0 2%;
   padding-bottom: 1%;

}

#autocompleteOption:hover{
    background-color: #3b3b3b;
    cursor: pointer;
}

#stockBox{
    height: 32.33vh;
    border-radius: 15px;
    border: 1px solid #black;
    background-color: black;
    color:white;
    overflow:scroll;

}

#autocompleteOption{
    display: flex;
    z-index: 100;
}

#stockSearchInput{
    width: 94%;
    margin: 2vh 1.5% 0 2%;
    border-radius:5px;
    background-color:#3b3b3b;
    border: 0px;
    height: 4vh;
    color: white;
    padding-left: 2%;
};

#stockSearchInput:focus{
 outline:0;
 decoration: none;
};`


export default Stocks;
