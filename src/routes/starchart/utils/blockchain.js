import Web3 from 'web3';

if (typeof web3 != 'undefined') {
  console.log('Using web3 detected from external source like Metamask');
  this.web3 = new Web3(web3.currentProvider);
} else {
  console.log(
    "No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask",
  );
  this.web3 = new Web3(
    new Web3.providers.HttpProvider('http://localhost:8545'),
  );
}

const MyContract = web3.eth.contract([
  {
    constant: false,
    inputs: [],
    name: 'generateNumberWinner',
    outputs: [],
    payable: true,
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'myid', type: 'bytes32' },
      { name: 'result', type: 'string' },
    ],
    name: '__callback',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'numberOfBets',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_queryId', type: 'bytes32' },
      { name: '_result', type: 'string' },
      { name: '_proof', type: 'bytes' },
    ],
    name: '__callback',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'player', type: 'address' }],
    name: 'checkPlayerExists',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'kill',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'resetData',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'bets', type: 'uint256' }],
    name: 'updateMaxBets',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'number', type: 'uint256' }],
    name: 'bet',
    outputs: [],
    payable: true,
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'amountWei', type: 'uint256' }],
    name: 'updateMinimumBet',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'distributePrizes',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'numberWinner',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'minimumBet',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'maxAmountOfBets',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'uint256' }],
    name: 'players',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalBet',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    type: 'function',
  },
  {
    inputs: [{ name: '_maxAmountOfBets', type: 'uint256' }],
    payable: false,
    type: 'constructor',
  },
  { payable: true, type: 'fallback' },
]);
const ContractInstance = MyContract.at(
  '0x71e26d3581058dfc17517d1308686fd81ef4cf01',
);
console.log('1.blockchain Contract : ', ContractInstance);
