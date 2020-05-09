const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@instagram-cluster-t4obp.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect((err) => {
  const collection = client.db('user').collection('user');
  // perform actions on the collection object
  console.log(collection);
  client.close();
});

module.exports = client;
