const signupForm = document.querySelector("#signup-form");

//collects data from signup form
//once you get an ok response, redirect to the profile page, if not alert

signupForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const userObj={
        email:document.querySelector("#exampleInputEmail1").value,
        password:document.querySelector("#inputPassword5").value,
        username:document.querySelector("#exampleInputUsername1").value
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
            alert("the form was not filled out correctly")
        }
    })
})