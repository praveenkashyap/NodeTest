/**
 * @author Praveen
 */
var exec = require("child_process").exec;
var querystring = require("querystring");
var formidable = require("formidable");
fs = require("fs");

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

exports.start = start;
exports.upload = upload;
exports.show = show;