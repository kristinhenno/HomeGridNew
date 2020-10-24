const express = require("express");
// const routes = require("./routes");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
// const bodyParser = require("body-parser");
// const routes = require("./routes");
// const path = require("path");
// app.use(routes);

// app.use(bodyParser.urlencoded({ extended: false }));


require("dotenv").config();

const PORT = process.env.PORT || 8080;


// Configure body parser for AJAX requests
app.use(express.urlencoded({limit: '80mb'}));
app.use(express.json({limit: '80mb'}));
// Serve up static assets
// app.use(express.static("client/public"));
// app.use(express.static("Client/build"));

// Add routes, both API and view
app.use(cors());


const root = require('path').join(__dirname, '/Client', 'build');


app.use(express.static(root));
// app.get("*", (req, res) => {
//     res.sendFile('index.html', { root });
// })



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


const itemsRouter = require("./routes/item");
const usersRouter = require("./routes/users");
const yelpRoute = require("./routes/api/yelp");
const stockRoute = require("./routes/api/stocks");
const stripeRoute = require("./routes/stripe");
const scrapeRoute = require("./routes/api/scrape");


app.use("/items", itemsRouter);
app.use("/users", usersRouter);
app.use("/yelp", yelpRoute);
app.use("/stocks", stockRoute);
app.use("/stripe", stripeRoute);
app.use("/scrape", scrapeRoute);





// I think this served / CANNOT GET


// app.get('/*', function(req, res){
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

// app.use(function(req, res) {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });



// Start the API server
app.listen(PORT, function() {
  console.log(
    `🌎  ==> API Server now listening on PORT ${PORT}!`
  );
  
});
