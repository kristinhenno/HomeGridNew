const express = require("express");
// const routes = require("./routes");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

const path = require("path");
app.use(routes);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


require("dotenv").config();

const PORT = process.env.PORT || 8080;

// Configure body parser for AJAX requests
// app.use(express.urlencoded({limit: '80mb'}));
app.use(express.json({limit: '80mb'}));
// Serve up static assets
// app.use(express.static("client/public"));



// Add routes, both API and view
app.use(cors());



const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log(
    "MongoDB database connection established successfully"
  );
});


// app.get('/*', function(req, res){
//   res.sendFile(__dirname, '/client/build/index.html');
// });

// app.use(express.static("client/build"));

app.use(express.static(path.join(__dirname, "client", 'public')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, "client", 'public', 'index.html'));
});

// Start the API server
app.listen(PORT, function() {
  console.log(
    `🌎  ==> API Server now listening on PORT ${PORT}!`
  );
  
});
