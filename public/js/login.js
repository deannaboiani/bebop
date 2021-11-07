const loginForm = document.querySelector("#login-form");

//TODO: collect data from login form, make post request to log in user.  
//TODO: once you get an ok response, redirect to the profile page

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
        if(!res.ok){
            alert("incorrect login")
        } else {
            res.json().then(data=>{
                location.href = `/profile/${data.id}`
            })
        }
    })
})