const deletePost = document.querySelector("#delete-post");

deletePost.addEventListener("click", (evt) => {
  evt.preventDefault();
  const postID = document.getElementById("postID").value;
  fetch(`/api/posts/${postID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      document.location.reload(true)
    } else {
      alert("Post wasn't deleted");
    }
  });
});