const express = require("express");
// const routes = require("./routes");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");



require("dotenv").config();

const PORT = process.env.PORT || 8080;

// Configure body parser for AJAX requests
// app.use(express.urlencoded({limit: '80mb'}));
app.use(express.json({limit: '80mb'}));
// Serve up static assets
// app.use(express.static("client/public"));
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(cors());


// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// });

// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log(
//     "MongoDB database connection established successfully"
//   );
// });

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

// Start the API server
app.listen(PORT, function() {
  console.log(
    `🌎  ==> API Server now listening on PORT ${PORT}!`
  );
  
});
