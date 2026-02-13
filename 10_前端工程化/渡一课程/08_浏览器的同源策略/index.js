const express = require('express')
const axios = require('axios')
const app = express();

app.get('/hero', async (req, res) => {
    // 允许全部源
    res.header("access-control-allow-origin", "*")
    // res.send('你好,我是代理服务器')

    // 服务器获取王者列表的接口数据
    const resp = await axios.get('https://pvp.qq.com/web201605/js/herolist.json');
    // console.log(resp, 'resp herolist');
    // 返回英雄列表数据
    res.send(resp.data)
});

app.listen(8080, () => {
    console.log('服务器已启动');
})