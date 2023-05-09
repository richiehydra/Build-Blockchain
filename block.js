//require or import genesis data
const { genesis_data, MIN_RATE } = require("./genesis")

//require or import crytohash generation fnction
const { cryptoHash } = require("./sha-256");

//a Block need Timestamp,prevHASH,Hash,data
class Block {
    constructor({ timestamp, prevHash, Hash, data, nonce, difficulty }) {
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.Hash = Hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    //static function
    static genesis() {
        return new this(genesis_data);
    }

    //mining
    static mineBlock({ prevBlock, data }) {
        //prevhash is previous blocks current hash
        const prevHash = prevBlock.Hash;
        //current block diffoicult is 
       var  { difficulty } = prevBlock;

        //timestamp is current time
        let timestamp, Hash;

        let nonce = 0;

        do {
            //nonce increment untill we get hash<=target
            nonce++;
            //timestamp updated till we get valid nonce
            timestamp = Date.now();
            //difficulty gets adjusted
            difficulty=Block.adjustDifficulty({originalBlock:prevBlock,timestamp});
            //hash gets computed
            Hash = cryptoHash(timestamp, data, prevHash, nonce, difficulty)
        } while (Hash.substring(0, difficulty) !== '0'.repeat(difficulty));
        //(00)0455!==(00)(if matches valid nonce)

        return new this({ timestamp, data, prevHash, Hash, nonce, difficulty });
    }


    static adjustDifficulty({ originalBlock, timestamp }) {
        //will get the current difficulty
        const { difficulty } = originalBlock;
        
        //if current diffulty is less than 1 the return 1
        if (difficulty < 1) {
            return 1;
        }
        
        //we obtain time=currenttime-previosublocktime
        const difference  = timestamp - originalBlock.timestamp;
        
        //if difference greater than minimum or avg rate rate return diffulty-1
        if (difference > MIN_RATE) {
            return difficulty - 1;
        }
        else {
            
            return difficulty + 1;
        }
    }






}

//one block is created
const block1 = new Block({ prevHash: "0x00", timestamp: "12/02/2023", Hash: "oxbdc", data: "Hello" });

//genesis block
const gen = Block.genesis();

//mining checking






module.exports = Block