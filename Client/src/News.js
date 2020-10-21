import React, { Component } from 'react';
import API from "./utils/API";
import styled from "styled-components";

class News extends Component {
   state = {
    articles:[],
    news: "npr"
  }

      NPR = res => {
        this.setState({ articles: res.data })}
        scrapeNpr = () => {
    API.scrapeNpr()
      .then(res =>{this.NPR(res);
        this.setState({
            news:"npr"
        })})

      .catch(err => console.log(err));
  }

        FOX = res => {
        this.setState({ articles: res.data })}
    scrapeFOX = () => {
    API.scrapeFox()
      .then(res =>{this.FOX(res);
    this.setState({
        news:"fox"
    })})

      .catch(err => console.log(err));
  }

   componentDidMount() {
    this.scrapeNpr();
   
  }
   

  NY = res => {
        this.setState({ articles: res.data })}
    scrapeNews = () => {
    API.scrape()
      .then(res =>{this.NY(res);
        this.setState({
            news:"ny"
        })})

      .catch(err => console.log(err));
  }


  render() {
 
    return (
        <Style>
      <div id="newsbox">
      <div className="nav">
       <img alt="cnn" onClick={() => this.scrapeNpr()}  id={this.state.news === "npr" ? "cnnlogoclicked" : "cnnlogo" } height="24px" src="https://intaadvising.gatech.edu/wp-content/uploads/2020/06/npr.svg_.png"/>
      <img alt="Ny" onClick={() => this.scrapeNews()} id={this.state.news === "ny" ? "nylogoclicked" : "nylogo" } height="25px" src="https://www.insidehighered.com/sites/default/server_files/media/nyt-t-logo.png"/>
      <img  alt="fox" onClick={() => this.scrapeFOX()} id={this.state.news === "fox" ? "foxlogoclicked" : "foxlogo" } height="27px" src="https://lh3.googleusercontent.com/l8woCU1YmtyKlkNOh2TNvQJj8P78Rm56JljLDUj-83YzD3OU6UCvqM-vzqpBOkOrW2Q=w300"/>
      </div>
      <div id="scrapedarticles">
  
     {this.state.articles.map(article => (
                      
                        <p className="articles"><a className="articletext" href={article.link} target="_blank"> {article.title}</a></p> 
                     
                ))}
</div>
      </div>
      </Style>
    );
  }

}

const Style = styled.section`
#newsbox {
    height: 32.33vh;
    border-radius: 15px;
    border: 1px solid #black;
    background-color: black;
    color:white;
    overflow:scroll;
    border: black 1px solid;
    
}

.articles {
    padding-left: 2%;
    color: black;
    padding-bottom: 1%;
    color: black;
    font-size: 0.8em;
    margin-top: 1%;
    margin-bottom: 1%;
    text-align: left;
    border-bottom: 1px solid #ddd;
}


.articletext {
    color: black;
    text-decoration: none;
    color: black;

}
.articletext:hover{
	color:red;
}
.articles:visited {
    padding-left: 1%;
    text-decoration: none;
    color: black;
}


#nylogo {
    margin: 0.6% 2%;
    -webkit-filter: invert(50%); /* Safari/Chrome */
    filter: invert(50%);
}


#nylogoclicked {
    margin: 0.5% 2%;
    -webkit-filter: invert(100%); /* Safari/Chrome */
    filter: invert(100%);

}

#nylogo:hover {
    cursor: pointer;
}

#cnnlogo {
    margin: 1% 1% 1% 3%;
    filter: grayscale(100%);
}

#cnnlogoclicked {
    margin: 1% 1% 1% 3%;
}


#cnnlogo:hover {
    cursor: pointer;
}

#foxlogo {
    margin: 0.55% 1%;
    filter: grayscale(100%);
}

#foxlogoclicked {
    margin: 0.55% 1%;

}


#foxlogo:hover {
    cursor: pointer;
}

#scrapedarticles {
    width: 97%;
    margin-left: 1.3%;
    background-color: white;
    margin-top: 0.2%;
    padding-top: 0.5%;
    height: 25.3vh;
    overflow: scroll;
    border-radius: 10px;
}

.nav {
    // background-color: #aeafae;
    // border-bottom: 2px solid #25348c;
    display:flex;
    background-color: black;
    padding: 0.3%;

}

`;

export default News;