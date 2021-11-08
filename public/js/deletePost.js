// document.querySelector("#delete-post").addEventListener("click", (evt) => {
//     evt.preventDefault();
//     const postID = document.getElementById("postID").value;
//     fetch(`/api/posts/${postID}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }).then((res) => {
//       if (res.ok) {
//         location.href = `/artists/${document.querySelector("#artist-id").value}`;
//       } else {
//         alert("Oops");
//       }
//     });
//   });