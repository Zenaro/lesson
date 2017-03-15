(function() {
	// 数据绑定 -> 标签
	var vm = new Vue({
		el: '#app',
		data: {
			"message": 'Hello world',
			"imgUrl": 'http://p1.music.126.net/kjWixBUW9iMysr2uHGx5Yg==/3439272378681347.jpg?param=180y180',
			"list": [{
				"title": "50购物券",
				"content": "满1000减50"
			}, {
				"title": "100购物券",
				"content": "满2000减100"
			}],
			flag: true,
			text: 'Hello world'
		},
		created: function() { //
			console.log('test');

			// setTimeout(() => {
			// 	console.log(this);
			// 	this.$set(this, 'list', [{
			// 		"title": "5000购物券",
			// 		"content": "满1000000减50"
			// 	}, {
			// 		"title": "100000购物券",
			// 		"content": "满2000000减100"
			// 	}])
			// }, 1000);
		},
		methods: {
			handleClick: function() {
				console.log('hello');
			}
		}
	});

})();


(function() {

})();