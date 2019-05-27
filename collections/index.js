function ajaxCall(url, onReadyFunction) {
    var httpRequest = new XMLHttpRequest;

    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === httpRequest.DONE) {
            if (httpRequest.status === 200) {
                onReadyFunction(httpRequest.responseText);
            }
        }
    }

    httpRequest.open("GET", url);
    httpRequest.send();
}

function getDecades() {
    var nodeList = document.querySelectorAll(".selectionArea .selected"); //Gets a collection which is not an array.
    var selectedButtons = [...nodeList]; //Copy the nodeList content to an array.
    var decades = selectedButtons.map((selectedButton) => {
        return parseInt(selectedButton.innerText);
    })
    return decades;
}

// Loops through albums and returns matches from selected decades.
function getFilteredAlbums(albums, decades) {
    var filteredAlbums = albums.filter((album) => {
        var isMatch = decades.find((decade) => {
            if (album.year >= decade && album.year < (decade + 10)) {
                return true;
            } else {
                return false;
            }
        })
        return isMatch;
    })
    return filteredAlbums;
}

function createTable(filteredAlbums) {
    var searchResultTable = document.querySelector(".resultArea table tbody");
    searchResultTable.innerHTML = ""; // Clear all content from the table.
    filteredAlbums.forEach((filteredAlbum) => {
        var tr = document.createElement("tr");
        var tdTitle = document.createElement("td");
        tdTitle.innerText = filteredAlbum.title;
        tr.appendChild(tdTitle);

        var tdArtist = document.createElement("td");
        tdArtist.innerText = filteredAlbum.artist;
        tr.appendChild(tdArtist);

        var tdYear = document.createElement("td");
        tdYear.innerText = filteredAlbum.year;
        tr.appendChild(tdYear);

        searchResultTable.appendChild(tr);
    })
}

function onSuccess(result) {
    var albums = JSON.parse(result);
    var decades = getDecades();
    var filteredAlbums = getFilteredAlbums(albums, decades);
    createTable(filteredAlbums);
}

function onButtonClick(e) {
    e.target.classList.toggle("selected"); //If not class selected add class selected and vice versa.
    ajaxCall("/data.json", onSuccess);
}

function bindSelectionButtons() {
    var buttons = document.querySelectorAll(".selectionArea button");
    buttons.forEach((button) => {
        button.addEventListener("click", onButtonClick);
    })
}
bindSelectionButtons();