import Web3 from 'web3';

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}
const abi = [
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    type: 'function',
  },
  { payable: false, type: 'fallback' },
];
const address = '0x98325c336c9f9261d6Ff15Cbb83bb39b74f41802';
const deployedContract = new web3.eth.Contract(abi, address);
const latestSubscription = web3.eth.subscribe('latest');
const blockNumber = web3.eth.blockNumber;

latestSubscription.watch((error, result) => {
  const block = web3.eth.getBlockNumber(result, true);
  console.log('1.blockchain : ', block.number);
});

export { web3, abi, address, deployedContract, filter, blockNumber };
