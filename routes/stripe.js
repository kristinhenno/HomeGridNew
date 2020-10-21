const router = require("express").Router();


// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_51GTYX0Fvb9mko8HKzjScEsvacQuDA3Y9WgbNf3KUD9mD6ECOnnTkczbDYoRReNfa9tY6cwBKBLqjRvnbnJqQ6Q9r00xgwG9Qcw');

  const calculateOrderAmount = items => {
      var subtotal = 0;
      for (i =0; i < items.length; i++){

subtotal= subtotal + (items[i].price * items[i].quantity)
      }
    //   const subTotal = items.price * items.quantity;
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return subtotal * 100;
  };

  router.route("/").post(async(req, res) => {

    const { items } = req.body;
    console.log(items);
    
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd"
    });
    res.send({
      clientSecret: paymentIntent.client_secret
    });
  });

  module.exports = router;
