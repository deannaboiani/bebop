const logout = document.querySelector("#logoutBtn");

logout.addEventListener("click",(e)=>{
    e.preventDefault();
    console
    fetch("/api/users/logout",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(!res.ok){
            alert("logout failed")
        } else {
            location.href = "/login";
        }
    })
    
});