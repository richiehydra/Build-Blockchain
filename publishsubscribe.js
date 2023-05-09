const redis = require("redis");

//this is the channel created
const channel =
{
    TEST: 'TEST',
    BLOCKCHAIN: "BLOCKCHAIN"
};

class pubSub {
    constructor({ blockchain }) {

        //CREATING PUBLISHER AND SUBSCRIBER
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        this.blockchain = blockchain;

        //aa subscriber subscribes to a channel
        this.subscriber.subscribe(channel.BLOCKCHAIN);

        //if subscriber receives a message
        this.subscriber.on('message', (channel, message) => this.handleMessage(channel, message));
    }

    handleMessage(channel, message) {
        console.log(`Message recieved.Channel: ${channel} Message:${message}`);
        const parseMessage = JSON.parse(message);

        if (channel === channel.BLOCKCHAIN) {
            this.blockchain.replaceChain(parseMessage);
        }
    }


    //publish the message to the network
    publish({ channel, message }) {
        this.publisher.publish(channel, message);
    }

    //braod chain to the network
    broadcastchain() {
        this.publish({ channel: channel.BLOCKCHAIN, message: JSON.stringify(this.blockchain.chain) })
    }
}

// const pubsub = new pubSub();

// setTimeout(() => {
//     //publisher publishesh the message
//     pubsub.publisher.publish(channel.TEST, "Hello Welcome")
// }, 1000);


module.exports = pubSub;

