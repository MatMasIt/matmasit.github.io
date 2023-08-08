function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function toIsoString(date) {
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function (num) {
            return (num < 10 ? '0' : '') + num;
        };

    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' + pad(Math.abs(tzo) % 60);
}

var living = document.getElementById("living");

function beat() {
    var dt = new Date();
    var birth = new Date('2002-11-19 22:15:00'); // or if you have milliseconds, use that instead
    var z = new Date(dt - birth);
    var epoch = new Date('1970-01-01 00:00:00');
    var diff_years = z.getYear() - epoch.getYear();
    var diff_month = z.getMonth() - epoch.getMonth();
    var diff_days = z.getDate() - epoch.getDate();
    var diff_hours = z.getHours() - epoch.getHours();
    var diff_minutes = z.getMinutes() - epoch.getMinutes();
    var diff_seconds = z.getSeconds() - epoch.getSeconds();
    living.innerHTML = "2002-11-19T22:15:00+01:00 - " + toIsoString(dt) + " <br /> " + diff_years + " y, " + diff_month + " m, " + diff_days + " d, " + pad(diff_hours, 2) + ":" + pad(diff_minutes, 2) + ":" + pad(diff_seconds, 2);
}
beat();



function specialDates() {
    let portrait = document.getElementById("portrait");
    let portraitLink = document.getElementById("portraitLink");
    let body = document.body;
    let date = new Date();
    // reset all    
    body.classList.remove("bodyEuDay");
    body.classList.remove("bodyRepublicDay");
    body.classList.remove("bodyXMAS");
    body.classList.remove("bodyNATODay");
    body.classList.remove("greyFilter");
    document.querySelectorAll(".happyEuDay").forEach(function (el) {
        el.style.display = "none";
    });
    document.querySelectorAll(".happyRepublicDay").forEach(function (el) {
        el.style.display = "none";
    });
    document.querySelectorAll(".happyNATODay").forEach(function (el) {
        el.style.display = "none";
    });
    document.querySelectorAll(".happyXMAS").forEach(function (el) {
        el.style.display = "none";
    });
    portrait.src = "images/portrait.jpg";
    portraitLink.href = "images/portrait.jpg";
    /*
     getDate is day of month, usual bad library design
     also date.getMonth starts from 0, one of the dumbest zero-indexings
     I have ever seen

     These two things together took me 1 hour to figure out
     */
    document.getElementById("euS").style.display = "none";
    document.getElementById("redS").style.display = "none";
    document.getElementById("xmaS").style.display = "none";
    document.getElementById("natoS").style.display = "none";
    document.getElementById("janS").style.display = "none";
    document.getElementById("regularS").style.display = "none";
    let force = null;
    if (location.hash.indexOf("force:") != -1) {
        let exp = location.hash.split(":");
        if (exp.length == 2) force = location.hash.split(":")[1];
        if (force == "no") force = null;
    }
    if ((force == null && date.getMonth() + 1 == 5 && date.getDate() == 9) || force == "eu") {
        document.getElementById("euS").style.display = "inline";
        body.classList.add("bodyEuDay");
        portrait.src = "images/euportrait.png";
        portraitLink.href = "images/euportrait.png";
        document.querySelectorAll(".happyEuDay").forEach(function (el) {
            el.style.display = "block";
        });
        baseColorClass = "goldColor";
        selectedColorClass = "darkGoldColor";
    }
    else if ((force == null && date.getMonth() + 1 == 6 && date.getDate() == 2) || force == "it") {
        document.getElementById("redS").style.display = "inline";
        body.classList.add("bodyRepublicDay");
        portrait.src = "images/itportrait.png";
        portraitLink.href = "images/itportrait.png";
        document.querySelectorAll(".happyRepublicDay").forEach(function (el) {
            el.style.display = "block";
        });
        baseColorClass = "baseColor";
        selectedColorClass = "greenColor";
    }
    else if ((force == null && date.getMonth() + 1 == 4 && date.getDate() == 4) || force == "nato") {
        document.getElementById("natoS").style.display = "inline";
        body.classList.add("bodyNATODay");
        portrait.src = "images/natoportrait.png";
        portraitLink.href = "images/natoportrait.png";
        document.querySelectorAll(".happyNATODay").forEach(function (el) {
            el.style.display = "block";
        });
        baseColorClass = "baseColor";
        selectedColorClass = "blueColor";
    }
    else if ((force == null && date.getMonth() + 1 == 12 && date.getDate() > 18 && date.getDate() < 27) || force == "xmas") {
        document.getElementById("xmaS").style.display = "inline";
        body.classList.add("bodyXMAS");
        portrait.src = "images/xmasportrait.png";
        portraitLink.href = "images/xmasportrait.png";
        document.querySelectorAll(".happyXMAS").forEach(function (el) {
            el.style.display = "block";
        });
        baseColorClass = "baseColor";
        selectedColorClass = "redColor";
    }
    else if ((force == null && date.getMonth() + 1 == 1) || force == "jan") { // grey january

        document.getElementById("janS").style.display = "inline";
        body.classList.add("greyFilter");
    }
    else {
        document.getElementById("regularS").style.display = "inline";
        baseColorClass = "baseColor";
        selectedColorClass = "redColor";
    }
    playIcons.forEach(function (el) {
        if (!isPlaying(musicPlayer) || playingItem != el.attributes["data-play"].textContent) {
            el.src = playIcon;
            setResting(el);
        }
        else{
            el.src = stopIcon;
            setSelected(el);
        }
    });
    if (playing) {setSelected(pronounceImage); }
    else {setResting(pronounceImage); setResting(mattiaText); setResting(mascarelloText); }
}


var mattiaText = document.getElementById("mattia");
var mascarelloText = document.getElementById("mascarello");

let mattia = new Audio("audio/mattia.ogg");
let mascarello = new Audio("audio/mascarello.ogg");

let pronounceLink = document.getElementById("pronounce");
let pronounceImage = document.querySelector("#pronounce>img");

let playing = false;

try {
    // disable media controls here
    navigator.mediaSession.setActionHandler('play', function () { /* Code excerpted. */ });
    navigator.mediaSession.setActionHandler('pause', function () { /* Code excerpted. */ });
    navigator.mediaSession.setActionHandler('seekbackward', function () { /* Code excerpted. */ });
    navigator.mediaSession.setActionHandler('seekforward', function () { /* Code excerpted. */ });
    navigator.mediaSession.setActionHandler('previoustrack', function () { /* Code excerpted. */ });
    navigator.mediaSession.setActionHandler('nexttrack', function () { /* Code excerpted. */ });
} catch (e) { }

pronounceImage.addEventListener("mouseenter", function () {
    if (playing || isPlaying(musicPlayer)) return;
    setSelected(pronounceImage);
});

pronounceImage.addEventListener("mouseleave", function () {
    if (playing || isPlaying(musicPlayer)) return;
    setResting(pronounceImage);
});



mascarello.onended = function () {
    playing = false;
    setResting(pronounceImage);
    setTimeout(function () {
        setResting(mascarelloText)
    }, 500);
};

mattia.onended = function () {
    setTimeout(function () {
        setSelected(mascarelloText)
        setResting(mattiaText);
        mascarello.play();
    }, 1000);
};
pronounceLink.addEventListener("click", function () {
    if (playing || isPlaying(musicPlayer)) return;
    setSelected(pronounceImage);
    mattia.currentTime = 0;
    mascarello.currentTime = 0;
    playing = true;
    setSelected(mattiaText);
    mattia.play();
});


var musicPlayer = new Audio();
var playingItem = "";

let audioMap = {
    nato: "audio/nato.mp3",
    eu: "audio/eu.ogg",
    it: "audio/ita.mp3"
};


var playIcon = "icons/play.svg";
var stopIcon = "icons/stop.svg";
var baseColorClass = "baseColor";
var selectedColorClass = "redColor";

function clearColor(target) {
    target.classList.forEach(function (el) {
        if (el.endsWith("Color")) {
            target.classList.remove(el);
        }
    });
}

function setSelected(target) {
    clearColor(target);
    target.classList.add(selectedColorClass);
}


function setResting(target) {
    clearColor(target);
    target.classList.add(baseColorClass);
}

var playIcons = [];
document.querySelectorAll(".playIcon").forEach(function (el) {
    el.src = playIcon;
    playIcons.push(el);
    el.addEventListener("mouseenter", function (e) {
        if (isPlaying(musicPlayer) && playingItem == e.target.attributes["data-play"].textContent) {
            e.target.src = stopIcon;
        }
        else {
            e.target.src = playIcon;
        }
        setSelected(e.target);
    });
    el.addEventListener("mouseleave", function (e) {
        if (isPlaying(musicPlayer) && playingItem == e.target.attributes["data-play"].textContent) {
            e.target.src = stopIcon;
        }
        else {
            e.target.src = playIcon;
        }
        setResting(e.target);
    });
    el.parentElement.addEventListener("click", function (e) {
        if (isPlaying(musicPlayer) && playingItem == e.target.attributes["data-play"].textContent) {
            // stop 
            musicPlayer.pause();
            e.target.src = playIcon;
            e.target.alt = "Start Playing";
            musicPlayer.playing = false;
            musicPlayer.currentTime = 0;

        }
        else {
            // set all the other icons to play when we start this one
            playIcons.forEach(function (e) {
                e.src = playIcon;
                e.alt = "Start Playing";
            });
            let tag = e.target.attributes["data-play"].textContent;
            playingItem = tag;
            musicPlayer.src = audioMap[tag];
            e.target.src = stopIcon;
            e.target.alt = "Stop Playing";
            musicPlayer.currentTime = 0;
            musicPlayer.play();
        }
    });
});
musicPlayer.onended = function () {
    playIcons.forEach(function (e) {
        e.src = playIcon;
        e.alt = "Start Playing";
    });
};
function isPlaying(myAudio) {
    return !myAudio.paused && myAudio.currentTime > 0 && !myAudio.ended;
}

specialDates();
setPoemOfTheDay();

setInterval(function () {
    beat();
}, 1000);



setInterval(function () {
    specialDates();
    setPoemOfTheDay();
}, 5 * 60 * 1000);

addEventListener("hashchange", (event) => {
    specialDates();
});