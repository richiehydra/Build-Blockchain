//intial difficulty
const INTIAL_DIFFICULTY=2;
//mining rate of time in case of btc it is 10min
//but here in case our hydra chain blockchain its 1s===1000ms
const MIN_RATE=1000;
//genesis block data
const genesis_data =
{
    timestamp: Date.now(),
    prevHash: "0x00",
    Hash: "0xgf",
    difficulty:INTIAL_DIFFICULTY,
    nonce:1,
    data: []
}

module.exports = { genesis_data ,MIN_RATE}