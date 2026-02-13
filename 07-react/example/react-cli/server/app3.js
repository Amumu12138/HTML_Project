const express = require('express')
const app = express()

app.use((request, reponse, next) => {
    console.log('search-github use called');
    next();
})

app.get('/search/users', (request, response) => {
    const avatarList = [
        { id: 1, avatar_url: 'https://avatars.githubusercontent.com/u/168397078?v=4', login: "amumu", html_url: "https://github.com/amumu" },
        { id: 2, avatar_url: 'https://avatars.githubusercontent.com/u/168397078?v=4', login: "amumu", html_url: "https://github.com/amumu" },
        { id: 3, avatar_url: 'https://avatars.githubusercontent.com/u/168397078?v=4', login: "amumu", html_url: "https://github.com/amumu" },
    ]

    response.send({ items: avatarList, code: 200, message: 'success' })
})

app.listen(3010, (err) => {
    if (!err) {
        console.log('search-github called: http://localhost:3010')
    }
})

