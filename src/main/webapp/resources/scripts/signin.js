document.addEventListener('DOMContentLoaded', () => {
    document
        .getElementById('myForm')
        .addEventListener('submit', signin);
});

function signin(ev) {
    ev.preventDefault(); //stop the page reloading
    let username = document.getElementById("uname").value;
    let password = document.getElementById("pass").value;

    console.log(username);
    console.log(password);
    
    fetch('http://ec2-3-129-208-148.us-east-2.compute.amazonaws.com:8080/project-1/signin', {
        method: 'POST',
        redirect: 'follow',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(function (response) {

        if(!response.ok){
            throw Error("ERROR")
        }

        return response.json(); 
    }).then(function (data) {
        console.log(data)

        if (data.status == 'process failed') {
            console.log("login failed");
            let childDiv= document.getElementById("warningText")
            childDiv.innerHTML =`<p style="color:red;"><b>Failed to sign in!</b> <br> <b>Username or Password is incorrect</b></p>`;
        } else {
            sessionStorage.setItem('currentUser', data.userId);
            sessionStorage.setItem('userRole', data.role.role);

            if(sessionStorage.getItem('userRole') == 'Employee'){
                window.location.href = 'http://ec2-3-129-208-148.us-east-2.compute.amazonaws.com:8080/project-1/resources/html/EmpHome.html'
            } else if(sessionStorage.getItem('userRole') == 'Manager') {
                window.location.href = 'http://ec2-3-129-208-148.us-east-2.compute.amazonaws.com:8080/project-1/resources/html/MngHome.html'
            } else {
                window.location.href = 'http://ec2-3-129-208-148.us-east-2.compute.amazonaws.com:8080/project-1/index.html'
            }
            
        }
    }).catch(error => {
        console.log(error);
        // warning message later...
    })
}