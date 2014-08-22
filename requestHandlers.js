/**
 * @author Praveen
 */
var exec = require("child_process").exec;
var querystring = require("querystring");
var formidable = require("formidable");
var os = require("os"); 
var fs = require("fs");

function start(response, postData) {
	console.log("Request handler 'start' was called.");

	var body = '<html>'+ '<head>'+ '<meta http-equiv="Content-Type" content="text/html; '+ 'charset=UTF-8" />'+
		'</head>'+ '<body>'+
		'<form action="/upload" method="post">'+
			'<textarea name="text" rows="20" cols="60"></textarea>'+
			'<input type="submit" value="Submit text" />'+
		'</form>'+ '</body>'+ '</html>';
//	exec("ls -lah", function (error, stdout, stderr) {
/*	exec("dir", function (error, stdout, stderr) {
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(stdout);
		response.write(stderr);
		response.end();
	});
*/
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();

}

function upload(response, postData) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("You have sent the text: " + querystring.parse(postData).text);
//	response.write("You have sent the text: "+ postData);
	response.end();
}

function show(response) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200, {"Content-Type": "image/png"});
	fs.createReadStream("/tmp/test.png").pipe(response);
}

function file(response){
	console.log("Request handler 'file' was called.");
		
	var body = '<html>'+ '<head>'+ '<meta http-equiv="Content-Type" content="text/html; '+ 'charset=UTF-8" />'+
	'</head>'+ '<body>'+
	'<form name = "Property Address" action="/fileCreate" method="post">'+
		'Street address: <input type="text" name ="StreetAddress">'+
		'City: <input type="text" name ="City">'+
		'<input type="submit" value="Submit address" />'+
	'</form>'+ '</body>'+ '</html>';
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();

} //function file

function fileCreate(response, postData){
	console.log("Request handler 'fileCreate' was called.");
	
	console.log("OS type:" + os.type());
	console.log("OS platoform:" + os.platform());
	if (os.platform() === "win32"){	
		exec("dir", function (error, stdout, stderr) {
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write(stdout);
			response.write(stderr);
			response.end();
		});
	}
	if (os.platform() === "linux"){	
		var query = querystring.parse(postData);
		var fileName = "";
		for(var x in query){
			var value = query[x].trim();
			while(value.indexOf(" ") != -1)
				value = value.replace(" ", "");
			console.log("key:" + value);
			fileName = fileName + value;
		}
		console.log("post Data:" + postData + " query:" + query + " fileName:" + fileName);
		
		fs.open("./" + fileName, "a+", function(err, fd){
			  if (err) throw err;
			  console.log('successfully created file: ' + postData);
			  fs.close(fd);
		});
		exec("ls -la", function (error, stdout, stderr) {
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write(stdout);
			response.write(stderr);
			response.end();
		    if (error !== null) {
		        console.log('exec error: ' + error);
		    };
		});
	} //linux

} //function file
exports.start = start;
exports.upload = upload;
exports.show = show;
exports.file = file;
exports.fileCreate = fileCreate;