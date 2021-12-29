document.querySelector("#add-post").addEventListener("submit", (evt) => {
  evt.preventDefault();
  console.log(evt);
  const fetchObj = {
    // UserID:document.querySelector("#user-id").value,
    ArtistId: document.querySelector("#artist-id").value,
    content: document.querySelector("#content").value,
  };
  console.log(fetchObj);
  fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(fetchObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      document.location.reload(true)
    } else {
      alert("Post wasn't added");
    }
  });
});