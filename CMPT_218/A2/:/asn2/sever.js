var http=require('http');
var fs=require('fs');
var path= require('path');
var url = require('url');
var qs = require('querystring');
var PORT= 8080;

var server=http.createServer();




server.on('request',function(req,res){
	console.log('request:', req.url);
	var urlObj = url.parse(req.url, true); // true => query turned into an obj
	console.log(urlObj.query.lname);

	if (req.method === 'GET' && req.url==='/'){
	var filepath = path.join(__dirname,'/form.html');

	
	fs.readFile(filepath, function(err, contents){
		if(err){
		// handle error
		console.log ('file not found: ' + req.url);
		res.writeHead(404, "Not Found");
        res.end();
		} 
		else {
			console.log('------');
			console.log(contents.url);
			console.log('------');
			res.writeHead(200, {"Content-Type": "text/html"});
			res.write(contents);
			res.end();
		}

	});

	} 
	

	else if (req.method === 'POST' && req.url === '/'){
	var body ='';
	req.on('data', function(data){
		body += data.toString();
	});
	req.on('end', function(){
		var postObj = qs.parse(body);
		console.log(postObj);
		res.end();
	});
	} 


	else {
	res.writeHead(404);
	res.write('404 Error');
	res.end()
	}



});


server.listen(PORT,function(){
	console.log('Server running at PORT: '+PORT)
})
