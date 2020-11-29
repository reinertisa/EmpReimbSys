document.addEventListener('DOMContentLoaded', () => {
	document
		.getElementById('myForm')
		.addEventListener('submit', signup);
});

function signup(ev) {
  ev.preventDefault(); //stop the page reloading
	let username = document.getElementById("uname").value;
	let password = document.getElementById("pass").value;
	let confirmPassword = document.getElementById("cpass").value;
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    let email = document.getElementById("email").value;

	console.log(username);
	console.log(password);
	console.log(confirmPassword);
    console.log(firstName);
    console.log(lastName);
    console.log(email);

	fetch('http://ec2-18-191-62-185.us-east-2.compute.amazonaws.com:8080/project-1/signup', {
		method: 'POST',
        redirect: 'follow',
        credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: username,
            password: password,
            confirmPassword: confirmPassword,
            firstName: firstName,
            lastName : lastName,
            email : email
		})
	}).then(function(response) {

		if(!response.ok){
			throw Error("ERROR");
		}

		return response.json(); 
	}).then(function(json) {
		console.log(json)

		alert("Your account created successfully");
		window.location.href = 'http://ec2-18-191-62-185.us-east-2.compute.amazonaws.com:8080/project-1/index.html'

	}).catch(error =>{
		console.log(error);
		//warning message later...
	})

}

