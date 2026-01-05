const express = require('express')
const app = express()

app.use((request, reponse, next) => {
    console.log('app use called');
    next();
})

app.get('/students', (request, response) => {
    const students = [
        { id: 1, name: '111', age: 10 },
        { id: 2, name: '222', age: 10 },
        { id: 3, name: '343', age: 10 },

    ]

    response.send(students)
})

app.listen(8080, (err) => {
    if (!err) {
        console.log('server1 called: http://localhost:8080/students')
    }
})

// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })
