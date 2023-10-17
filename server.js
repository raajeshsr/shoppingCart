const stripe = require("stripe")(
  "sk_test_51NubaCSFwRrROXq1i08WJIaa0tf012F9NwcnvoFrhGRO30cEeTuTROeuFoqxoMTAnEQvbDrZUt9H7kmo1k4qLLZz00GCmfzQVX"
);

const express = require("express");
const path = require("path");

var bodyParser = require("body-parser");

var cors = require("cors");

const app = express();

app.use(express.static(path.join(__dirname, "build")));

// app.use(express.static("public"));

app.use(bodyParser.json());

// app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

const YOUR_DOMAIN = "http://localhost:4242";

app.post("/test", (req, res) => {
  console.log("received");
  console.log(req.body);
});

// app.get()

app.post("/create-checkout-session", async (req, res) => {
  console.log(req.body);

  let productsInCart = req.body;
  let stripeItems = [];

  for (const productInCart of productsInCart) {
    const product = await stripe.products.create({
      name: productInCart.title,
    });

    //create price in stripe for the respective product

    const price = await stripe.prices.create({
      unit_amount: productInCart.price * 100,
      currency: "inr",
      product: product.id,
    });
    console.log("price obj");
    console.log(price);

    let temp = {
      price: price.id,
      quantity: productInCart.quantity,
    };

    stripeItems.push(temp);
  }
  console.log(stripeItems);

  // productsInCart.forEach(async (productInCart) => {
  //   //create product in stripe

  // });

  const session = await stripe.checkout.sessions.create({
    line_items: [
      ...stripeItems,
      // {
      // price_data
      // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
      // { price: "price_1NubiGSFwRrROXq1QBJx7lzP", quantity: 1 },
      // },
    ],
    mode: "payment",
    success_url: "https://shoppingcart-0tc6.onrender.com",
    cancel_url: "https://shoppingcart-0tc6.onrender.com",
  });
  console.log(session);

  res.json({ url: session.url });
});

app.listen(4242, () => console.log("Running on port 4242"));
