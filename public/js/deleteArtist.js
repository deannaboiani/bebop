document.querySelector("#remove-icon").addEventListener("click", (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    console.log("button works");
    const artistID = document.getElementById("delete-artist").value;
    console.log(artistID);
    fetch(`/api/artists/${artistID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        if (res.ok) {
            document.location.reload(true)
        } else {
            alert("Artist wasn't deleted");
        }
    });
});