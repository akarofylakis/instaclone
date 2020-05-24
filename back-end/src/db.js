const mongoose = require('mongoose');

const dbSetup = () => {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_NAME}-t4obp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('DB Connection Successful!');
    })
    .catch((err) => {
      console.log(err);
    });
  mongoose.set('useCreateIndex', true);
};

module.exports = dbSetup;
