let myBooks = [];
$.getJSON( "data.json", function(data){
    myBooks = data;
});

function CreateTableFromJSON() {
    // Wyciąga dane dla nagłówka tabeli HTML.
    let col = [];
    for (let i = 0; i < myBooks.length; i++) {
        for (let key in myBooks[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // Tworzy dynamiczną tabelę.
    let table = document.createElement("table");

    // Tworzy wiersz nagłówka tabeli HTML używając wyciągniętych powyżej nagłówków.
    let tr = table.insertRow(-1);               // Wiersz tabeli.
    for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th");  // Nagłówek tabeli.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // Dodaje dane json'owe do tabeli jako wiersze.
    for (let i = 0; i < myBooks.length; i++) {
        tr = table.insertRow(-1);
        for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myBooks[i][col[j]];
        }
    }

    // Ostatecznie dodaje nowo stworzoną tabele z danymi json'owymi do kontenera.
    let divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}