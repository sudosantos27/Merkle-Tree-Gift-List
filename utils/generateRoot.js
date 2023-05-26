// Use this script to generate the hardcoded root value that will be used in the server

// Import the MerkleTree class
const MerkleTree = require('./MerkleTree');
// Import the list of names
const niceList = require('./niceList');

// Create a new instance of the MerkleTree with the list of names as leaves
const merkleTree = new MerkleTree(niceList);
// Calculate the root value of the Merkle tree
const root = merkleTree.getRoot();

// Print the root value
console.log('root', root);
