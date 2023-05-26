const { keccak256 } = require('ethereum-cryptography/keccak');
const { hexToBytes, bytesToHex } = require('ethereum-cryptography/utils');

// Helper function for concatenating two buffers and hashing the result
const concat = (left, right) => keccak256(Buffer.concat([left, right]));

function verifyProof(proof, leaf, root) {
  // Function to verify the Merkle proof for a given leaf and root
  // It takes the proof, the leaf data, and the root as parameters
  // Returns a boolean indicating whether the proof is valid or not

  // Convert the proof data from hexadecimal to bytes and update the proof array
  proof = proof.map(({ data, left }) => ({
    left,
    data: hexToBytes(data),
  }));

  // Hash the leaf data using keccak256
  let data = keccak256(Buffer.from(leaf));

  // Iterate through the proof and concatenate/hash the data accordingly
  for (let i = 0; i < proof.length; i++) {
    if (proof[i].left) {
      data = concat(proof[i].data, data);
    } else {
      data = concat(data, proof[i].data);
    }
  }

  // Compare the resulting hash with the provided root
  return bytesToHex(data) === root;
}

module.exports = verifyProof;
