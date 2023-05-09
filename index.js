const express = require("express");
const Blockchain = require("./blockchain")
const request=require("request");
const pubSub = require("./publishsubscribe")

const app = express();

const blockchain = new Blockchain();

const pubsub = new pubSub({ blockchain });

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

//broadvcast blockchain to the network
setTimeout(() => {
    pubsub.broadcastchain()
}, 1000);


app.use(express.json())


app.get("/api/blocks", (req, res) => {
    res.json(blockchain.chain)
})

app.post("/api/post", (req, res) => {
    const { data } = req.body;
    blockchain.addBlock({ data });
    pubsub.broadcastchain()
    res.redirect("/api/blocks")
})


const synChains = () => {
    request(
      { url: `${ROOT_NODE_ADDRESS}/api/blocks` },
      (error, reposnse, body) => {
        if (!error && reposnse.statusCode === 200) {
          const rootChain = JSON.parse(body);
          console.log("Replace chain on sync with", rootChain);
          blockchain.replaceChain(rootChain);
        }
      }
    );
  };

let PEER_PORT;
if (process.env.GENERATE_PEER_PORT === 'true') {
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
    console.log(`Listening on port number ${PORT}`);
    synChains()
})