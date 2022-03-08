// payment method
var options = document.querySelectorAll("input[type=radio]");
var checkoutBtn = document.querySelector("#checkout");

for (const opt of options) {
  opt.addEventListener("change", () => {
    checkoutBtn.innerHTML = `Checkout with ${opt.value}`;
  });
}
checkoutBtn.addEventListener("click", () => {
  var selected = null;
  options.forEach((opt) => {
    opt.checked ? (selected = opt.value) : "";
  });

  switch (selected) {
    case "Paystack":
      paywithPaystack();
      break;
    case "Paypal":
      alert(
        "Please Bear With Us, We are currently working on the PayPal payment Option"
      );
      break;
    case "Flutterwave":
      paywithFlutter();
      break;
    case "Stripe":
      alert(
        "Please Bear With Us, We are currently working on the Stripe payment Option"
      );
      break;
    default:
      alert("Please Choose a Payment Option");
  }
});

// ********************** PAYMENT INTEGRATIONS *************************

// ********************** flutterWave payment integration

function paywithFlutter() {
  FlutterwaveCheckout({
    public_key: "FLWPUBK_TEST-SANDBOXDEMOKEY-X",
    tx_ref: "RX1",
    amount: 10,
    currency: "USD",
    country: "US",
    payment_options: " ",
    // specified redirect URL
    redirect_url:
      "https://callbacks.piedpiper.com/flutterwave.aspx?ismobile=34",
    meta: {
      consumer_id: 23,
      consumer_mac: "92a3-912ba-1192a",
    },
    customer: {
      email: "cornelius@gmail.com",
      phone_number: "08102909304",
      name: "Flutterwave Developers",
    },
    callback: function (data) {},
    onclose: function () {
      // close modal
    },
    customizations: {
      title: "MiddleChase Properties",
      description: "Payment for Plot 02 CLose C",
      logo: "/img/logo-white.png",
    },
  });
}

// ********************** Stripe payment Integration

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")("sk_test_26PHem9AhJZvU623DfE1x4sd");
const express = require("express");
const app = express();
app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:4242";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    customer_email: "customer@example.com",
    submit_type: "donate",
    billing_address_collection: "auto",
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log("Running on port 4242"));


// ********************** Paystack payment Integration
function paywithPaystack() {
  var handler = PaystackPop.setup({
    key: "pk_test_4ec063648949670ca74aa95b4eefd65dcdfff8e0", //put your public key here
    email: "customer@email.com", //put your customer's email here
    amount: 900000000, //amount the customer is supposed to pay
    metadata: {
      custom_fields: [
        {
          display_name: "Mobile Number",
          variable_name: "mobile_number",
          value: "+2348012345678", //customer's mobile number
        },
      ],
    },
    callback: function (response) {
      //after the transaction have been completed
      //make post call  to the server with to verify payment
      //using transaction reference as post data
      $.post(
        "verify.php",
        { reference: response.reference },
        function (status) {
          //successful transaction
          if (status == "success") {
            alert("Transaction was successful");
            window.location.href = "./index.html";
          }
          //transaction failed
          else alert(response);
        }
      );
    },
    onClose: function () {
      //when the user close the payment modal
      alert("Transaction cancelled");
    },
  });
  handler.openIframe(); //open the paystack's payment modal
}
