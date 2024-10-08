import { getUsers, GetAdmins } from "../../services/get.js";
import { postUser, postAdmins } from "../../services/post.js";

let btnEnviar = document.getElementById("btnRegistro");
let btnEnviarAdmin = document.getElementById("btnEnviarAdmin");
let mensajeAlert = document.getElementById('mensajeAlert');

function showMessage(message) {
    mensajeAlert.innerText = message;
}

document.getElementById('loginBtn').addEventListener('click', function() {
    window.location.href = "http://http://localhost:1234/Login.html";
});

btnEnviar.addEventListener("click", async function(event) {
    event.preventDefault();

    // Obtener los valores ingresados por el usuario
    let usuario = document.getElementById("userName").value;
    let correo = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (usuario === "" || correo === "" || password === "") {
        showMessage("Por favor, llena todos los campos");
        return;
    }

    // Obtener usuarios desde el servidor
    let users = await getUsers();
    console.log(users);

    // Verificar si el usuario ya está registrado
    let userExists = users.some(user => user.correo === correo);

    if (userExists) {
        showMessage("El usuario ya está registrado");
        return;
    }

    // Guardar el nuevo usuario en el servidor
    try {
        await postUser(usuario, correo, password);
        showMessage("Usuario registrado.");
        window.location.href="http://localhost:1234/Login.html"
    } catch (error) {
        console.error('Error al registrar el usuario', error);
    }
});

// Evento para verificar la contraseña del admin
btnPassword.addEventListener("click", function () {
    let passwordAdmin = 'fwd2024';
    let errorMsg = document.getElementById('mensajeError');

    if (adminPassword.value === passwordAdmin) {
        errorMsg.style.display = 'none';

        // Ocultar el primer modal
        let modal1 = new bootstrap.Modal(document.getElementById('exampleModalToggle'));
        modal1.hide();

        // Mostrar el segundo modal
        let modal2 = new bootstrap.Modal(document.getElementById('exampleModalToggle2'));
        modal2.show();
    } else {
        errorMsg.style.display = 'block';
    }
});

btnEnviarAdmin.addEventListener("click", async function(event) {
    event.preventDefault();

    // Obtener los valores ingresados por el administrador
    let admin = document.getElementById("usuarioAdmin").value;
    let correoAdmin = document.getElementById("correoAdmin").value;
    let passwordAdmin = document.getElementById("contrasenaAdmin").value;

    if (admin === "" || correoAdmin === "" || passwordAdmin === "") {
        showMessage("Por favor, llena todos los campos");
        return;
    }

    // Obtener administradores desde el servidor
    let admins2 = await GetAdmins();
    console.log(admins2);

    // Verificar si el administrador ya está registrado
    let adminExists = admins2.some(admin3 => admin3.correo === correoAdmin);

    if (adminExists) {
        showMessage("El usuario ya está registrado");
        return;
    }

    // Guardar el nuevo administrador en el servidor
    try {
        await postAdmins(admin, correoAdmin, passwordAdmin);
        showMessage("Administrador Registrado.");
        window.location.href = "../LogIn/LogIn.html";
    } catch (error) {
        console.error('Error al registrar Administrador', error);
    }
});
