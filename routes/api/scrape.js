var cheerio = require("cheerio");
var request = require("request");

const router = require("express").Router();

router.route("/").get(function(req, res) {

    request("https://www.nytimes.com/section/world", function(error, response, html) {
        var $ = cheerio.load(html);
        var results = [];

        $(".css-1l4spti").each(function(i, element) {

            var title = $(element).find("h2").text();

            var link = $(element).find("a").attr("href");

            results.push({
                title: title,
                link: "https://www.nytimes.com" + link
            });
        });
        res.send(results);
        return results;

    });

});

router.route("/npr").get(function(req, res) {

    request("https://www.npr.org/sections/news/", function(error, response, html) {
        var $ = cheerio.load(html);
        var results = [];
        $(".title").each(function(i, element) {

            var title = $(element).find("a").text();

            var link = $(element).find("a").attr("href");

            results.push({
                title: title,
                link: link
            });

        });
        res.send(results);
        //console.log(results);
        return results;
    });

});

router.route("/fox").get(function(req, res){
	request("http://www.foxnews.com/", function(error, response, html) {

  var $ = cheerio.load(html);

  var results = [];

  $("article").each(function(i, element) {

    var title = $(element).find("div.info").find("h2.title").children().text();

    var link = $(element).find("div.info").find("h2.title").children().attr("href");

    results.push({
      title: title,
      link: link
    });
  });
 res.send(results);
        //console.log(results);
        return results;
      });

});

module.exports = router;
