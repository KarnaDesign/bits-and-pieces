/**
 * A function that makes an ajax request to a given url.
 * @param {string} url 
 * @param {function} onReadyFunction A function that gets called when the ajax request finishes.
 * @param {function} onErrorFunction A function that gets called when the ajax request fails.
 */
function ajaxCall(url, onReadyFunction, onErrorFunction) {
    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === httpRequest.DONE) {
            if (httpRequest.status === 200) {
                onReadyFunction(httpRequest.responseText);
            } else {
                onErrorFunction();
            }
        }
    }
    httpRequest.open("GET", url);
    httpRequest.send();
}

function populateHeader(info) {
    document.querySelector("h1").innerText = info.organisation;
    document.querySelector("#numberOfEmployees").innerText = info.numberOfEmployees;
}

function onSuccess(result) {
    var companyInfo = JSON.parse(result);
    populateHeader(companyInfo);

    var employeeTable = document.querySelector(".employeeList table tbody");
    companyInfo.employees.forEach((employee) => {
        var tr = document.createElement("tr");
        var tdName = document.createElement("td");
        tdName.innerText = employee.name;
        tr.appendChild(tdName);

        var tdAge = document.createElement("td");
        tdAge.innerText = employee.age;
        tr.appendChild(tdAge);

        var tdEmployeeNumber = document.createElement("td");
        tdEmployeeNumber.innerText = employee.employeeNumber;
        tr.appendChild(tdEmployeeNumber);

        var tdIsManagement = document.createElement("td");
        tdIsManagement.innerText = employee.isManagement ? "yes" : "";
        tr.appendChild(tdIsManagement);

        employeeTable.appendChild(tr);

    })
}



ajaxCall(
    "/companyInfo.json",
    onSuccess,
    () => {
        console.error("Something went terribly wrong.");
    });