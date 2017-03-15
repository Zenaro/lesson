/*var Index = {
	'time': 2000,
	'btn': document.getElementById('btn'),
	init: function() {

	},
	render: function() {

	},
	bind: function() {

	}
};*/


var Index = (function() {
	var i = 2; // 私有
	var j = 3;
	return { // 共有
		add: function() {
			return i + j;
		}
	}
	// console.log('test');
})();

console.log(Index.i);



// javascript   java   c++

// 私有变量 private



// Audio Video

// 属性: 
currentTime, duration, ....


// 方法


// ontimeupdate 事件属性

// setInterval();
var audio = new Audio();
audio.ontimeupdate = function() { // 100
	console.log();
}

doc.getElementById('btn').onclick = function() { // 前端
	audio.play();
	audio.pause();
	....
}