(function() {
	var urlPrefix = '../../FEBE-musql-old/BackEnd/index.php/Home/Music/';
	var vm = new Vue({
		el: '#app',
		data: {
			count: 0,
			musicList: []
		},
		created: function() {
			this.getDefaultData();
		},
		methods: {
			getDefaultData: function() {
				this.$http.get(urlPrefix + 'getList?data=0').then(res => {
					console.log(res.body.result);
					this.$set(this, 'musicList', res.body.result);
				});
			},
			play: function(id) {
				this.$http.get(urlPrefix + 'getItem?id=' + id).then(res => {
					var audio = new Audio;
					audio.src = res.body.result[0].src;
					audio.play();
				});
			}
		}
	});
})();