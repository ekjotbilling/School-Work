var http=require('http');
var fs=require('fs');
var path= require('path');
var port= 8080;

var server=http.createServer(function (req,res) {
	// body...
});


server.listen(port,function(){
	console.log('Server running at PORT: '+port)
})
