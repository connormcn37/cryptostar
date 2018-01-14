var Web3 = require('web3');

var web3 = new Web3.providers.WebsocketProvider('ws://localhost:8545');
web3.eth.getBlock(48, function(error, result) {
  if (!error) console.log(result);
  else console.error(error);
});
