window.onload = function() {
	// 拿到数据，只操作数据，DOM交给 大型框架 vuejs,react

	var Index = {
		// data: {

		// },
		init: function() {
			this.render();
			this.bind();
		},
		render: function() {
			$.get('../index.php/Home/Index/getList?data=2', function(res) {
				$.each(res, function(index, value) {
					$('ul').eq(index).text(value); // 数据直接 -> dom 操作
				});
			});
		},

		// 页面的事件
		bind: function() {
			$('#app').on('click', 'li', function() {

			}).on('mouseover', 'span', function() {

			});
		}
	};
	Index.init();
}