const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa';

app.post('/gift', (req, res) => {
  // Grab the parameters from the front-end here
  const body = req.body;

  // Verify the proof using the received proof, leaf name, and the hardcoded Merkle root
  const isInTheList = verifyProof(body.proof, body.leafName, MERKLE_ROOT);
  if(isInTheList) {
    // If the proof is valid, send a success message
    res.send("You got a toy robot!");
  }
  else {
    // If the proof is not valid, send a failure message
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
