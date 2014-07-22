/**
 * @author Praveen
 */
var exec = require("child_process").exec;

function start(response) {
	console.log("Request handler 'start' was called.");

//	exec("ls -lah", function (error, stdout, stderr) {
	exec("dir", function (error, stdout, stderr) {
		response.writeHead(200, {"Content-Type": "text/plain"});
//		response.write(error);
		response.write(stdout);
		response.write(stderr);
		response.end();
	});
//	response.writeHead(200, {"Content-Type": "text/plain"});
//	response.write("Start called");
//	response.end();

}

function upload(response) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello Upload");
	response.end();
}

exports.start = start;
exports.upload = upload;