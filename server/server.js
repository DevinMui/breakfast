var express = require('express')
var app = express()

var request = {}

app.get('/', function(req, res){
	res.send("kys")
})

app.post('/make', function(req, res){
	request = req.body
	res.send("k")
})

// lol nice hacks dood
app.get('/req', function(req, res){
	res.json(request)
})

app.listen(3000)
