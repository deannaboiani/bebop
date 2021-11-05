const loginForm = document.querySelector("#login-form");

//collects data from login form
//once you get an ok response, redirect to the profile page

loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const userObj={
        email:document.querySelector("#exampleInputEmail1").value,
        password:document.querySelector("#exampleInputPassword1").value,
    }
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/profile"
        } else {
            alert("cannot login user")
        }
    })
})