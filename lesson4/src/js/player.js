(function(wind, undefined) {
	function Player(json) {
		if (!json || !json.hasOwnProperty("el")) {
			console.error("function Player constructor error: lack of el");
			return;
		}
		this.json = json;
		this.audio = new Audio();
		this.index = 0;
		this.list = [];

		this.init();
		// if (Object.prototype.toString.call(json) === '[object Array]')
	}
	Player.prototype = {
		init: function() {
			this.render();
			this.bind();
		},
		render: function() {
			let htmlString = `<div class="audio-player bottom-bar">
				<div class="audio-player-core">
					<div class="play-btns">
						<a href="javascript:void(0);" class="prv" title="上一首"></a>
						<a href="javascript:void(0);"	class='play-pas' id="play-pause"></a>
						<a href="javascript:void(0);" class="nxt" title="下一首"></a>
					</div>
					<div class="play-album">
						<a href="javascript:void(0);">
							<img src="./image/default_album.jpg" alt=""/>
						</a>
					</div>
					<div class="play-progress">
						<div class="pro-title">
							<a href="javascript:void(0);" class="title" title="曲名">歌曲名</a>
							<a href="javascript:void(0);" class="singer" title="演绎者">歌手</a>
						</div>
						<div class="pro-bar">
							<div class="barbg">
								<div class="rdy"></div>
								<div class="cur" draggable="true">
									<div class="cur-inner">
										<span class="btn-cur">
											<i alt="loading"></i>
										</span>
									</div>
								</div>
							</div>
							<span class="clock">
								<i>00:00</i>
								<span> / </span>
								<em>000:00</em>
							</span>
						</div>
					</div>
					<div class="play-ctrl">
						<div class="vlm-bar show">
							<div class="barbg">
								<div class="cur">
									<i class="btn-cur" draggable="true"></i>
								</div>
							</div>
						</div>
						<a href="javascript:void(0);" class="icon-vol" title="音量"></a>
						<a href="javascript:void(0);" class="icon-shuffle"></a>
						<div class="show lop-hint">
							随机播放
						</div>
					</div>
				</div>
			</div>`;
			document.querySelector(this.json.el).innerHTML = htmlString;
		},
		bind: function() {
			document.querySelector(".play-pas").onclick = () => {
				if (this.audio.paused) {
					this.play();
				} else {
					this.pause();
				}
			}
			this.audio.onloadstart = function() {
				document.querySelector(".btn-cur i").style.visibility = 'visible';
			};
			this.audio.oncanplay = function() {
				console.log('onplay');
				document.querySelector(".btn-cur i").style.visibility = 'hidden';
			};
			this.audio.onprogress = () => {
				let pct = 0,
					index = this.audio.buffered.length;

				// index大于0即可调用 buffered.end
				if (index > 0) {
					pct = ~~(this.audio.buffered.end(index - 1) / this.audio.duration * 1000) / 10;
					console.log(pct);
					document.querySelector(".rdy").style.width = pct + "%";
				}
			};
			this.audio.ontimeupdate = () => {
				let pct = this.audio.currentTime / this.audio.duration;
				pct = ~~(pct * 1000) / 10;
				// console.log()

				document.querySelector(".cur-inner").style.width = pct + "%";
				document.querySelector(".clock i").innerHTML = this.parseClock(this.audio.currentTime);
				document.querySelector(".clock em").innerHTML = this.parseClock(this.audio.duration);
			}
		},
		parseClock: function(time) { // 120 -- 02:00 fasdf
			time = parseInt(time);
			if (typeof time != 'number' || time != time) {
				console.error("type Error");
				return;
			}
			if (time > 3600) {
				console.error("out of 3600 s");
				return;
			}

			let min = ~~(time / 60);
			let sec = time % 60;
			if (min < 10) {
				min = '0' + min;
			}
			if (sec < 10) {
				sec = '0' + sec;
			}
			return min + ":" + sec;
		},
		setSrc: function(src) {
			this.audio.src = src;
			this.list.push(src);
		},
		play: function() {
			if (this.audio.src === "") {
				console.error("null src");
				return;
			}
			this.audio.play();
			document.querySelector("#play-pause").className = "play-pas";
		},
		pause: function() {
			this.audio.pause();
			document.querySelector("#play-pause").className = "play-ply";
		},
		prevStack: function() {
			if (this.list.length > 1 && this.index > 0) {
				this.audio.src = this.list[this.index--];
			}
		},
	}

	wind.Player = Player;
})(window);