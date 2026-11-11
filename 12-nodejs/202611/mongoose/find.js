// 利用monggose查询数据
const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/mydatabase');

// 连接成功
mongoose.connection.on('connected', async () => {
    console.log('Mongoose connected to MongoDB');
    // 创建文档对象
    const MyModel = mongoose.model('MyModel', new mongoose.Schema({ name: String }));
    // 查询文档数据
    try {
        const docs = await MyModel.find({ name: 'John Doe' });
        console.log('Found documents:', docs);
    } catch (err) {
        console.error('Error finding documents:', err);
    }
    // 根据ID查询
    try {
        const doc = await MyModel.findById('6af3cc194ede59895dfa4547');
        console.log('Found document by ID:', doc);
    } catch (err) {
        console.error('Error finding document by ID:', err);
    }
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