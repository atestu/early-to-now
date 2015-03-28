(function () {
var tracks = [],
	oldTracks = [],
	player = {},
	index = 0,
	currentTrack = {},
	wikiFrame = document.createElement('iframe');

wikiFrame.style.width  = '300px';
// wikiFrame.style.height = '100%';
// wikiFrame.style.position = 'absolute';
// wikiFrame.style.top = '0';
// wikiFrame.style.right = '0';
wikiFrame.style.border = '0';
wikiFrame.style.borderLeft = '1px solid gray';

Tabletop.init({
	key: "0Al7Z6rO-s3uVdGJSbnpRNk9NVmg3alJaNXpwSjQ5UFE",
	callback: function(data, tabletop) {
		tracks = _.shuffle(data);
		// 2. This code loads the IFrame Player API code asynchronously.
		var tag = document.createElement('script');

		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		document.getElementById('wikipedia').appendChild(wikiFrame);
	},
	simpleSheet: true
});
Tabletop.init({
	key: "0Al7Z6rO-s3uVdE1RTjVUTzAzdW1aYldqbzJvRUtmRXc",
	callback: function(data, tabletop) {
		var photos = _.shuffle(data),
			photo = photos[0]
		$('body').css('background-image', 'url('+photo.url+')');
		$('#photo_credit').attr('href', photo.crediturl).text(photo.credit);
	},
	simpleSheet: true
});

function getRandomTrack () {
	return currentTrack = (index == tracks.length ? tracks[index = 0] : tracks[index++])
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
window.onYouTubeIframeAPIReady = function () {
	player = new YT.Player('player', {
		height: '0',
		width: '0',
		videoId: getRandomTrack().idyoutube,
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
	wikiFrame.setAttribute('src', currentTrack.urlwikipedia.replace('en.', 'en.m.'));
	$('#song_title').text(currentTrack.titre);
}

function changeTrack () {
	player.cueVideoById(getRandomTrack().idyoutube).playVideo();
	wikiFrame.setAttribute('src', currentTrack.urlwikipedia.replace('en.', 'en.m.'));
	$('#song_title').text(currentTrack.titre);
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady (event) {
	event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
function onPlayerStateChange (event) {
	// player.pauseVideo();
	if (event.data == YT.PlayerState.ENDED)
		changeTrack();
}

function toggleWikipedia () {
	$('#wikipedia_wrapper').animate({
		'margin-right': $('#wikipedia_wrapper').css('margin-right') == '0px' ? '-=300' : 0
	});
}
$('#info').on('click', toggleWikipedia);
$('#random').on('click', changeTrack);

function resizeWikiFrame () {
	wikiFrame.style.height = (window.innerHeight-1)+'px';
}
resizeWikiFrame();
window.onresize = resizeWikiFrame;

$('#pause').on('click', function () {
	if ($(this).hasClass('fa-pause')) {
		player.pauseVideo();
		$(this).removeClass('fa-pause');
		$(this).addClass('fa-play');
	}
	else {
		player.playVideo();
		$(this).removeClass('fa-play');
		$(this).addClass('fa-pause');
	}
})

})();