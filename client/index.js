#! /usr/bin/env node

// Server interface
const express = require('express')
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express()
const path = require('path')
const router = express.Router()

const secrets= require('./secrets.js')

const port = process.argv[2] || 8888

// Main
router.get('/', async (req, res) => {
    try {
        /* Login. */
        res.sendFile(path.join(__dirname+'/public/login.html'));
    } catch(err) {
        console.log('Error: /', { err })
        return res.sendStatus(500)
    }
})

// Logout
router.get('/logout', async (req, res) => {
    try {
        /* Logout. */
        // process.exit();
        req.session.loggedin = false;
        req.session.username = false;
        res.redirect('/');
    } catch(err) {
        console.log('Error: /', { err })
        return res.sendStatus(500)
    }
})

router.get('/home', async (req, res) => {
    try {
        /* Login. */
        if (req.session.loggedin) {
          res.sendFile(path.join(__dirname+'/public/home.html'));
        } else {
          req.session.loggedin = false;
          req.session.username = false;
          res.redirect('/');
        }
    } catch(err) {
        console.log('Error: /', { err })
        return res.sendStatus(500)
    }
})

// Login
router.post('/auth', async (req, res) => {
  try {
      /* Login. */
      var username = req.body.username;
    	var password = req.body.password;
    	if (username && password) {
          if (secrets.username === username && secrets.password === password) {
    			//  if (results.length > 0) {
    				req.session.loggedin = true;
    				req.session.username = username;
    				res.redirect('/home');
    			} else {
    				res.send('Incorrect Username and/or Password!');
    			}
    	} else {
    		res.send('Please enter Username and Password!');
    		res.end();
    	}
  } catch(err) {
      console.log('Error: /', { err })
      return res.sendStatus(500)
  }
});

// Static file routing
app.use(express.static(__dirname+'/public'));

// Session & Login
app.use(session({
	secret: secrets.secret,
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

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
