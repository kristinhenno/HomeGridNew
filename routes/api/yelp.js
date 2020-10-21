"use strict";


const yelp = require("yelp-fusion");
const router = require("express").Router();

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
router.route("/").get(function(req, res) {
  var yelpsArray = [];
  const apiKey =
    "ahyUI4obzCmR7W02C0muU9RsaKQcocrmBPTKJyAVFfCw3deLym6o5fN7MENwPee5MFDk4JDxoShDyqHBuBqoBj4VplqIzusnGm5nWgsLgrBNnMYRDjF1cj6aUxs_X3Yx";

  const searchRequest = {
    term: "coffee",
    location: "santa barbara, ca"
  };

  const client = yelp.client(apiKey);

  client
    .search(searchRequest)
    .then(response => {
      for (
        var i = 0;
        i < response.jsonBody.businesses.length;
        i++
      ) {
        let result = response.jsonBody.businesses[i];
        yelpsArray.push({
          id: result.id,
          name: result.name,
          url: result.url,
          imgurl: result.image_url,
          reviewcount: result.review_count,
          rating: result.rating
        });
      }
      console.log(yelpsArray);
      res.send(yelpsArray);
    })
    .catch(e => {
      console.log(e);
    });
  return yelpsArray;
});

router.route("/:user/:city").get(function(req, res) {
  var yelpsArray = [];
  const apiKey =
    "ahyUI4obzCmR7W02C0muU9RsaKQcocrmBPTKJyAVFfCw3deLym6o5fN7MENwPee5MFDk4JDxoShDyqHBuBqoBj4VplqIzusnGm5nWgsLgrBNnMYRDjF1cj6aUxs_X3Yx";

  console.log("params", req.params);

  var searchQ = req.params.user;
  var searchCity = req.params.city;

  // Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
  // from https://www.yelp.com/developers/v3/manage_app

  const searchRequest = {
    term: searchQ,
    location: searchCity
  };

  const client = yelp.client(apiKey);

  client
    .search(searchRequest)
    .then(response => {
      for (
        var i = 0;
        i < response.jsonBody.businesses.length;
        i++
      ) {
        let result = response.jsonBody.businesses[i];
        yelpsArray.push({
          id: result.id,
          name: result.name,
          url: result.url,
          imgurl: result.image_url,
          reviewcount: result.review_count,
          rating: result.rating,
          categories: result.categories
        });
      }
      console.log(yelpsArray);
      res.send(yelpsArray);
    })
    .catch(e => {
      console.log(e);
    });
  return yelpsArray;
});

module.exports = router;
