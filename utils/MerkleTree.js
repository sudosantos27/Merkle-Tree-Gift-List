const { keccak256 } = require('ethereum-cryptography/keccak');
const { bytesToHex } = require('ethereum-cryptography/utils');

class MerkleTree {
  constructor(leaves) {
    // Constructor function for the MerkleTree class
    // It takes an array of leaves and initializes the Merkle tree
    // Each leaf is converted to a buffer and hashed using keccak256
    this.leaves = leaves.map(Buffer.from).map(keccak256);

    // Helper function for concatenating two buffers and hashing the result
    this.concat = (left, right) => keccak256(Buffer.concat([left, right]));
  }

  // Method to get the root of the Merkle tree
  getRoot() {
    // Returns the root of the Merkle tree as a hexadecimal string
    return bytesToHex(this._getRoot(this.leaves));
  }

  // Method to get the Merkle proof for a given leaf index
  getProof(index, layer = this.leaves, proof = []) {
    // Recursive method to generate the Merkle proof for a given leaf index
    // It takes the current layer, the current proof, and the target index as parameters
    // Returns an array of proof objects containing the necessary data to verify the inclusion of the leaf

    // Base case: if the layer has only one element, return the proof
    if (layer.length === 1) {
      return proof;
    }

    const newLayer = [];

    for (let i = 0; i < layer.length; i += 2) {
      const left = layer[i];
      const right = layer[i + 1];

      if (!right) {
        // If there is no right node, push the left node to the new layer
        newLayer.push(left);
      } else {
        // If there are both left and right nodes, concatenate and hash them
        // If the index matches the current pair, add the appropriate proof object to the proof array
        newLayer.push(this.concat(left, right));

        if (i === index || i === index - 1) {
          let isLeft = !(index % 2);
          proof.push({
            data: isLeft ? bytesToHex(right) : bytesToHex(left),
            left: !isLeft,
          });
        }
      }
    }

    // Recursive call to generate the proof for the next layer
    return this.getProof(Math.floor(index / 2), newLayer, proof);
  }

  // Private function to calculate the root of the Merkle tree
  _getRoot(leaves = this.leaves) {
    // Recursive function to calculate the root of the Merkle tree
    // It takes an array of leaves and returns the root as a buffer

    // Base case: if there is only one leaf, return it as the root
    if (leaves.length === 1) {
      return leaves[0];
    }

    const layer = [];

    for (let i = 0; i < leaves.length; i += 2) {
      const left = leaves[i];
      const right = leaves[i + 1];

      if (right) {
        // If there is a right node, concatenate and hash the left and right nodes
        layer.push(this.concat(left, right));
      } else {
        // If there is no right node, push the left node to the layer
        layer.push(left);
      }
    }

    // Recursive call to calculate the root for the next layer
    return this._getRoot(layer);
  }
}

module.exports = MerkleTree;
