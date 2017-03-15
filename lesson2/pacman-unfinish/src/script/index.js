var Game = {
	width: 600,
	height: 300,
	origin: 10,
	cell: 30,
	overFlag: false,
	ctx: null,
	heroInfo: {
		x: 0,
		y: 0,
		dir: 'stop'
	},
	fruits: [],
	monsterInfo: {
		x: 0,
		y: 0
	},
	init: function() {
		var canvas = document.getElementById('myCanvas');
		this.ctx = canvas.getContext('2d');

		this.drawRect(2, 2, this.width, this.height, 9);
		this.drawRect(9, 9, this.width - 2 * this.origin, this.height - 2 * this.origin, 9);
		this.drawMonster(25, 25);


		for (var i = this.origin + this.cell / 2; i < this.width - this.origin; i += this.cell) {
			this.fruits[i] = [];
			for (var j = this.origin + this.cell / 2; j < this.height - this.origin; j += this.cell) {
				this.drawDot(i, j);
				fruits[i][j] = true;
			}
		}

		this.heroInfo.x = 55;
		this.heroInfo.y = 55;
		this.drawHero(this.heroInfo.x, this.heroInfo.y, 'left');
		this.bind();
	},
	eat: function() {},

	bind: function() {
		var self = this;
		// 由于只有此处用到事件，故直接使用onkeydown而不封装事件Util效果更好
		// document.getElementById('btn-restart').onclick = function() {
		// 	self.init();
		// }
		document.body.onkeydown = function(event) {
			if (self.overFlag) {
				return;
			}
			var e = event || window.event;
			var dir = 'left';
			switch (e.keyCode) {
				case 37: // 左
					dir = 'left';
					break;
				case 38: // 上
					dir = 'top';
					break;
				case 39: // 右
					dir = 'right';
					break;
				case 40: // 下
					dir = 'bottom';
					break;
				default:
					dir = self.heroInfo.dir;
			}
			console.log('ones')
				// if (self.heroInfo.dir !== dir) {
			self.heroOneStep(dir);
			// }
		}
	},

	heroOneStep: function(direction) {
		var x = this.heroInfo.x,
			y = this.heroInfo.y,
			dir = direction,
			cell = this.cell;
		this.ctx.clearRect(x - cell / 2, y - cell / 2, cell, cell);
		this.drawHero(x - this.cell, y, direction);
	},

	/*
	 * 画圆角的矩形
	 * @ x: 矩形x坐标
	 * @ y: 矩形y
	 * @ w: 矩形高
	 * @ h: 矩形高
	 * @ radius: border-radius
	 */
	drawRect: function(x, y, width, height, radius) {
		var ctx = this.ctx;
		ctx.clearRect(x, y, width, height);
		ctx.beginPath();
		ctx.moveTo(x, y + radius);
		ctx.lineTo(x, y + height - radius);
		ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
		ctx.lineTo(x + width - radius, y + height);
		ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
		ctx.lineTo(x + width, y + radius);
		ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
		ctx.lineTo(x + radius, y);
		ctx.quadraticCurveTo(x, y, x, y + radius);
		ctx.stroke();
		ctx.closePath();
	},

	/*
	 * 描点的函数
	 * @x: 点中心x坐标
	 * @y: 点中心y坐标
	 */
	drawDot: function(x, y) {
		this.ctx.fillRect(x - 2, y - 2, 4, 4);
	},

	/*
	 * 绘制小怪兽的函数
	 * 小怪兽的半径为 15
	 * @x: 中心点x坐标
	 * @y: 中心点y坐标
	 * @direction: 主人公的眼睛方向
	 */
	drawMonster: function(x, y, direction) {
		var ctx = this.ctx;
		ctx.beginPath();

		x ? x = x - 15 : x = 50;
		y ? y = y + 15 : y = 50;
		// 从最左最下边的尖角开始画起
		ctx.moveTo(x, y);

		ctx.lineTo(x, y - 14);

		// 三次贝塞尔曲线，对应小怪兽左边的圆弧
		ctx.bezierCurveTo(x, y - 22, x + 6, y - 28, x + 14, y - 28);

		// 对应右边的圆弧	
		ctx.bezierCurveTo(x + 22, y - 28, x + 28, y - 22, x + 28, y - 14);

		// 最右下边的尖角
		ctx.lineTo(x + 28, y);

		// 底下的几个尖角
		ctx.lineTo(x + 23.333, y - 4.667);
		ctx.lineTo(x + 18.666, y);
		ctx.lineTo(x + 14, y - 4.667);
		ctx.lineTo(x + 9.333, y);
		ctx.lineTo(x + 4.666, y - 4.667);
		ctx.lineTo(x, y);
		ctx.fill(); // 小怪兽整体轮廓完成，填充颜色
		ctx.closePath();

		// 接下来开始画眼白
		ctx.fillStyle = "white";
		ctx.beginPath();
		// 画左眼白
		ctx.moveTo(x + 8, y - 20);

		ctx.bezierCurveTo(x + 5, y - 20, x + 4, y - 17, x + 4, y - 15);

		ctx.bezierCurveTo(x + 4, y - 13, x + 5, y - 10, x + 8, y - 10);

		ctx.bezierCurveTo(x + 11, y - 10, x + 12, y - 13, x + 12, y - 15);

		ctx.bezierCurveTo(x + 12, y - 17, x + 11, y - 20, x + 8, y - 20);

		// 画右眼白
		ctx.moveTo(x + 20, y - 20);

		ctx.bezierCurveTo(x + 17, y - 20, x + 16, y - 17, x + 16, y - 15);

		ctx.bezierCurveTo(x + 16, y - 13, x + 17, y - 10, x + 20, y - 10);

		ctx.bezierCurveTo(x + 23, y - 10, x + 24, y - 13, x + 24, y - 15);

		ctx.bezierCurveTo(x + 24, y - 17, x + 23, y - 20, x + 20, y - 20);
		ctx.fill();
		ctx.closePath();

		// 最后画眼睛
		ctx.fillStyle = "black";
		// 眼球 向左看还是向右看  false, true
		if (direction === 'left' || direction === 'top') { // 左
			ctx.beginPath();
			ctx.arc(x + 18, y - 14, 2, 0, Math.PI * 2, true);
			ctx.fill();
			ctx.closePath();
			ctx.beginPath();
			ctx.arc(x + 6, y - 14, 2, 0, Math.PI * 2, true);
			ctx.fill();
			ctx.closePath();

		} else { // 右
			ctx.beginPath();
			ctx.arc(x + 22, y - 14, 2, 0, Math.PI * 2, true);
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.arc(x + 10, y - 14, 2, 0, Math.PI * 2, true);
			ctx.fill();
			ctx.closePath();
		}
	},

	drawHero: function(x, y, direction) {
		var radius = this.cell / 2,
			ctx = this.ctx;

		ctx.clearRect(x - radius, y - radius, 2 * radius, 2 * radius); // 先擦除内部
		ctx.beginPath();

		//从1/7半圆弧开始, 画到-1/7半圆弧 ==> 相当于去掉1/7圆周
		// @ false => 顺时针
		if (direction == 'bottom') {
			ctx.arc(x, y, radius, 9 * Math.PI / 14, 5 * Math.PI / 14, false);

		} else if (direction == 'left') {
			ctx.arc(x, y, radius, 8 * Math.PI / 7, 6 * Math.PI / 7, false);

		} else if (direction == 'top') {
			ctx.arc(x, y, radius, 23 * Math.PI / 14, 19 * Math.PI / 14, false);

		} else {
			ctx.arc(x, y, radius, Math.PI / 7, -Math.PI / 7, false);
		}
		ctx.lineTo(x, y); // 回到中心点 以形成闭合路径
		// ctx.fillStyle = '#000';
		ctx.fill(); // color填充

		ctx.closePath();
		// this.heroEat(x, y);
	}

};