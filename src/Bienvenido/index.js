document.addEventListener("DOMContentLoaded", function() {
    let btnRegis = document.getElementById("btnRegis");
    let btnLogin = document.getElementById("btnLogin");

    if (btnRegis) {
        btnRegis.addEventListener("click", function() {
            setTimeout(() => {
                window.location.href = 'http://localhost:1234/Registro.html'
            }, 500);
            console.log("registro yo te elijo");
        });
    }

    if (btnLogin) {
        btnLogin.addEventListener("click", function() {
            setTimeout(() => {
                window.location.href = 'http://localhost:1234/Login.html'
            }, 500);
            console.log("login yo te elijo");
        });
    }
});

