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

//
// const ContractInstance = this.web3.eth.contract.at(
//   '0x71e26d3581058dfc17517d1308686fd81ef4cf01',
// );
// console.log('1.blockchain Contract : ', ContractInstance);
const alexID = '0x98325c336c9f9261d6Ff15Cbb83bb39b74f41802';

var i = web3.eth.iban.fromAddress(alexID);
console.log(i.toString()); // XE66HS0N6EYN8A0T2V8HK1QTVX2ACF96FB6

// var abi = [
//   {
//     name: 'myConstantMethod',
//     type: 'function',
//     constant: true,
//     inputs: [{ name: 'a', type: 'string' }],
//     outputs: [{ name: 'd', type: 'string' }],
//   },
//   {
//     name: 'myStateChangingMethod',
//     type: 'function',
//     constant: false,
//     inputs: [{ name: 'a', type: 'string' }, { name: 'b', type: 'int' }],
//     outputs: [],
//   },
//   {
//     name: 'myEvent',
//     type: 'event',
//     inputs: [
//       { name: 'a', type: 'int', indexed: true },
//       { name: 'b', type: 'bool', indexed: false },
//     ],
//   },
// ];
export const account = web3.eth.defaultAccount;
console.log('1.blockchain account : ', account);
// // creation of contract object
// var MyContract = web3.eth.contract(abi);

// initiate contract for an address
// var myContractInstance = web3.eth.contract.at(
//   '0x71e26d3581058dfc17517d1308686fd81ef4cf01',
// );

// console.log('1.blockchain mycontract : ', myContractInstance);

// call constant function
// var result = myContractInstance.myConstantMethod('myParam');
// console.log(result); // '0x25434534534'

// send a transaction to a function
// myContractInstance.myStateChangingMethod('someParam1', 23, {
//   value: 200,
//   gas: 2000,
// });

// short hand style
// web3.eth.contract(abi).at(address).myAwesomeMethod(...);

// create filter
// var filter = myContractInstance.myEvent({a: 5}, function (error, result) {
//  if (!error)
//    console.log(result);
//    /*
//    {
//        address: '0x8718986382264244252fc4abd0339eb8d5708727',
//        topics: "0x12345678901234567890123456789012", "0x0000000000000000000000000000000000000000000000000000000000000005",
//        data: "0x0000000000000000000000000000000000000000000000000000000000000001",
//        ...
//    }
//    */
// });
