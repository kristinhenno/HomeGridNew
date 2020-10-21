const router = require("express").Router();

// const wordRoutes = require("./words");
// const scraper = require("./scrape");
const yelps = require("./yelp");
const stock = require("./stocks");

// word | scrapping | yelps   - routes
// router.use("/words", wordRoutes);
// router.use("/scrape", scraper);
router.use("/yelp", yelps);
router.use("/stocks", stock);

module.exports = router;
