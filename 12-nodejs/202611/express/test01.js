// express实现路由参数对应歌手id的需求
const express = require('express')

const app = express()

const singers = [{
    id: '1',
    name: '001',
    url: 'https://singer001'
},
{
    id: '2',
    name: '002',
    url: 'https://singer002'
}
]
app.get('/singer/:id', (req, res) => {
    let { id } = req.params
    let findName = singers.find((obj) => obj.id === id).name
    res.send("findName = " + findName)
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/singer/1')
})