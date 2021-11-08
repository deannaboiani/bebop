const signupForm = document.querySelector("#signup-form");

//collects data from signup form
//once you get an ok response, redirect to the profile page, if not alert

signupForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const fetchObj={
        email:document.querySelector("#exampleInputEmail1").value,
        password:document.querySelector("#inputPassword5").value,
        username:document.querySelector("#exampleInputUsername1").value
    }
    console.log('clicked')
    fetch("/api/users",{
        method:"POST",
        body:JSON.stringify(fetchObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(!res.ok){
            return alert("form was filled incorrectly")
        } else {
            res.json().then(data=>{
                location.href = `/profile/${data.id}`
            })
        }
    })
})