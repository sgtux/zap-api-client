const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const PORT = process.env.PORT || 3001
const defaultData = {
    zapApiKey: process.env.ZAP_API_KEY,
    zapApiUrl: process.env.ZAP_API_URL
}

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(bodyParser.json())

app.use(express.static('public'))

app.post('/proxy', (reqProxy, resProxy) => {
    axios.get(reqProxy.body.url)
        .then(res => resProxy.json(res.data))
        .catch(err => {
            const { message, stack, config: { url, method } } = err.toJSON()
            resProxy.status(400).json({ message, stack, url, method })
        })
})

app.get('/default', (req, res) => res.json(defaultData))

app.listen(PORT, () => console.log(`Listening in ${PORT} port`))