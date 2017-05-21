const express = require("express");
const chalk = require("chalk");
const app = express();
const dotenv = require("dotenv").config();
//Model
const Post = require('./models/Post');

app.set('port', process.env.PORT || 8080);
app.set('domain', process.env.DOMAIN || 'localhost');
app.set('env', process.env.NODE_ENV || "development");


app.listen(app.get('port'), app.get('domain'), () => {
    console.log('%s App is running at http://%s:%d in %s mode', 
		    	chalk.green('✓'),
		    	app.get('domain'),
		    	app.get('port'),
		    	app.get('env')); 
    console.log('   -> Press CTRL+C to stop\n');
});
app.get('/', (req, res) => {
    res.send("Hello NodeJS");
});