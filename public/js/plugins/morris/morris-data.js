// Morris.js Charts sample data for SB Admin template

var chartControl = {
	chart : null,
	MorrisAreaData : {
        element: 'morris-area-chart',
        data: [],
        xkey: 'period',
        ykeys: ['temperature', 'humidity', 'illumination', 'noise'],
        labels: ['온도', '습도', '조도', '소음'],
        lineColors: ['blue','green','yellow','red'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    },
    init : function() {
    	this.chart = Morris.Area(this.MorrisAreaData); 
    },
    addData : function(t, h, i, n) {
    	var now = new Date();
    	this.MorrisAreaData.data.push({
            period: now.getTime(),
            temperature: t,
            humidity: h,
            illumination: i,
            noise : n    		
    	});

    	console.log(this.MorrisAreaData.data.length);
    	var size = this.MorrisAreaData.data.length;    	
    	if (size > 100) this.MorrisAreaData.data.splice(0,1);
    	this.chart.setData(this.MorrisAreaData.data);
    }
};      

$(document).ready(function() {
	var socket = io('http://localhost:3000/');
	
    chartControl.init();

	$('#btnGetData').click(function(){
		socket.emit('requestData', 'get sensor data');
		return false;
	});
	
	socket.on('responseData', function(msg){
		console.log(msg);
		var t = Math.floor((Math.random() * 40) + 1);
		var h = Math.floor((Math.random() * 100) + 1);
		var i = Math.floor((Math.random() * 150) + 1);
		var n = Math.floor((Math.random() * 150) + 1);
		$("#lbTemperature").text(t);
		$("#lbHumidity").text(h);
		$("#lbIllumination").text(i);
		$("#lbNoise").text(n);
		chartControl.addData(t,h,i,n);
	});
	
	socket.on('responseControl', function(msg){
		$('#messages').append($('<li>').text(msg));
	});	
	
	// 최초 센서 정보 획득
	socket.emit('requestData', 'get sensor data');
});