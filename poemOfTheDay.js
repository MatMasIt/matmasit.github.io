function getDayOfTheYear() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}
function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}


function getPoemOfTheDayIndex(npoems) {
    return getDayOfTheYear() % npoems;
}

function cleanText(text) {
    let te = "";
    let i = 0;
    let t = text.split("\\begin{Verse}").forEach(element => { // there may be multiple pages of verses
        if (i == 0) { i++; return; } // skip title
        te += element.split("\\end")[0];
    });
    te = replaceAll(te, "\\\\", "<br />");
    te = replaceAll(te, "\\", "<br />");
    return te;
}
function setPoemOfTheDay() {
    fetch('https://raw.githubusercontent.com/MatMasIt/Alembic/main/Alembic.tex')
        .then((response) => response.text())
        .then((data) => {
            let parts = data.split("\\chapter{");
            let n = getPoemOfTheDayIndex(parts.length - 1); // ignore header, data[0]
            let part = parts[n + 1];
            let title = part.split("}")[0];
            let text = cleanText(part);
            document.getElementById("poemn").innerText = n + 1;
            document.getElementById("poemTitle").innerText = title;
            document.getElementById("poemText").innerHTML = text;
        });
}