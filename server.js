const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://mirajasraf786:miraj123@binarytree.nur1ys3.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

const app = express();
const port = 3000;

async function breadthFirstSearch(startNode) {
  try {
    await client.connect();
    const db = client.db('<dbname>');
    const nodesCollection = db.collection('nodes');

    let queue = [];
    let visited = [];

    queue.push(startNode);
    visited.push(startNode);

    while (queue.length > 0) {
      let currentNode = queue.shift();
      console.log(`Visited node: ${currentNode}`);

      let children = await nodesCollection.find({ parent: currentNode }).toArray();

      children.forEach(child => {
        if (!visited.includes(child._id)) {
          queue.push(child._id);
          visited.push(child._id);
        }
      });
    }

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

app.get('/breadthFirstSearch/:nodeId', (req, res) => {
  let nodeId = req.params.nodeId;
  breadthFirstSearch(nodeId);
  res.send(`Breadth-first search starting from node ${nodeId} complete.`);
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}.`);
});
