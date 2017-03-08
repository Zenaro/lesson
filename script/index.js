// vue react 工厂
function Index() {
	this.time = 2000;
	this.btn = document.getElementById('btn');

	// 初始化页面
	this.prototype.init = function() {
		this.render();
		this.bind();
	}

	this.prototype.render = function() {
		$.ajax({
			'url': '../#$%#$%index.php',
			'dataType': 'json',
			'success': function(res) {
				var htmlDOM = '';
				$.each(res, function(index, value) {
					htmlDOM += '<li>' +
						value.name +
						'</li>';
				});
				$('ul#!@#@#').append(htmlDOM);
			}
		});
	}

	// 记录页面的所有事件
	this.prototype.bind = function() {
		this.btn.onclick = function() {
			console.log('test');
		}

		// ... 

	}
}


// 
function sort() {

}
// 120 -> 02:00
function parseClock() {

}