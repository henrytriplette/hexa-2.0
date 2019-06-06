#! /usr/bin/env node

// Server interface
const express = require('express')
const app = express()
const path = require('path')
const router = express.Router()
const request = require('request-promise')

const secrets= require('./secrets.js')

const port = process.argv[2] || 8888

// Main
router.get('/', async (req, res) => {
    try {
        /* Homepage. */
        res.sendFile(path.join(__dirname+'/public/index.html'));
    } catch(err) {
        console.log('Error: /', { err })
        return res.sendStatus(500)
    }
})

// Test
router.get('/test', async (req, res) => {
    try {
        /* Test. */
        res.sendFile(path.join(__dirname+'/public/test.html'));
    } catch(err) {
        console.log('Error: /', { err })
        return res.sendStatus(500)
    }
})

// Logout
router.get('/logout', async (req, res) => {
    try {
        /* Logout. */
        process.exit();
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

// exit
process.on('SIGINT', function() {
    if (app != undefined) {
      console.log("Closing server");
			// Exit the program, perhaps here you want to re-enable the hotword detector again.
			process.exit(1);
    }
});
