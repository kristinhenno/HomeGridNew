// const router = require("express").Router();
// let Stocks = require("../../models/stocks.model");

//     router.route("/").get((req, res) => {
//         Stocks.find()
//           .then(stocks => res.json(stocks))
//           .catch(err => res.status(400).json("Error: " + err));
//       });


//       router.route("/updatestocks/:id").post((req, res) => {
//         Stocks.findById(req.params.id, function(err, stock) {
//             if (!stock) res.status(404).send("stock is not found");
//             var date = new Date();
//             var newDate = date.getMonth() + "-" + date.getDate();

// console.log(req.body);

//            stock.stocks = req.body;
//            stock.time =  newDate;
      
//           stock
//             .save()
//             .then(stock => {
//               res.send("stock list updated!");
//               console.log("updatedddd");
//             })
//             .catch(err => {
//               res.status(400).send(err);
            
//             });
//         });
//       });
      
//       module.exports = router;
