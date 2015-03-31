module.exports = function(server) {

	var io = require('socket.io').listen(server);
	var SerialPort = require("serialport").SerialPort;
	var serialPort = new SerialPort('COM1', {
	    baudrate: 9600 
	});	
	console.log(serialPort);
	socketListener(io, server, serialPort);
	serialListener(io, serialPort);
	
	return io;
} 

function socketListener(io, server)
{
	io.sockets.on('connection', function(socket){
		// process arduino request data message to serial port
		socket.on('requestData', function(msg){
			// serial write
			serialPort.write(msg, function(err, result) {
				console.log('err ' + err);
				console.log('result ' + result);
				io.emit('responseData', err + '/' + reuslt);
			});
		});
		
		// process arduino contorl request message to serial port
		socket.on('requestControl', function(msg){
			// serial write
			serialPort.write(msg, function(err, result) {
				console.log('err ' + err);
				console.log('result ' + result);
				io.emit('responseControl', err + '/' + reuslt);
			});
		});	  
	});	
}

function serialListener(io, serialPort)
{
	var receivedData = "";
	console.log(serialPort);
	serialPort.on("open", function () {
		// Listens to incoming data
		serialPort.on('data', function(data) { 
			receivedData += data.toString();
			if (receivedData .indexOf('E') >= 0 && receivedData .indexOf('B') >= 0) {
				sendData = receivedData .substring(receivedData .indexOf('B') + 1, receivedData .indexOf('E'));
				receivedData = '';
			}
			console.log(11111);
			io.emit('responseControl', sendData);
		});  
	});  
}