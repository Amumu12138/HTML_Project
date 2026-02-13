const express = require('express')
const app = express()

app.use((request, reponse, next) => {
    console.log('app2 use called');
    next();
})

app.get('/cars', (request, response) => {
    const students = [
        { id: 1, name: 'BYD', },
        { id: 2, name: 'TSL', },
        { id: 3, name: 'WJ', },

    ]

    response.send(students)
})

app.listen(7070, (err) => {
    if (!err) {
        console.log('app2 called: http://localhost:7070/cars')
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
