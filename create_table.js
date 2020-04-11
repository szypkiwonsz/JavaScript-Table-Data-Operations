let sortDirection = false;
let myData = [];
$.getJSON("data.json", function (data) {
    myData = data;
});

window.onload = () => {
    loadTableData(myData);
};

function filterColumn(columnName, value) {
    for (let i = 0; i < myData.length; i++) {
        while (myData[i][columnName] < value) {

            myData.splice(i, 1);
            loadTableData(myData);
        }
    }
}

function reset(){
    $.getJSON("data.json", function (data) {
        myData = data;
        loadTableData(myData)
    });
}

function loadTableData(myData) {
    const tableBody = document.getElementById('tableData');
    let dataHTML = '';
    for (let element of myData) {
        dataHTML += `<tr><td>${element.id}</td><td>${element.voivodeship}</td><td>${element.area}</
                td><td>${element.population}</td><td>${element.population_density}</td></tr>`;
    }

    tableBody.innerHTML = dataHTML;
}

function sortColumn(columnName) {
    const dataType = typeof myData[0][columnName];
    sortDirection = !sortDirection;

    switch(dataType){
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