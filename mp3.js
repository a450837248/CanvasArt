/**
 ** create by guotingchaopr@gmail.com
 ** 音乐和图片素材纯粹出于学习交流 如果有侵害它人合法权益,请第一时间邮件通知我 我会第一时间删除这些素材.
 **/

var music = function(id){
	var _this = this,
		media,
		media_parent;
	var music_list_container;
	var music_file = [
		{name : "平凡之路",address:"mp3/pfzl.mp3",author:"朴树"},
		{name : "故事你真的在听吗",address:"mp3/pfzl.mp3",author:""}
	];

	var current_index = -1; //init the current player musics index
	var playingFile = null;
	var fadeOp,
		fadeIp;
	// play flags
	var playFlags = 0;
	var manual = false;

	_this.load = function(){

	}

	_this.nextMusic = function(){
	}

	_this.pausePaly = function(){
	}

	_this.errors = function(){
	}

	_this.playing = function(){
		if( manual!=true  && (media.volume <= 0.1 ||media.volume >= 1 ))
			media.volume=1;
	}
	_this.fadeOut = function(){
		var fadeOutInterval = setInterval(function(){
			if(media.volume <= 0.02){
				clearInterval(fadeOutInterval);
				media.pause();
			}else{
				media.volume-=0.1;
			}
		},300);
	}
	_this.fadeIn = function(){
		media.play();
		manual= true;
		var fadeInInterval = setInterval(function(){
			if(media.volume >= 0.95){
				clearInterval(fadeInInterval);
				manual= false;
			}else{
				media.volume+=0.05;
			}
		},260);
	}

	_this.init = function(){
		fadeOp = document.getElementById("fop"),
		fadeIp = document.getElementById("fip");
		media = document.getElementById(id);
		media_parent = media.parentNode;
		music_list_container = document.createElement("ul");
		music_list_container.className = "music_list";
		media_parent.appendChild(music_list_container);
		for(var muisc in music_file){
			var li = document.createElement("li");
			li.innerHTML = music_file[muisc].name+"\t <b style='width:220px;text-align:right;display: inline-block;'>"+ music_file[muisc].author + "</b>";
			music_list_container.appendChild(li);
		}

		media.onended=_this.nextMusic;
		media.onloadstart=_this.load;
		media.onplaying=_this.playing;
		media.onpause=_this.pausePaly;
		media.onerror=_this.errors;
		fadeOp.onclick = _this.fadeOut;
		fadeIp.onclick = _this.fadeIn;

		var initMusic=music_file[0];
		media.setAttribute("src",initMusic.address);
		media.play();
	}
}
