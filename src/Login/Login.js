

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("btnLogin");

loginButton.addEventListener("click" , function () {
    
    const emailValue = emailInput.value.trim()
    const passwordValue = passwordInput.value.trim()

    const userAppi = getUsers()

    const users = userAppi.find(u => u.email === emailValue && u.password === passwordValue)
    if (users == null) {
        alert("este usuario no existe")
    }else if (users) {
        alert("EXITOOOOO")
    }else{
        alert(" Error en ingreso de datos")
    }

    emailInput.value = "";
    passwordInput.value = "";
})