const artistName = document.querySelector("#artist-search");
const addBtn = document.querySelector("#button-addon2");

// addBtn.addEventListener("click",(e)=>{
//     e.preventDefault();
//     console
//     fetch("/api/artists/",{
//         method:"POST",
//         body:JSON.stringify(fetchObj),
//         headers:{
//             "Content-Type":"application/json"
//         }
//     }).then(res=>{
//         if(res.ok){
//            location.href="/artists/{{id}}"
//         } else {
//             alert("trumpet sound")
//         }
//     })
// })

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
});

// TODO: whenever someone clicks on addBtn, we take the value of addArtist, plug it in to our bandsintown api fetch request in bands2.js, extract the name: and image_id: key values and save them into our database.

// TODO: if the user input in addArtist does not match database, alert "try another artist!" or something.

// TODO: we take whatever artists that this particular user has searched for from the database (max 6) and for {{#each}}, we replace our hardcoded image and name in the profile view with this data.

// TODO: when user tries to add more than 6 artists, alert "max artists reached!".