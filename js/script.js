/* Author: TEAM JARVIS

 */
var jsonObj;
var is_Playing = '0';
var resize_pane_selected = '1';
//Subscribe all divs to this function to resize
var w = $(window).width();
var rightPanelWidth = w / 2;
var leftPanelWidth = w / 2;
var json_fail = {
	'SONG' : 'null',
	'VIDEO' : 'null',
	'IMAGES' : 'null'
};

var json_success = {
	"SONG" : {
		"url" : "media/song/",
		"count" : "3",
		"songs" : [{
			"ID" : "1",
			"genre" : "Rap",
			"type" : "mp3",
			"title" : "Gold Digger",
			"album" : "Late Registration",
			"artist" : "Kanye West"
		}, {
			"ID" : "2",
			"genre" : "R&B",
			"type" : "mp3",
			"title" : "Empire State of Mind",
			"album" : "Youtube Album",
			"artist" : "Mateo"
		}, {
			"ID" : "3",
			"genre" : "Rap",
			"type" : "mp3",
			"title" : "The Fire",
			"album" : "Undun",
			"artist" : "The Roots"
		}]
	},
	"VIDEO" : {
		"url" : "media/video/",
		"count" : "1",
		"videos" : [{
			"ID" : "0",
			"type" : "webm",
			"title" : "Jay_Z_Kanye_West_Ni_as_In_Paris",
		}]
	},
	"IMAGES" : {
		"url" : "media/img/",
		"count" : "3",
		"images" : [{
			"ID" : "2",
			"type" : "jpg",
			"title" : "Avatar",
		}, {
			"ID" : "3",
			"type" : "jpg",
			"title" : "Maserati",
		}, {
			"ID" : "4",
			"type" : "jpg",
			"title" : "beach",
		}]
	}
}

// DEFAULT JSON OBJECT IN CASE OF FAILURE
var json_default = {
	'SONG' : 'default',
	'VIDEO' : 'default',
	'IMAGES' : 'default'
};

function playPause() {

	_V_("mainvideo").ready(function() {
		var myPlayer = this;

		if(is_Playing == '0' && currentState == '2') {
			myPlayer.play();
			$(".buttons_controls_play_pause").css({
				"background-image" : "url('./css/img/pause.png')"
			});
			is_Playing = '1';
		} else if(currentState == '2'){
			myPlayer.pause();
			$(".buttons_controls_play_pause").css({
				"background-image" : "url('./css/img/play.png')"
			});
			is_Playing = '0';
		}
	});
	
		if(is_Playing == '0' && currentState == '0') {
			audio = document.getElementsByTagName("audio")[0];
	 		audio.play();
			$(".buttons_controls_play_pause").css({
				"background-image" : "url('./css/img/pause.png')"
			});
			is_Playing = '1';
		} else if(currentState == '0'){
			audio = document.getElementsByTagName("audio")[0];
	 		audio.pause();
			$(".buttons_controls_play_pause").css({
				"background-image" : "url('./css/img/play.png')"
			});
			is_Playing = '0';
		}
};
/**
 * 0 - music
 * 1 - image
 * 2 - video
 */
var isGhostBarEnabled = '0';
var currentState = '0'; 
function stateMachine(div) {
	if($(div).attr("id") == "media_select_songs") { 
		currentState = '0';
		jarvis.webdb.getMedia(loadMedia, "songs");
		$(".buttons_media_music").css({
				"background-image" : "url(./css/img/music_hover.png)",
		});
		$(".buttons_media_pics").css({
				"background-image" : "url(./css/img/pics.png)",
		});
		$(".buttons_media_vids").css({
				"background-image" : "url(./css/img/video.png)",
		});
		if(isGhostBarEnabled == '0') {
			_V_("mainvideo").fadeOut(200);
			_V_("mainvideo").pause();
			$("#media_select_level3").css({
				"background-color" : "#111111",
				"visibility" : "visible"
			});

			$("#music_artist").css({
				"background-image" : "url(./css/img/artists.png)",
				"visibility" : "visible"
			});

			$("#music_album").css({
				"background-image" : "url(./css/img/albums.png)",
				"visibility" : "visible"
			});

			$("#music_genre").css({
				"background-image" : "url(./css/img/genres.png)",
				"visibility" : "visible"
			});

			$("#music_songs").css({
				"background-image" : "url(./css/img/songs.png)",
				"visibility" : "visible"
			});

			isGhostBarEnabled = '1';
			
		}
		
		$("#songs").css({
				"display" : "inherit",
				"background-image": "url('img/defualtcd.jpg');"
			});
			
			$("#videos").css({
				"display" : "none"
			});
			
			$("#pictures").css({
				"display" : "none"
			});
			
		
		
		
	} else if($(div).attr("id") == "media_select_img") {
		_V_("mainvideo").fadeOut(200);
		_V_("mainvideo").pause();
		currentState = '1';
		jarvis.webdb.getMedia(loadMedia, "images");
		$(".buttons_media_music").css({
				"background-image" : "url(./css/img/music.png)",
		});
		$(".buttons_media_pics").css({
				"background-image" : "url(./css/img/pics_hover.png)",
		});
		$(".buttons_media_vids").css({
				"background-image" : "url(./css/img/video.png)",
		});
		if(isGhostBarEnabled == '1') {
			$("#media_select_level3").css({
				"background-color" : "#111111"
			});

			$("#music_artist").css({
				"visibility" : "hidden"
			});

			$("#music_album").css({
				"visibility" : "hidden"
			});

			$("#music_genre").css({
				"visibility" : "hidden"
			});

			$("#music_songs").css({
				"visibility" : "hidden"
			});
			
			
			
			isGhostBarEnabled = '0';
			
		}
		
		$("#pictures").css({
				"display" : "inherit"
			});
			
			$("#videos").css({
				"display" : "none"
				
			});
			
			$("#songs").css({
				"display" : "none"
			});
		
		
		
	} else if($(div).attr("id") == "media_select_vids") {
		_V_("mainvideo").fadeIn(300);
		jarvis.webdb.getMedia(loadMedia, "videos");
			
			currentState = '2';
			$(".buttons_media_music").css({
				"background-image" : "url(./css/img/music.png)",
			});
			$(".buttons_media_pics").css({
				"background-image" : "url(./css/img/pics.png)",
			});
			$(".buttons_media_vids").css({
				"background-image" : "url(./css/img/video_hover.png)",
			});
		if(isGhostBarEnabled == '1') {
			$("#media_select_level3").css({
				"background-color" : "#111111"
			});

			$("#music_artist").css({
				"visibility" : "hidden"
			});

			$("#music_album").css({
				"visibility" : "hidden"
			});

			$("#music_genre").css({
				"visibility" : "hidden"
			});

			$("#music_songs").css({
				"visibility" : "hidden"
			});
			
			
			
			isGhostBarEnabled = '0';
			
		}
			$("#videos").css({
				"display" : "inherit"
			});
					
			$("#songs").css({
				"display" : "none"
			});
			
			$("#pictures").css({
				"display" : "none"
			});
	}

}

$(".buttons_media_music").mouseover(function() {
	if(currentState!='0')
	{
		$(".buttons_media_music").css({
			"background-image" : "url('./css/img/music_hover.png')"
		});
	}

}).mouseout(function() {
	if(currentState!='0')
	{
		$(".buttons_media_music").css({
			"background-image" : "url('./css/img/music.png')"
		});
	}
});

$(".buttons_media_pics").mouseover(function() {
	if(currentState!='1')
	{
		$(".buttons_media_pics").css({
			"background-image" : "url('./css/img/pics_hover.png')"
		});
	}

}).mouseout(function() {
	if(currentState!='1')
	{
		$(".buttons_media_pics").css({
			"background-image" : "url('./css/img/pics.png')"
		});
	}
});

$(".buttons_media_vids").mouseover(function() {
	if(currentState!='2')
	{
		$(".buttons_media_vids").css({
			"background-image" : "url('./css/img/video_hover.png')"
		});
	}

}).mouseout(function() {
	if(currentState!='2')
	{
		$(".buttons_media_vids").css({
			"background-image" : "url('./css/img/video.png')"
		});
	}
});

$(".music_artist").mouseover(function() {
	if(isGhostBarEnabled == '1') {
		$(".music_artist").css({
			"background-image" : "url('./css/img/artists_hover.png')",
			"background-color" : "#34b4e3"
		});
	}
}).mouseout(function() {
	if(isGhostBarEnabled == '1') {
		$(".music_artist").css({
			"background-image" : "url('./css/img/artists.png')",
			"background-color" : "#111111"
		});
	}
});



$(".music_album").mouseover(function() {
	if(isGhostBarEnabled == '1') {
		$(".music_album").css({
			"background-image" : "url('./css/img/albums_hover.png')",
			"background-color" : "#34b4e3"
		});
	}
}).mouseout(function() {
	if(isGhostBarEnabled == '1') {
		$(".music_album").css({
			"background-image" : "url('./css/img/albums.png')",
			"background-color" : "#111111"
		});
	}
});

$(".music_genre").mouseover(function() {
	if(isGhostBarEnabled == '1') {
		$(".music_genre").css({
			"background-image" : "url('./css/img/genres_hover.png')",
			"background-color" : "#34b4e3"
		});
	}
}).mouseout(function() {
	if(isGhostBarEnabled == '1') {
		$(".music_genre").css({
			"background-image" : "url('./css/img/genres.png')",
			"background-color" : "#111111"
		});
	}
});

$(".music_songs").mouseover(function() {
	if(isGhostBarEnabled == '1') {
		$(".music_songs").css({
			"background-image" : "url('./css/img/songs_hover.png')",
			"background-color" : "#34b4e3"
		});
	}
}).mouseout(function() {
	if(isGhostBarEnabled == '1') {
		$(".music_songs").css({
			"background-image" : "url('./css/img/songs.png')",
			"background-color" : "#111111"
		});
	}
});
function resizePanes(div) {
	if($(div).attr("id") == "resize_left") {
		rightPanelWidth = w / 4 * 3;
		leftPanelWidth = w / 4;
		resize_pane_selected = '0';
		$("#resize_left").css({
			"background-image" : "url('./css/img/resize_left_selected.png')"
		});
		$("#resize_reset").css({
			"background-image" : "url('./css/img/resize_reset.png')"
		});
		$("#resize_right").css({
			"background-image" : "url('./css/img/resize_right.png')"
		});

	}
	if($(div).attr("id") == "resize_reset") {
		rightPanelWidth = w / 2;
		leftPanelWidth = w / 2;
		resize_pane_selected = '1';
		$(div).css({
			"background-image" : "url('./css/img/resize_reset_selected.png')"
		});
		$("#resize_left").css({
			"background-image" : "url('./css/img/resize_left.png')"
		});
		$("#resize_right").css({
			"background-image" : "url('./css/img/resize_right.png')"
		});
	}
	if($(div).attr("id") == "resize_right") {
		rightPanelWidth = w / 4;
		leftPanelWidth = w / 4 * 3;
		resize_pane_selected = '2';
		$(div).css({
			"background-image" : "url('./css/img/resize_right_selected.png')"
		});
		$("#resize_reset").css({
			"background-image" : "url('./css/img/resize_reset.png')"
		});
		$("#resize_left").css({
			"background-image" : "url('./css/img/resize_left.png')"
		});

	}
	$('#main_rightpanel').css({
		"width" : rightPanelWidth - 10,
	});
	$('#rightpanel_bottom').css({
		"width" : rightPanelWidth
	});
	$('#rightpanel_top').css({
		"width" : rightPanelWidth,

	});
	$('#main_leftpanel').css({
		"width" : leftPanelWidth - 10
	});
	$('.mediameta').css({
		"width" : rightPanelWidth - 100
	});

	var vidHeight = (rightPanelWidth - 50) * 9 / 16;
	if(vidHeight < ($("#rightpanel_top").height())) {
		_V_("mainvideo").size(rightPanelWidth - 50, (vidHeight));
	} else {
		vidHeight = $("#rightpanel_top").height();
		_V_("mainvideo").size(vidHeight * 16 / 9, (vidHeight));
	}
}

var size_state = '0';
function resize_right() {
	w = $(window).width();
	var h = $(window).height();

	if(size_state == '0') {
		$('#main_leftpanel').css({
			"width" : w / 2 - 10,
		});

		$('#main_rightpanel').css({
			"width" : w / 2 - 10,
		});
	}
}

$(".buttons_controls_play_pause").mouseover(function() {
	if(is_Playing == '0') {
		$(".buttons_controls_play_pause").css({
			"background-image" : "url('./css/img/play_hover.png')"
		});
	} else {
		$(".buttons_controls_play_pause").css({
			"background-image" : "url('./css/img/pause_hover.png')"
		});
	}
}).mouseout(function() {
	if(is_Playing == '0') {
		$(".buttons_controls_play_pause").css({
			"background-image" : "url('./css/img/play.png')"
		});
	} else {
		$(".buttons_controls_play_pause").css({
			"background-image" : "url('./css/img/pause.png')"
		});
	}
});
function setsizes() {
	w = $(window).width();
	var h = $(window).height();

	var buffer = 15;

	if(resize_pane_selected == '0') {
		rightPanelWidth = w / 4 * 3;
		leftPanelWidth = w / 4;
	} else if(resize_pane_selected == '1') {
		rightPanelWidth = w / 2;
		leftPanelWidth = w / 2;
	} else {
		rightPanelWidth = w / 4;
		leftPanelWidth = w / 4 * 3;
	}

	if(h < 300) {
		h = 300;
	}
	if(w < 500) {
		w = 500;
	}

	$("#main").css({
		"width" : w,
	});

	$("#fullscreen").css({
		"width" : w - 2,
		"height" : h / 2
	});

	$("#container").css({
		"height" : h - 59
	});

	$('#main_leftpanel').css({
		"width" : leftPanelWidth - 10,
	});

	$('#main_rightpanel').css({
		"width" : rightPanelWidth - 10,
	});
	$("#main").css({
		"height" : h - $("footer").height() - $("header").height() - buffer
	});

	$('#rightpanel_bottom').css({
		"width" : rightPanelWidth,
	})
	$('#rightpanel_top').css({
		"width" : rightPanelWidth,
		"height" : $("#main").height() - $("#rightpanel_bottom").height() - 15
	})
	$('.mediameta').css({
		"width" : rightPanelWidth - 100
	})

	$('#container_controls').css({
		"width" : w,
	})

	$('.trackbar').css({
		"width" : w * .6 - 146,
	})

	$('.time_remaining').css({
		"left" : w * .6 + 190,
	})
	
	$('.volume').css({
		"width" : w - w * .6 - 146 - w * .2,
		"left" : w * .6 + 324,
	})

	$('.volume_icon').css({
		"left" : w * .6 + 240,
	})

	$('.fullscreen').css({
		"left" : w - 90,
	})

	var vidHeight = (rightPanelWidth - 50) * 9 / 16;
	if(vidHeight < ($("#rightpanel_top").height())) {
		_V_("mainvideo").size(rightPanelWidth - 50, (vidHeight));
	} else {
		vidHeight = $("#rightpanel_top").height();
		_V_("mainvideo").size(vidHeight * 16 / 9, (vidHeight));
	}

}


function hidestuff(boxid) {
	document.getElementById(boxid).style.visibility = "hidden";
}

function ajaxcall() {
	$.ajax({
		url : '../php/json.php',
		async : true,
		success : function(data) {
			jsonObj = json_success;
			// store the media information into localstorage
			localStorage.setItem("media", JSON.stringify(jsonObj));
		},
		error : function(data) {
			jsonObj = json_success;
		},
		type : 'GET'
	});
}

function seek() {
	if(currentState != '1')
	{
	//Get mouse X position
	var x = event.pageX;
	//Get the offset of the trackbar
	var xOffset = $(".trackbar").offset().left;
	//Set the xOffset to the offset of the actual trackbar
	xOffset = x - xOffset;
	//Create a percentage of progress on the bar
	var xPercent = xOffset / parseInt(document.getElementById('progress').style.width);
	//Sets video to the play time
	if(currentState == '2')
	{
	_V_("mainvideo").currentTime(_V_("mainvideo").duration() * xPercent);
	_V_("mainvideo").play();
	_V_("mainvideo").pause();
	_V_("mainvideo").play();
	}
	
	if(currentState == '0')
	{
		audio.currentTime = (audio.duration * xPercent);
	}
	trackBarProgress(xPercent * 100);
	}

}

function fullscreen() {
	_V_("mainvideo").requestFullScreen();
}

var isMuted = '0';
var oldVolume = '0';

function changeVolume() {
	//Get mouse X position
	var x = event.pageX;
	//Get the offset of the trackbar
	var xOffset = $(".volume").offset().left;
	//Set the xOffset to the offset of the actual trackbar
	xOffset = x - xOffset;

	//Create a percentage of progress on the bar
	var xPercent = xOffset / parseInt(document.getElementById('volumeBar').style.width);
	//Sets video to the play time
	if(currentState == '2')
	{
	_V_("mainvideo").volume(xPercent);
	}
	if(currentState == '0')
	{
		audio.volume = xPercent;
	}
	oldVolume = xPercent;
	document.getElementById('volumeBar').getElementsByTagName('p')[0].style.width = (((xPercent * 100) + '%'));
	$(".volume_icon").css({
		"background-image" : "url('./css/img/sound.png')"
	});

}

function mute() {
	if(isMuted == '0') {
		$(".volume_icon").css({
			"background-image" : "url('./css/img/muted.png')"
		});
		if(currentState == '2')
		{
		_V_("mainvideo").volume(0);
		}
		if(currentState == '0')
		{
		audio.volume = 0;
		}
		document.getElementById('volumeBar').getElementsByTagName('p')[0].style.width = ('0%');
		isMuted = '1';
	} else {
		isMuted = '0';
		$(".volume_icon").css({
			"background-image" : "url('./css/img/sound.png')"
		});
		if(currentState == '2')
		{
		_V_("mainvideo").volume(oldVolume);
		}
		if(currentState == '0')
		{
		audio.volume = oldVolume;
		}
		document.getElementById('volumeBar').getElementsByTagName('p')[0].style.width = (((oldVolume * 100) + '%'));
	}
}

function trackBarProgress(percent) {
	//Sets the trackbar to the current percentage;
	document.getElementById('progress').getElementsByTagName('p')[0].style.width = (percent);
}

var displayDuration = '1';

function displayChange(){
	if (displayDuration == '1')
	{
		displayDuration = '0';
	}
	else 
	{
		displayDuration = '1';
	}
	var appendMinus = '';
	if(displayDuration == '1')
	{
		timeDuration = _V_("mainvideo").duration();
	}
	else if(displayDuration == '0')
	{
		appendMinus = '-';
		timeDuration = _V_("mainvideo").duration()-_V_("mainvideo").currentTime();
	}
	var hoursRemaining = timeDuration / 3600;
	hoursRemaining = Math.round(hoursRemaining - .5);
	var minutesRemaining = timeDuration / 60;
	minutesRemaining = Math.round(minutesRemaining - .5);
	var secondsRemaining = timeDuration % 60;
	secondsRemaining = Math.round(secondsRemaining - .5);
	if(secondsRemaining < 10) {
		secondsRemaining = '0' + secondsRemaining;
	}
	if(minutesRemaining < 10) {
		minutesRemaining = '0' + minutesRemaining;
	}

	// $(".buttons_controls_play_pause").css({
	// "background-image" : "url('./css/img/pause.png')"
	// });
	// is_Playing = '0';
	
	document.getElementById('time_remaining_bar').innerHTML = '<FONT COLOR="FFFFFF">' + appendMinus + hoursRemaining + ':' + minutesRemaining + ':' + secondsRemaining + '</FONT>';
}
var trackBarUpdate = function() {
	if(currentState != '1')
	{
	var percent = '0%';
	if(_V_("mainvideo").duration() > 0 && currentState == '2') {
		percent = _V_("mainvideo").currentTime() / _V_("mainvideo").duration() * 100 + '%';
	}
	if(currentState == '0')
	{
		percent = audio.currentTime/audio.duration * 100 + '%';
	}
	trackBarProgress(percent);
	var currentTime;
	var duration;
	if(currentState == '2')
	{
		currentTime =_V_("mainvideo").currentTime();
		duration = _V_("mainvideo").duration();
	}
	if(currentState == '0')
	{
		currentTime = audio.currentTime;
		duration = audio.duration;
	}
	var timeInSec = currentTime;
	var hours = currentTime/ 3600;
	hours = Math.round(hours - .5);
	var minutes = currentTime / 60;
	minutes = Math.round(minutes - .5);
	var seconds = currentTime % 60;
	seconds = Math.round(seconds - .5);
	if(seconds < 10) {
		seconds = '0' + seconds;
	}
	if(minutes < 10) {
		minutes = '0' + minutes;
	}
	
	var appendMinus = '';
	if(displayDuration == '1')
	{
		timeDuration = duration;
	}
	else if(displayDuration == '0')
	{
		appendMinus = '-';
		timeDuration = duration-currentTime;
	}
	var hoursRemaining = timeDuration / 3600;
	hoursRemaining = Math.round(hoursRemaining - .5);
	var minutesRemaining = timeDuration / 60;
	minutesRemaining = Math.round(minutesRemaining - .5);
	var secondsRemaining = timeDuration % 60;
	secondsRemaining = Math.round(secondsRemaining - .5);
	if(secondsRemaining < 10) {
		secondsRemaining = '0' + secondsRemaining;
	}
	if(minutesRemaining < 10) {
		minutesRemaining = '0' + minutesRemaining;
	}

	// $(".buttons_controls_play_pause").css({
	// "background-image" : "url('./css/img/pause.png')"
	// });
	// is_Playing = '0';
	
	document.getElementById('time_remaining_bar').innerHTML = '<FONT COLOR="FFFFFF">' + appendMinus + hoursRemaining + ':' + minutesRemaining + ':' + secondsRemaining + '</FONT>';
	

	document.getElementById('play_time_bar').innerHTML = '<FONT COLOR="FFFFFF">' + hours + ':' + minutes + ':' + seconds + '</FONT>';
	}
};


var paused = function(){
		$(".buttons_controls_play_pause").css({
			"background-image" : "url('./css/img/play.png')"
	});
	is_Playing = '0';
}

var playing = function(){
		$(".buttons_controls_play_pause").css({
			"background-image" : "url('./css/img/pause.png')"
		});
		is_Playing = '1';
}
_V_("mainvideo").addEvent("timeupdate", trackBarUpdate);
_V_("mainvideo").addEvent("pause", paused);
_V_("mainvideo").addEvent("play", playing);
var audio = document.getElementById("mainsong");
audio.addEventListener("timeupdate", trackBarUpdate);

/**
 * Populates the right window with the selected media. 
 * Combines path with file name
 * @param type : music, image, video
 * @param path : path for media
 */
function pathCreater(type,filename, path){
	var completePath = path + filename;
	
	if (type == "music"){
		document.getElementById("mainsong").src = completePath;
	}
	else if (type == "image"){
		document.getElementById("mainimg").src = completePath;
	}
	else if (type == "video"){
		document.getElementById("mainvideo_html5_api").src = completePath;
	}
}

/**
 * Onclick listener for list items
 * @param type : music, image, video
 * @param filename : name of file with extension ("hello.mp3")
 * @param path : path for media
 */
function listItemHandler(type, filename, path){
	pathCreater(type, filename, path);
	playPause();
}


function init() {
	jsonObj = json_success;
	setsizes();
	localStorage.setItem("media", JSON.stringify(json_default));
	//	ajaxcall();
	hidestuff("whiteout");
	var jo = jsonObj;
	dbinit();
}


$(window).resize(function() {
	setsizes();
});

/*Library above********************************************************************************************/
/**********************************************************************************************************/
$(document).ready(function() {
	init();
	// Spacebar eventlistener
	$(document).keyup(function(event) {
		if(event.keyCode == 32) {
			// alert('Handler for .keyup() called.');
			playPause();
		} else if(event.keyCode == 77) {
			// alert('Handler for .keyup() called.');
			mute();
		} else if(event.keyCode == 37) {
			//prev
		} else if(event.keyCode == 39) {
			//next
		} else if(event.keyCode == 38) {
			//vol up
			if(_V_("mainvideo").volume() == 1.0) {

			} else {(_V_("mainvideo").volume(_V_("mainvideo").volume() + .1))
				document.getElementById('volumeBar').getElementsByTagName('p')[0].style.width = (((_V_("mainvideo").volume() * 100) + '%'));
			}
		} else if(event.keyCode == 40) {
			//vol down
			if(_V_("mainvideo").volume() == 0.0) {

			} else {(_V_("mainvideo").volume(_V_("mainvideo").volume() - .1))
				document.getElementById('volumeBar').getElementsByTagName('p')[0].style.width = (((_V_("mainvideo").volume() * 100) + '%'));
			}
		} else if(event.keyCode == 72) {
			alert('Space: Play/Pause \nF: Enter Fullscreen \nM: Mute \nLeft: Previous \nRight: Next \nUp: Volume Up \nDown: Volume Down \nH: This Dialog');
		} else if(event.keyCode == 70) {
			fullscreen();
		}

	});

	_V_("mainvideo").volume(1.0);
	oldVolume = 1.0;

});
