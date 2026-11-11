// 使用mongoose连接数据库  修改文档数据
const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/mydatabase');

// 连接成功
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
    // 创建文档对象
    const MyModel = mongoose.model('MyModel', new mongoose.Schema({ name: String }));
    // 修改文档数据
    MyModel.updateOne({ name: 'John Doe' }, { name: 'Jane Doe' })
        .then(() => console.log('Document updated'))
        .catch((err) => console.error('Error updating document:', err));
    // 批量修改
    MyModel.updateMany({ name: 'Jane Doe' }, { name: 'John Smith' })
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