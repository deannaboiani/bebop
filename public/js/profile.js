const artistName = document.querySelector("#artist-search");
const addBtn = document.querySelector("#button-addon2");

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const name = artistName.value;

    if(name == null || name === "") {
        return;
    }

    const fetchObj = {
        name: name
    };

    fetch("/artists/search", {
        method: "POST",
        body: JSON.stringify(fetchObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if(res.ok) {
            location.href="/login"
        } else {
            alert("Failed to search artist, try again!")
        }
    });

    fetch("/artists/shows", {
        method: "POST",
        body: JSON.stringify(fetchObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if(res.ok) {
            location.href="/login"
        } else {
            alert("Failed to search events, try again!")
        }
    });
});

// TODO: if the user input in addArtist does not match database, alert "try another artist!" or something.

// TODO: when user tries to add more than 6 artists, alert "max artists reached!".