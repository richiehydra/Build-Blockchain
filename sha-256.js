//we need sha256 algorithm to generate hash 

const crypto = require("crypto");


const cryptoHash = (...inputs) => {
    //intanstiate sha256 
    const Hash = crypto.createHash('sha256');
    //input for sha256 is updated
    Hash.update(inputs.sort().join(''));
    //return in hexadecimal format
    return Hash.digest('hex');
}

const result = cryptoHash("Hello", "world");

module.exports = { cryptoHash };