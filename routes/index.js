
const path = require("path");
const router = require("express").Router();

const itemsRouter = require("./item");
const usersRouter = require("./users");
const yelpRoute = require("./api/yelp");
const stockRoute = require("./api/stocks");
const stripeRoute = require("./stripe");
const scrapeRoute = require("./api/scrape");


router.use("/items", itemsRouter);
router.use("/users", usersRouter);
router.use("/yelp", yelpRoute);
router.use("/stocks", stockRoute);
router.use("/stripe", stripeRoute);
router.use("/scrape", scrapeRoute);


router.use(function(req, res) {
    // res.sendFile(path.join(__dirname, "../Client/build/index.html"));
    res.sendFile(path.join(__dirname, '../Client','public', 'index.html'));
  });
  

// If no API routes are hit, send the React app
// router.get(function(req, res) {
//   res.sendFile(path.join(__dirname, "../Client/build/index.html"));
// });

// router.get('*', (req, res) => res.sendFile('../Client/build/index.html'));

// router.get('*', function (req, res) {
//   const index = path.join(__dirname, 'client', 'build', 'index.html');
//   res.sendFile(index);
// });

module.exports = router;