function toggleForm() {
    const signupContainer = document.getElementById('signup-container');
    const loginContainer = document.getElementById('login-container');
    if (signupContainer.style.display === 'none') {
        signupContainer.style.display = 'block';
        loginContainer.style.display = 'none';
    } else {
        signupContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    }
}

function signup() {
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    if(password.trim()==="" || email.trim()==="" || username.trim()===""){
        alert("please add all details")
    }else{
        window.location.href = 'http://localhost:3000/';
    }
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    // Implement your login logic here
    // alert(`Login successful for ${username}`);
}