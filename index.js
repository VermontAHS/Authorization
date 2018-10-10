const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()
const router = require('./src/routes')
const port = process.env.PORT || 3000

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
