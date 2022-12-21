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


var canvas = document.getElementById('mattiafoto'),
    context = canvas.getContext('2d');

function drawCanvas() {

    let moretta = new Image();
    moretta.src = ' http://www.parrocchie.it/alba/moretta/CORSOLANGHE/FOTO.jpg';
    moretta.onload = function () {
        context.drawImage(moretta, -40, -30, 800, 450);
        base_image = new Image();
        base_image.src = 'images/portraittransparent.png';
        base_image.onload = function () {
            context.drawImage(base_image, 0, 0);
        }
    }

}


function specialDates() {
    let portrait = document.getElementById("portrait");
    let portraitLink = document.getElementById("portraitLink");
    let canvas = document.getElementById("mattiafoto");
    let body = document.body;
    let date = new Date();
    // reset all    
    canvas.style.display = "none";
    portrait.style.display = "block";
    body.classList.remove("bodyEuDay");
    body.classList.remove("bodyRepublicDay");
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
    if (date.getMonth() + 1 == 5 && date.getDate() == 9) {
        body.classList.add("bodyEuDay");
        portrait.src = "images/euportrait.png";
        portraitLink.href = "images/euportrait.png";
        document.querySelectorAll(".happyEuDay").forEach(function (el) {
            el.style.display = "block";
        });


    }
    else if (date.getMonth() + 1 == 6 && date.getDate() == 2) {
        body.classList.add("bodyRepublicDay");
        portrait.src = "images/itportrait.png";
        portraitLink.href = "images/itportrait.png";
        document.querySelectorAll(".happyRepublicDay").forEach(function (el) {
            el.style.display = "block";
        });
    }
    else if (date.getMonth() + 1 == 4 && date.getDate() == 4) {
        body.classList.add("bodyNATODay");
        portrait.src = "images/natoportrait.png";
        portraitLink.href = "images/natoportrait.png";
        document.querySelectorAll(".happyNATODay").forEach(function (el) {
            el.style.display = "block";
        });
    }
    else if (date.getMonth() + 1 == 12 && date.getDate() > 18 && date.getDate() < 27 ) {
        body.classList.add("bodyXMAS");
        portrait.src = "images/xmasportrait.png";
        portraitLink.href = "images/xmasportrait.png";
        document.querySelectorAll(".happyXMAS").forEach(function (el) {
            el.style.display = "block";
        });
    }
    else if (date.getDay() === 6 || date.getDay() === 0) {
        canvas.style.display = "block";
        portrait.style.display = "none";
        drawCanvas();
    }
}




specialDates();
setPoemOfTheDay();

setInterval(function () {
    beat();
}, 1000);

setInterval(function () {
    specialDates();
    setPoemOfTheDay()
}, 5 * 60 * 1000);

