// mongoose数据库连接
const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 连接成功
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
  // 创建文档对象
  const MyModel = mongoose.model('MyModel', new mongoose.Schema({ name: String }));
  // 新增
  const doc = new MyModel({ name: 'John Doe' });
  doc.save()
    .then(() => console.log('Document saved'))
    .catch((err) => console.error('Error saving document:', err));
  // 关闭数据库连接
  mongoose.connection.close()
    .then(() => console.log('Mongoose connection closed'))
    .catch((err) => console.error('Error closing connection:', err));
});

// 连接失败
mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

// 连接断开
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

module.exports = mongoose;  