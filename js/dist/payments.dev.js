"use strict";

// flutter wave payment integration
function makePayment() {
  FlutterwaveCheckout({
    public_key: "FLWPUBK_TEST-SANDBOXDEMOKEY-X",
    tx_ref: "RX1",
    amount: 10,
    currency: "USD",
    country: "US",
    payment_options: " ",
    redirect_url: // specified redirect URL
    "https://callbacks.piedpiper.com/flutterwave.aspx?ismobile=34",
    meta: {
      consumer_id: 23,
      consumer_mac: "92a3-912ba-1192a"
    },
    customer: {
      email: "cornelius@gmail.com",
      phone_number: "08102909304",
      name: "Flutterwave Developers"
    },
    callback: function callback(data) {
      console.log(data);
    },
    onclose: function onclose() {// close modal
    },
    customizations: {
      title: "MiddleChase Properties",
      description: "Payment for Plot 02 CLose C",
      logo: "/img/logo-white.png"
    }
  });
} //Stripe payment Integration
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.


var stripe = require('stripe')('sk_test_26PHem9AhJZvU623DfE1x4sd');

var express = require('express');

var app = express();
app.use(express["static"]('public'));
var YOUR_DOMAIN = 'http://localhost:4242';
app.post('/create-checkout-session', function _callee(req, res) {
  var session;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(stripe.checkout.sessions.create({
            customer_email: 'customer@example.com',
            submit_type: 'donate',
            billing_address_collection: 'auto',
            shipping_address_collection: {
              allowed_countries: ['US', 'CA']
            },
            line_items: [{
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              price: '{{PRICE_ID}}',
              quantity: 1
            }],
            mode: 'payment',
            success_url: "".concat(YOUR_DOMAIN, "/success.html"),
            cancel_url: "".concat(YOUR_DOMAIN, "/cancel.html")
          }));

        case 2:
          session = _context.sent;
          res.redirect(303, session.url);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.listen(4242, function () {
  return console.log('Running on port 4242');
});