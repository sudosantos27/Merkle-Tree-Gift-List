const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  console.log('args', process.argv);
  
  // Check if the number of command-line arguments is correct
  if(process.argv.length !== 3) {
    console.error('expected 1 argument, received', process.argv.length - 2);
    process.exit(1);
  }

  // Extract the leaf name from the command-line argument
  const leafName = process.argv[2];
  
  // Find the index of the leaf name in the nice list
  const leafIndex = niceList.indexOf(leafName);

  // Create a Merkle tree using the nice list
  const merkleTree = new MerkleTree(niceList);
  
  // Generate the proof for the leaf at the specified index
  const proof = merkleTree.getProof(leafIndex);

  // Send a POST request to the server to check if the leaf name is in the nice list
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    leafName,
    proof
  });

  console.log({ gift });
}

main();
