# Merkle Tree Gift List - Alchemy Ethereum Developer Bootcamp - Week 2 Project

The "Merkle Tree Gift List" project is the Week 2 project of the Alchemy Ethereum Developer Bootcamp. It is a demonstration of how a Merkle tree data structure can be used to verify the integrity of a gift list and determine eligibility for receiving gifts. It utilizes a client-server architecture where the client interacts with the server to check if a given name is on the gift list.

## Features

- The server generates a Merkle root representing the entire gift list and hardcodes it for verification purposes.
- The client reads a list of names from a JSON file and constructs a Merkle tree based on the names.
- The client calculates the Merkle proof for a specific name and sends it to the server for verification.
- The server verifies the proof and determines whether the name is on the gift list.
- The server responds to the client with an appropriate message indicating if the person is eligible for a gift.

## Project Structure

The project consists of the following components:

1. **Server**: Contains the server-side code responsible for handling incoming requests and verifying the Merkle proofs.
   - `index.js`: Sets up an Express server, listens for POST requests from the client, and verifies the Merkle proof against the hardcoded Merkle root.

2. **Client**: Contains the client-side code responsible for constructing the Merkle tree, generating the proof, and communicating with the server.
   - `index.js`: Reads the list of names from a JSON file, constructs a Merkle tree, generates the Merkle proof for a specific name, and sends the proof to the server for verification.

3. **Utils**: Contains utility files used by both the client and server.
   - `MerkleTree.js`: Implements the Merkle tree data structure and provides methods to calculate the root and generate proofs.
   - `verifyProof.js`: Implements the verification logic for a Merkle proof.

4. **Nice List**: Contains a JSON file (`niceList.json`) that holds the list of names eligible for receiving gifts.

## Usage

1. Start the server by navigating to the `server` folder and running `node index.js`.

2. Run the client by navigating to the `client` folder and running `node index.js <name>`, where `<name>` is the name you want to check for eligibility.

3. The client will communicate with the server and display the appropriate message indicating if the person is on the gift list or not.

## Dependencies

The project relies on the following dependencies:

- `express`: Web framework used for the server.
- `axios`: HTTP client used for making requests from the client.
- `ethereum-cryptography`: Library for cryptographic operations such as hashing and signature verification.

Make sure to install these dependencies by running `npm install` in both the `client` and `server` folders before running the project.

## Conclusion

The "Merkle Tree Gift List" project showcases the concept of using a Merkle tree data structure to verify the integrity of a list and determine eligibility for receiving gifts. By leveraging cryptographic techniques and the properties of Merkle trees, it provides a secure and efficient way to validate the inclusion of a name in a large dataset. Feel free to explore the code and experiment with different names to see the verification process in action.



---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




# Gift List

To get started with the repository, clone it and then run `npm install` in the top-level directory to install the depedencies.

There are three folders in this repository:

## Client

You can run the client from the top-level directory with `node client/index`. This file is a script which will send an HTTP request to the server.

Think of the client as the _prover_ here. It needs to prove to the server that some `name` is in the `MERKLE_ROOT` on the server. 

## Server

You can run the server from the top-level directory with `node server/index`. This file is an express server which will be hosted on port 1225 and respond to the client's request.

Think of the server as the _verifier_ here. It needs to verify that the `name` passed by the client is in the `MERKLE_ROOT`. If it is, then we can send the gift! 

## Utils

There are a few files in utils:

- The `niceList.json` which contains all the names of the people who deserve a gift this year (this is randomly generated, feel free to add yourself and others to this list!)
- The `example.js` script shows how we can generate a root, generate a proof and verify that some value is in the root using the proof. Try it out from the top-level folder with `node/example.js`
- The `MerkleTree.js` should look familiar from the Merkle Tree module! This one has been modified so you should not have to deal with any crypto type conversion. You can import this in your client/server
- The `verifyProof.js` should also look familiar. This was the last stage in the module. You can use this function to prove a name is in the merkle root, as show in the example.
