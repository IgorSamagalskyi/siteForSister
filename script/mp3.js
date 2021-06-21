function _(query) {
    return document.querySelector(query);
}

function _all(query) {
    return document.querySelectorAll(query);
}

let songList = [
    {
        audio: "vittoria vittoria.mp3",
        songname: "1. Vittoria vittoria",
        artistname: "G. Carissimi"
    },
    {
        audio: "lascia ch'io pianga.mp3",
        songname: "2. Lascia ch'io pianga",
        artistname: "--------------------"
    },
    {
        audio: "m  ha preso alla sua ragna.mp3",
        songname: "5. M  ha preso alla sua ragna",
        artistname: "P. D. Paradies"
    },
    {
        audio: "spesso vibra.mp3",
        songname: "7. Spesso vibra per suo gioco",
        artistname: "A . Scarlatti"
    },    {
        audio: "nel_cor.mp3",
        songname: "8. Nel cor più non mi sento",
        artistname: "G. Paisiello"
    },
    // {
    //     audio: "chi vuole innamorarsi.mp3",
    //     songname: "3. Chi vuole innamorarsi",
    //     artistname: "Silent Partner"
    // },
    {
        audio: "cangia_cangia_tue_voglie.mp3",
        songname: "10. Cangia, cangia tue voglie",
        artistname: "G. B. Fasolo"
    },

    // {
    //     audio: "pur dicesti o bocca bella.mp3",
    //     songname: "7. Pur dicesti o bocca bella",
    //     artistname: "Silent Partner"
    // },
    // {
    //     audio: "Se Florindo e fedele.mp3",
    //     songname: "8. Se Florindo e fedele",
    //     artistname: "Silent Partner"
    // },
    // {
    //     audio: "sebben crudele.mp3",
    //     songname: "9. Sebben crudele",
    //     artistname: "Silent Partner"
    // },
    // {
    //     audio: "son tutta duolo.mp3",
    //     songname: "10. Son tutta duolo",
    //     artistname: "Silent Partner"
    // },

    {
        audio: "tre giorni son che Nina.mp3",
        songname: "15. Tre giorni son che Nina",
        artistname: "G. B. Pergolesi"
    },
    {
        audio: "alma_del_core.mp3",
        songname: "16. Alma del core",
        artistname: "A. Caldara"
    }


];
let audioMetaTag = document.querySelector('.metaToggle');
let playPause = document.querySelector('.player');
let metaData = "none";
audioMetaTag.innerHTML = `<audio preload="${metaData}"></audio>`

let currentSongIndex = 0;

let main = {
    audio: _(".player .main audio"),
    seekbar: _(".player .main input"),
    songname: _(".player .main .details h3"),
    artistname: _(".player .main .details p"),
    prevControl: _(".player .main .controls .prev-control"),
    playPauseControl: _(".player .main .controls .play-pause-control"),
    nextControl: _(".player .main .controls .next-control")
}

_(".player .player-list .list").innerHTML = (songList.map(function (song, songIndex) {
    return `
	
			<div class="item" songIndex="${songIndex}">
			<div class="details">
				<h3>${song.songname}</h3>
				<p>${song.artistname}</p>
			</div>
		</div>

`;
}).join(""));

_(".player .player-list .list").innerHTML = (songList.map(function (song, songIndex) {
    return `
	
			<div class="item" songIndex="${songIndex}">
			<div class="details">
				<h3>${song.songname}</h3>
				<p>${song.artistname}</p>
			</div>
		</div>

`;
}).join(""));

let songListItems = _all(".player .player-list .list .item");
for (let i = 0; i < songListItems.length; i++) {
    songListItems[i].addEventListener("click", function () {
        currentSongIndex = parseInt(songListItems[i].getAttribute("songIndex"));
        loadSong(currentSongIndex);
    });
}

async function playAudio() {
    try {
        let playPromise =  await main.audio.play();
        if (playPromise !== undefined) {
            main.audio.play();
        }
    }catch (err) {
            // logMyErrors(err, "шось пішло не так");
    }
}

function loadSong(songIndex) {
    let song = songList[songIndex];
    main.songname.innerText = song.songname;
    // main.artistname.innerText = song.artistname;
    main.audio.setAttribute("src", "./mp3/" + song.audio);
    main.seekbar.setAttribute("value", 0);
    main.seekbar.setAttribute("min", 0);
    main.seekbar.setAttribute("max", 0);
    main.audio.addEventListener("canplay", function () {
        playAudio();
        if (!main.audio.paused) {
            main.playPauseControl.classList.remove("paused");
        }
        main.seekbar.setAttribute("max", parseInt(main.audio.duration));
        main.audio.onended = function () {
            main.nextControl.click();
        }
    })
}

setInterval(function () {
    main.seekbar.value = parseInt(main.audio.currentTime);
}, 1000);

main.prevControl.addEventListener("click", function () {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songList.length + currentSongIndex;
    }
    loadSong(currentSongIndex);
});
main.nextControl.addEventListener("click", function () {
    currentSongIndex = (currentSongIndex + 1) % songList.length;
    loadSong(currentSongIndex);
});

playPause.addEventListener("click", function () {
    metaData = "metadata";
    audioMetaTag.innerHTML = `<audio preload="${metaData}"></audio>`
    if (metaData === "metadata") {
        if (main.audio.paused) {
            main.playPauseControl.classList.remove("paused");
            playAudio();
        } else {
            main.playPauseControl.classList.add("paused");
            main.audio.pause();
        }
    }
});
main.seekbar.addEventListener("change", function () {
    main.audio.currentTime = main.seekbar.value;
});
loadSong(currentSongIndex);


