import React, { Component } from "react";
import styled from "styled-components";
import API from "./utils/API";
import Thesaurus from "./Thesaurus";
import { times } from "lodash";
import Cookies from 'js-cookie'

class Dictionary extends React.Component {
  state = {
    userInput: "dictionary",
    definition: [],
    selected: "dictionary",
    syn: [],
    hw:"", 
    wod: {
      word:"",
      def:"",
      ex: "",
      pos:""
    }
  };

  
  handleChange = event => {
    this.setState({
      userInput: event.target.value
    });
    event.preventDefault();
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.retrieveDefinition();
      this.retrieveThesaurus();
    }
  };

  retrieveDefinition = i => {
    if (i) {
      i.preventDefault();
    }

    API.dictionary(this.state.userInput).then(res => {
      this.setState({
        definition: res.data,
        hw: res.data[0].hwi.hw
      });
    
    
    });
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

  retrieveWod = i => {
    if (i) {
      i.preventDefault();
    }
if (Cookies.get("wod")){
  var cookieValue=Cookies.get("wod");
  var parsedCookie= JSON.parse(cookieValue);
  this.setState({
    wod: {
      word: parsedCookie.word,
      def: parsedCookie.def,
      pos:parsedCookie.pos,
      ex: parsedCookie.ex
    }
  });

} else {
  API.wod().then(res => {

    this.setState({
     wod: {
       word: res.data.word,
       def: res.data.results[0].definition,
       pos:res.data.results[0].partOfSpeech
     }
   });

   API.getEx(this.state.wod.word).then(res => {
     this.setState({
       wod:{
       word: this.state.wod.word,
       ex: res.data.examples[0],
       def: this.state.wod.def,
       pos: this.state.wod.pos
       }
     });
   
     var midnight = new Date();
     midnight.setHours(23,59,59,0);
     Cookies.set('wod', this.state.wod, {expires: midnight})
   });

   });
  }
  };

  componentDidMount() {
    this.retrieveDefinition();
    this.retrieveThesaurus();
    this.retrieveWod();
  }

  render() {
   
    var i;
   if(this.state.hw !== ""){
    for (i=0; i < this.state.hw.length; i++){
      if (this.state.hw[i]=== "*"){
        this.setState(
          {hw: this.state.hw.replace("*","•")
        })
        }
      }
    }
                    

    return (
      <Style>
        <div id="wordsbox" className={this.state.selected + "color"}>
          <div id={this.state.selected + "border"}>
            <div id={this.state.selected}>
              <div id="space"></div>
              <div id="nav-options">
                <div
                  className={
                    this.state.selected === "dictionary"
                      ? "dictionary"
                      : "not-selected"
                  }
                  id="dictionary-box"
                >
                  <p
                    className="option-d"
                    onClick={e =>
                      this.setState({
                        selected: "dictionary"
                      })
                    }
                  >
                    Dictionary
                  </p>
                </div>
                <div
                  id={
                    this.state.selected === "wod" ? "display-break" : "no-break"
                  }
                >
                  |
                </div>
                <div
                  id="thesaurus-box"
                  className={
                    this.state.selected === "thesaurus"
                      ? "thesaurus"
                      : "not-selected"
                  }
                >
                  <p
                    className="option"
                    onClick={e =>
                      this.setState({
                        selected: "thesaurus"
                      })
                    }
                  >
                    Thesaurus
                  </p>
                </div>
                <div
                  id={
                    this.state.selected === "dictionary"
                      ? "display-break"
                      : "no-break"
                  }
                >
                  |
                </div>
                <div
                  id="wod-box"
                  className={
                    this.state.selected === "wod" ? "wod" : "not-selected"
                  }
                >
                  <p
                    className="option"
                    onClick={e =>
                      this.setState({
                        selected: "wod"
                      })
                    }
                  >
                    Word of the Day
                  </p>
                </div>
              </div>
  
            </div>
          
               {this.state.selected === "wod" ?
                  <div id="wod-outer">
<p id="wod-word">{this.state.wod.word}</p>
<i><p id="wod-pos">{this.state.wod.pos}</p></i>
<p id="wod-def">{this.state.wod.def}</p>
<i><p id="wod-ex">{this.state.wod.ex}</p></i>
               </div> : <div id="search">
                 <input
                  id="searchbar"
                  onKeyPress={this.handleKeyPress}
                  onChange={this.handleChange}
                  placeholder={this.state.userInput}
                ></input>
              </div>} 
              
            {this.state.selected === "dictionary" ? (
              <div id="def-box">
                <div id="definition">
                  {this.state.definition.map(def => (
                    <div id="inner-def">
                      <div id="definitionLine1">
                      <h2 id="word-d">{def.meta.id.split(":")[0]}</h2>
            </div>
            <div id="definitionLine2">
            <i className="fl"><p className="fl">{def.fl}</p></i>
            <p id="hw">[{this.state.hw}]</p>
            </div>
                      
                      {def.shortdef.map((short, index) => (
                        <div className="shortdef">
                        <p id="shortdefnumber" >{index + 1}. </p>
                        <p id="shortdef">{short}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div></div>
            )}

            {this.state.selected === "thesaurus" ? (
              <div id="def-box">
                <div id="definition">
                  {this.state.syn.map(def => (
                    <div>
                      <h2 id="word-t">{def.meta.id.split(":")[0]}</h2>

                      { 
                      def.meta.syns[0].map((syn, index) => (
                        
                        <p className="syn">{(def.meta.syns[0].length === index + 1) ? syn : syn + ","}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </Style>
    );
  }
}

const Style = styled.section`
#wod-outer{
  background-color: white;
  width: 97%;
  margin-left: 1.5%;
  margin-top: -6.5vh;
  height: 25vh;
  border-radius: 11px 11px 11px 11px;
  overflow:scroll;
}

#wod-word{
  margin-top: 0;
  color: #f52351;
  font-weight: 900;
  padding-top: 1.5vh;
  margin-left: 3%;
  font-size: 1.5em;
  margin-bottom: 0;
}

#wod-pos{
  margin-top: 1vh;
  margin-bottom: 0;
  margin-left: 3%;
  font-size: 0.9em;
}

#wod-def{
  margin-left: 3%;
  margin-top: 2vh;
  font-size: 1em;
}
#wod-ex{
  margin-left: 3%;
    font-size: 0.9em;
}
#wod-ex: first-letter{
  text-transform: capitalize
}


.syn{
  display: inline-block;
  margin: 0vh 0% 0 3%;
  font-size: 0.9em;
}
.shortdef{;
  margin: 0.5vh 3% 1vh 3%;
    width: 94%;
    font-size: 0.9em;
}
#shortdef{
  display: inline-block;
  width: 95%;
  margin-top: 0.5vh;
  margin-bottom: 0.5vh;
  font-size: 0.9em;
}
#shortdefnumber{
  display: inline-block;
  vertical-align: top;
  margin-right: 1%;
  margin-top: 0.5vh;
  font-size: 0.9em;
  margin-bottom: 0.5vh;
}

#shortdef:first-letter{
  text-transform: capitalize
}
#search{
  height:6vh;
}
#definitionLine1{
}

.fl{
  display: inline-block;
  margin: 0vh 3%;
      font-size: 0.95em;
}

#word-d{

  margin: 1vh 1% 0.5vh; 
    font-size: 1.2em;
    color: #0e5ab6;
    font-weight: 900;
    margin-left: 3%;
    font-size: 1.5em;
}

#word-t{

  margin: 1vh 1% 0.5vh; 
    font-size: 1.2em;
    color: #f5a623;
    font-weight: 900;
    margin-left: 3%;
    font-size: 1.5em;
}


#word:first-letter{
  text-transform: capitalize
}

#hw{
  display: inline-block;
  margin: 0.5vh 0%;
  font-size: 0.8em;
  color: #292828;
}
  .dictionarycolor {
    background-color: #0e5ab6;
  }
  .thesauruscolor {
    background-color: #f5a623;
  }

  .wodcolor {
    background-color: #f52351;
  }
  /* #def-box {
    background-color: #0e5ab6;
  } */
  #inner-def {
    /* background-color: white; */
    /* width: 98%; */
  
    margin-bottom: 1%;
    /* margin-left: 1%; */
  }
  #definition {
    overflow: scroll;
    width: 97%;
    background-color: white;
    border-radius: 11px 11px 11px 11px;
    height: 19.2vh;
    margin: 0.1vh 1.5% 0.6vh 1.5%;

  }
  #wordsbox {
    height: 32.4vh;
    overflow: none;
    /* background-color: blue; */
  }
  #space {
    padding-top: 1%;
  }
  #wod-box {
    flex-grow: 6;
    border-radius: 0% 11px 0% 0%;
  }

  #dictionary-box {
    border-radius: 11px 0% 0% 0%;
  }
  #no-break {
    padding:  0px;
    font-size: 14px;
    color: white;
    background-color: white;
  }
  #display-break {
    padding: 0.5vh 0px;
    font-size: 14px;
    color: black;
    background-color: white;
  }
  #searchbar {
    width: 70%;
    margin: 1vh 15%;
    padding: 1%;
    border: 0;
    border-radius: 5px;
    font-size: 0.8em;
  }

  #searchbar:focus {
    outline: none;
  }
  .option {
    margin: 1vh 6px;
    font-size: 14px;
    font-size: 0.8em;
    font-weight: 600;
    
  }

  .option-d {
    margin: 1vh 6px 1vh 10px;
    font-size: 14px;
    font-size: 0.8em;
    font-weight: 600;
  }

  #nav-options {
    display: flex;
    background-color: white;
    border-radius: 14px 14px 0% 0%;
    margin-right: 1%;
    margin-left: 1%;
  }

  .dictionary {
    background-color: #0e5ab6;
    color: white;
  }

  #dictionary {
    background-color: #0e5ab6;
    border-radius: 15px 15px 0 0;
    height: 6vh;
  }

  .thesaurus {
    background-color: #f5a623;
    color: white;
  }
  #thesaurus {
    background-color: #f5a623;
    color: white;
    border-radius: 15px 15px 0 0;
    height: 6vh;  }

  .wod {
    background-color: #f52351;
    color: white;
  }
  #wod {
    background-color: #f52351;
    color: white;
    border-radius: 15px 15px 0 0;
    height: 13vh;
  }

  .not-selected {
    background-color: white;
    color: black;
  }
`;

export default Dictionary;
