function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function toIsoString(date) {
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
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
setInterval(function() {
    beat();
}, 1000);
