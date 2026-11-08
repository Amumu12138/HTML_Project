var express = require('express');
var router = express.Router();
// 引入lowdb依赖
const low = require('lowdb');
// 引入FileSync适配器
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');
// 创建适配器实例，指定数据库文件路径
const adapter = new FileSync(__dirname + '/../data/db.json');
// 创建lowdb实例
const db = low(adapter);

// GET users listing.
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET users listing.
router.get('/account', function (req, res, next) {
  const accountList = db.get('accounts').value();

  res.render('account', { title: 'Account List', accounts: accountList });

});

// GET users listing.
router.get('/account/create', function (req, res, next) {
  res.render('account-create', { title: 'Create Account' });
});

// 提交账单请求
router.post('/account/create', function (req, res, next) {
  // 获取请求体中的数据
  const { name, money, date } = req.body;

  // 在这里可以将数据保存到数据库或进行其他处理
  console.log('Received account data:', { name, money, date });

  db.get('accounts').unshift({ id: shortid.generate(), ...req.body }).write();
  // 返回成功响应
  res.render('success', { title: 'Account Created Successfully', url: '/account' });
});

// GET users listing.
router.get('/account/list', function (req, res, next) {
  // 在这里可以从数据库中获取账单列表
  const accountList = db.get('accounts').value();

  res.render('accounts', { title: 'Account List', accounts: accountList });
});

// 删除元素
router.get('/account/delete/:id', function (req, res, next) {
  const { id } = req.params;
  db.get('accounts').remove({ id }).write();
  res.render('success', { title: 'Account Deleted Successfully', url: '/account' });
});

module.exports = router;
