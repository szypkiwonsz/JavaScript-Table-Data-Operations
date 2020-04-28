let sortDirection = false;
let activeFirstFilter = false;
let myData = [];
let clicked = false;
$.getJSON("data.json", function (data) {
    myData = data;
});

window.onload = () => {
    loadTableData(myData);
};

function filterColumn(columnName, value) {
    if (clicked === false) {
        if (value === 1000000) {
            document.getElementById('firstFilter').setAttribute("class", "filter1");
            document.getElementById('population').setAttribute("class", "filter1");
        } else if (value === 2500000) {
            document.getElementById('secondFilter').setAttribute("class", "filter2");
            document.getElementById('population').setAttribute("class", "filter2");
        } else {
            document.getElementById('thirdFilter').setAttribute("class", "filter3");
        }
        clicked = true;
    } else {
        document.getElementById('firstFilter').setAttribute("class", "xd");
        document.getElementById('secondFilter').setAttribute("class", "xd");
        document.getElementById('thirdFilter').setAttribute("class", "xd");
        clicked = false;
    }


    for (let i = 0; i < myData.length; i++) {
        while (myData[i][columnName] < value) {
            myData.splice(i, 1);
            loadTableData(myData);
        }
    }

}

function reset() {
    $.getJSON("data.json", function (data) {
        myData = data;
        loadTableData(myData)
    });
}

function loadTableData(myData) {
    let elements = 0;
    let sumArea = 0;
    let sumPopulation = 0;
    let sumDenisty = 0;
    const tableBody = document.getElementById('tableData');
    let dataHTML = '';
    for (let element of myData) {
        dataHTML += `<tr><td>${element.id}</td><td>${element.voivodeship}</td><td>${element.area}</
                td><td>${element.population}</td><td>${element.population_density}</td></tr>`;
        elements += 1;
        sumArea += element.area;
        sumPopulation += element.population;
        sumDenisty += element.population_density;
    }

    console.log(sumArea);

    tableBody.innerHTML = dataHTML;

    const tableFooter = document.getElementById('tableFooter');
    let dataFooter = '';
    dataFooter += `<tr><td>Suma</td><td></td><td>${sumArea}</td><td id="population">${sumPopulation}</td><td>${sumDenisty}</td>`;
    dataFooter += `<tr><td>Średnia</td><td></td><td>${(sumArea / elements).toFixed(2)}</td><td id="population">${(sumPopulation / elements).toFixed(2)}</td><td>${(sumDenisty / elements).toFixed(2)}</td>`;
    tableFooter.innerHTML = dataFooter;

}

function sortColumn(columnName) {
    const dataType = typeof myData[0][columnName];
    sortDirection = !sortDirection;

    switch (dataType) {
        case 'number':
            sortNumberColumn(sortDirection, columnName);
            break;
    }
    loadTableData(myData);
}

function sortNumberColumn(sort, columnName) {
    myData = myData.sort((p1, p2) => {
        return sort ? p1[columnName] - p2[columnName] : p2[columnName] - p1[columnName]
    });
}