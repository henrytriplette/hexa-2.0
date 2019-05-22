#! /usr/bin/env node

// Server interface
const express = require('express')
const app = express()
const path = require('path')
const router = express.Router()
const request = require('request-promise')

const secrets= require('./secrets.js')

const port = process.argv[2] || 8888

router.get('/', async (req, res) => {
    try {
        /*
        Homepage.
        */
        res.sendFile(path.join(__dirname+'/public/index.html'));
    } catch(err) {
        console.log('Error: /', { err })
        return res.sendStatus(500)
    }
})

// Static file routing
app.use(express.static(__dirname+'/public'));

// Add the router
app.use('/', router);
app.listen(port, () => console.log('Server running on', port))
