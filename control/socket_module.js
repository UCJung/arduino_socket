
module.exports = function(server) {

	var io = require('socket.io').listen(server);
	 
	io.sockets.on('connection', function(socket){
		socket.on('requestData', function(msg){
			io.emit('responseData', "ResponseData : " + msg);
		});
		
		socket.on('requestControl', function(msg){
			io.emit('responseControl', msg);
		});	  
	});	
	
	return io;
} 