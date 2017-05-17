var express = require('express')
var app = express()

var request = {}
var done = false

app.get('/', function(req, res){
	res.send("kys")
})

app.post('/make', function(req, res){
	request = req.body
	res.send("k")
})

app.post('/done', function(req, res){
	done = true
	res.send(done)
})

app.get('/done', function(req, res){
	done = false
	res.send(done)
})

// lol nice hacks dood
app.get('/req', function(req, res){
	res.json(request)
})

app.listen(3000)
