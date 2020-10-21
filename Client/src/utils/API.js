import axios from "axios";

export default {
  getYelpSearch: function(userinputTerm, userinputCity) {
    return axios.get("/yelp/" + userinputTerm + "/" + userinputCity);
  },
  getStocks: function() {
    return axios.get("/stocks/");
  },

  createUser: function(user) {
    return axios.post("http://localhost:8080/users/add", user);
  },
  scrapeFox: function(){
  	return axios.get("/scrape/fox");
  },
  scrape: function() {
    return axios.get("/scrape/");
  },
  scrapeNpr: function(){
  	return axios.get("/scrape/npr");
  },

  updateStocksMongo: function(id, stocks) {
    return axios.post("http://localhost:8080/stocks/updatestocks/" + id, stocks);
  },

  login: function(user) {
    return axios.post("http://localhost:8080/users/login", user);
  },
  retrieve: function(id) {
    return axios.get("http://localhost:8080/users/" + id);
  },
  update: function(id, grid) {
    return axios.post("http://localhost:8080/users/update/" + id, grid);
  },
  updatelist: function(id, grid) {
    return axios.post("http://localhost:8080/users/updatelist/" + id, grid);
  },
  logout: function(token) {
    return axios.get("http://localhost:8080/users/logout?token=" + token);
  },
  verify: function(token) {
    return axios.get("http://localhost:8080/users/verify?token=" + token);
  },

  getCurrentWeather: function(userInput) {
    return axios.get(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        userInput +
        "&units=imperial&APPID=e0bcadb175fe4fad12041d2069d72cca"
    );
  },

  getWeeklyWeather: function(userInput) {
    return axios.get(
      "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +
        userInput +
        "&cnt=7&units=imperial&appid=e0bcadb175fe4fad12041d2069d72cca"
    );
  },
  getGifs: function(userinput){
    return axios.get("https://api.giphy.com/v1/gifs/search?q=" + userinput + "&api_key=8ea55db6d2b0486693bb304e07aaa123&limit=100")
  },
  getDailyWeather: function(userInput) {
    return axios.get(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        userInput +
        "&units=imperial&appid=e0bcadb175fe4fad12041d2069d72cca"
    );
  },
  dictionary: function(userInput) {
    return axios.get(
      "https://dictionaryapi.com/api/v3/references/collegiate/json/" +
        userInput +
        "?key=03b27f05-4a38-4a74-a03d-8a5fb5336eb9"
    );
  },
  thesaurus: function(userInput) {
    return axios.get(
      "https://dictionaryapi.com/api/v3/references/thesaurus/json/" +
        userInput +
        "?key=cb770d03-269a-4433-b83a-9235dd52360d"
    );
  },


wod: function(){
return  axios.get(
  'https://wordsapiv1.p.rapidapi.com/words/', 
  {
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": "436c924777msh5aa134b4501dad0p1ed1bajsne83bee16227c",
        "useQueryString": true
      }, 
      params:{
        "random":"true",
        "soundsMin":"8",
        "hasDetails" : "examples"


        }
    });
  
  },

  updateStocks: function(){
    return  axios.get(
      'https://finnhub.io/api/v1/forex/symbol?exchange=US&token=bt1ciff48v6qjjkjlc50'
        );
      
      },
      
  getEx: function(word){
    return  axios.get(
      'https://wordsapiv1.p.rapidapi.com/words/' + word + '/examples', 
      {
          headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": "436c924777msh5aa134b4501dad0p1ed1bajsne83bee16227c",
            "useQueryString": true
          }, 
          params:{
            "random":"true",
            "soundsMin":"8",
            "hasDetails": "partOfSpeech"

            }
        });
      
      },

      getDailyStocks: function (symbol){
        return axios.get('https://alpha-vantage.p.rapidapi.com/query',
{
        headers: {
          "content-type":"application/octet-stream",
          "x-rapidapi-host":"alpha-vantage.p.rapidapi.com",
          "x-rapidapi-key":"436c924777msh5aa134b4501dad0p1ed1bajsne83bee16227c",
          "useQueryString":true
          },
          params: {
          "outputsize":"compact",
          "datatype":"json",
          "function":"TIME_SERIES_DAILY",
          "symbol": symbol
          }
        }
          
        )
      }
};
