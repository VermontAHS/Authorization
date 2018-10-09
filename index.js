const express = require('express')
const app = express()
const router = require('./src/routes')
const port = process.env.PORT || 3000

// respond with "hello world" when a GET request is made to the homepage
app.use('/', router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
