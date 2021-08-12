const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();

const app = express();
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const { parse } = require("node-html-parser");
const { ObjectId } = require("mongodb");
const productRoute = require("./routes/product.routes");
const service = require("./test4");
const productService = require("./services/product.service");

async function main() {
  const uri =
    "mongodb+srv://myMongoAtlas:7MqKQpAg3sOB7Qck@cluster0.l0rzh.mongodb.net/WebScrapper?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const AMAZON_URL =
    "https://www.amazon.in/s?i=shoes&bbn=17095063031&rh=n%3A1571283031%2Cn%3A1983338031%2Cn%3A17095063031%2Cn%3A1983352031%2Cp_n_pct-off-with-tax%3A2665399031%2Cp_85%3A10440599031&dc&hidden-keywords=-saree&pf_rd_i=1983338031&pf_rd_i=1983338031&pf_rd_i=1983338031&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_p=50f00ae2-67be-49c8-9c18-94cd580625ad&pf_rd_p=a14c32e3-5242-410a-bfdf-fb00f55d9a5f&pf_rd_p=e44305bd-b587-4e8a-b68d-ab07eefc3931&pf_rd_r=G8Z8K4CCVNY5YR2HSKC7&pf_rd_r=JTP4TW0HD35HDX5N0085&pf_rd_r=MTD6JT92T5NYQ8MEFP7A&pf_rd_s=merchandised-search-5&pf_rd_s=merchandised-search-6&pf_rd_s=merchandised-search-7&qid=1625515481&rnid=17095063031&ref=sr_nr_n_1";

  try {
    await client.connect();
    app.use(cors());
    app.use(express.json());
    app.use((req, res, next) => {
      console.log(`${req.url} ${req.method} at ${new Date()}`);
      next();
    });
    router.get("/", async (req, res) => {
      res.send("Hello");
    });

    app.use("/product", productRoute);
    await listProducts(client);
    // Starting Server
    app.listen(4000, () => console.log(`Server listening at port 4000...`));
  } catch (e) {
    console.log(e);
  }
}

async function listProducts(client) {
  (async () => {
    const data = await service.then(async (x) => {
      productsList = await client
        .db("WebScrapping")
        .collection("AMAZON")
        .insertMany(x);
    });
    client.close();
  })();
}

main().catch(console.error);
