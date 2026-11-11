// mongoose数据库连接
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/mydatabase';
const MyModel = mongoose.model('MyModel', new mongoose.Schema({ name: String }));

async function connectDatabase() {
  try {
    await mongoose.connect(uri);
    console.log('Mongoose connected to MongoDB');

    await MyModel.create({ name: 'John Doe' });
    console.log('Document saved');
  } catch (error) {
    console.error('Mongoose operation failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

connectDatabase();

module.exports = mongoose;
