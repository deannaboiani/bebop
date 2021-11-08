document.querySelector(".remove-icon").addEventListener("click", (evt) => {
    evt.preventDefault();
    fetch(`/api/artists/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        location.href = "/profile"
      } else {
        alert("Oops");
      }
    });
  });