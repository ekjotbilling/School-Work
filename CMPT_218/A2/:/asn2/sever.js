var http=require('http');
var fs=require('fs');
var path= require('path');
var url = require('url');
var qs = require('querystring');
var PORT= 26132;

var server=http.createServer();




server.on('request',function(req,res){
	console.log('request:', req.url);
	var urlObj = url.parse(req.url, true); // true => query turned into an obj
	console.log(urlObj.query.lname);

	if (req.method === 'GET' && (req.url.match(/^\/.+\.html$/) || req.url === '/') ){

	if(req.url==='/'){
		var filepath = path.join(__dirname,'form.html');
	}
	else{
		var filepath = path.join(__dirname,req.url);
	}
	

	
	fs.readFile(filepath, function(err, contents){
		if(!err){
			res.writeHead(200, {"Content-type" : "text/html"});
			res.write(contents);
			res.end();
		}
		else{
			res.writeHead(404);
			res.write('404 Error');
			res.end()

		}

	});

	} 

	else if (req.method === 'GET' && req.url.match(/^\/.+\.css$/) ){
	
	var filepath = path.join(__dirname,req.url);
	fs.readFile(filepath, function(err, contents){
		if(!err){
			res.writeHead(200, {"Content-type" : "text/css"});
			res.write(contents);
			res.end();
		}
		else{
			res.writeHead(404);
			res.write('404 Error');
			res.end()

		}

	});

	} 

	else if (req.method === 'GET' && req.url.match(/^\/.+\.js$/) ){
	
	var filepath = path.join(__dirname,req.url);
	fs.readFile(filepath, function(err, contents){
		if(!err){
			res.writeHead(200, {"Content-type" : "text/javascript"});
			res.write(contents);
			res.end();
		}
		else{
			res.writeHead(404);
			res.write('404 Error');
			res.end()

		}

	});

	}

	else if (req.method === 'GET' && req.url==='/data/users.json' ){
	
	var filepath = path.join(__dirname,req.url);
	fs.readFile(filepath, function(err, contents){
		if(!err){
			res.writeHead(200, {"Content-type" : "text/JSON"});
			res.write(contents);
			res.end();
		}
		else{
			fs.appendFile('data/users.json',JSON.stringify(' '),'utf-8',function (err) {
  				if (err) {console.log('Error');}
  				else{
  					console.log('Saved!');
  				}
			});

		}

	});

	} 

	

	
	

	else if (req.method === 'POST' && req.url === '/'){

	// let checkJson=

		var body ='';
		req.on('data', function(data){
			body += data.toString();
			// body+=JSON.parse(data);
		});
		req.on('end', function(){
			var postObj = qs.parse(body);
			console.log(postObj);
			 // let obj=JSON.parse(body);

			fs.appendFile('data/users.json',JSON.stringify(postObj),'utf-8',function (err) {
  				if (err) {console.log('Error');}
  				else{
  					console.log('Saved!');
  				}
			});
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
