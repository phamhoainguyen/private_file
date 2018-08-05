var express = require("express")
var ejs = require('ejs')
var app = express()


app.set('view engine', 'ejs')

app.get('/api/file', function(req, res) {
	res.render('index')
})

var port = process.env.PORT || 8099
app.listen(port, function() {
	console.log('Node.js listening on port ' + port)
})