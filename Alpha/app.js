const express = require('express');
const app = express();
const debug = require('debug');
const path = require('path');
const db = require('./db');
var Records = require('./models/records.js');

app.use("/", express.static(path.join(__dirname, "assests")));
/* Virtual dir for js & css for third party libraries */
app.use("/lib/jquery", express.static(path.join(__dirname, "node_modules", "jquery", "dist")));
app.use("/lib/bootstrap", express.static(path.join(__dirname, "node_modules", "bootstrap", "dist")));
app.use("/lib/font-awesome/css", express.static(path.join(__dirname, "node_modules", "font-awesome", "css")));
app.use("/lib/font-awesome/fonts", express.static(path.join(__dirname, "node_modules", "font-awesome", "fonts")));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'assests', 'index.html'));
});

app.get('/mb/track/recording/:year/:country', function(req, res, next) {
    db().then(()=>{
    	Records.find({year: parseInt(req.params.year), country: req.params.country}).sort({'youtube.views':-1}).limit(11).skip(0).exec(function(err, docs){
    		if(err) return next(err);
    		res.status(200).json({err: false, items: [].concat(docs)})
    	})
    }).catch(next)
});

// 404 not found
app.use(function(req, res, next) {
    res.sendFile(path.join(__dirname, 'assests', '404.html'));
});



db().then(() => {
    const server = app.listen(process.env.port || 3000, () => debug('app:server')(`Server has started in port ${server.address().port}`))
}).catch(() => debug('app:mongo')('Houston we got a problem.... mongo'));