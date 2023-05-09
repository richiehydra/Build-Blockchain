//will import block
const Block = require("./block");
const { cryptoHash } = require("./sha-256");

class Blockchain {
    //blockchain creating
    constructor() {
        //intially the blockchain has only one genesis block
        this.chain = [Block.genesis()]
    }


    //adding new blocks
    addBlock({ data }) {

        //first block has to be minned
        const newblock = Block.mineBlock({ prevBlock: this.chain[this.chain.length - 1], data });
        //after mining newblock is added to blockchain 
        this.chain.push(newblock);
    }

    //validate the blockchain for security reasons
    static isValidBlockchain(chain) {
        //check the genesis block
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }

        //check other blocks
        for (let i = 1; i < chain.length; i++) {
            //destructuring
            const { timestamp, data, prevHash, Hash, difficulty, nonce } = chain[i];

            //hash mismatch data updated so block effected
            if (prevHash !== chain[i - 1].Hash) {
                return false;
            }

            //if hash mismatched
            const validatedhash = cryptoHash(timestamp, data, prevHash, difficulty, nonce);
            if (Hash !== validatedhash) {
                return false;
            }

        }

        return true;
    }

    //if provided chain is longer than current chain then replace it
    replaceChain(chain) {
        console.log("hii")
        if (chain.length <= this.chain.length) {
            console.error("The incoming chain  is not longer");
            return;
        }

        if (!Blockchain.isValidBlockchain(chain)) {
            console.error("The Chain is not Vaalid");
            return;
        }

        this.chain = chain;
    }


}
const blockchain = new Blockchain();
//add new block
blockchain.addBlock({ data: "newblock" });
blockchain.addBlock({ data: "new2block" });
//validate the block
const result = Blockchain.isValidBlockchain(blockchain.chain);
console.log(blockchain)
console.log(result);


module.exports = Blockchain




