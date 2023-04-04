const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://mirajasraf786:miraj123@binarytree.nur1ys3.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    console.log('Connected to database.');

    // Perform database operations here

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    console.log('Disconnected from database.');
  }
}

run();
