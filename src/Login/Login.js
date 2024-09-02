import { getUsers, GetAdmins } from "../../services/get";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("btnLogin");
const mensajeAlert = document.getElementById("mensajeAlert"); // Obtener el div para mostrar mensajes

loginButton.addEventListener("click", async function () {
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    mensajeAlert.innerText = ""; // Limpiar el mensaje de alerta previo

    // Validar que ambos campos estén llenos
    if (emailValue === "" || passwordValue === "") {
        mensajeAlert.innerText = "Por favor llena todos los campos!";
        return; // Salir de la función si los campos están vacíos
    }

    try {
        const userAppi = await getUsers(); // Espera la promesa de getUsers
        const adminAppi = await GetAdmins(); // Espera la promesa de GetAdmins

        // Buscar en la lista de usuarios normales
        const user = userAppi.find(u => u.correo === emailValue);
        console.log(user);
        
        if (user) {
            if (user.password === passwordValue) {
                mensajeAlert.innerText = "¡Éxito! Usuario normal entrando.";
                window.location.href = "http://localhost:1234/Estudiantes.html";
            } else {
                mensajeAlert.innerText = "Contraseña incorrecta.";
            }
        } else {
            // Si no se encuentra en los usuarios, buscar en la lista de administradores
            const useradmin = adminAppi.find(admin => admin.correo === emailValue);

            if (useradmin) {
                if (useradmin.password === passwordValue) {
                    mensajeAlert.innerText = "¡Éxito! Administrador entrando.";
                    window.location.href = "http://localhost:1234/Administracion.html";
                } else {
                    mensajeAlert.innerText = "Contraseña incorrecta para administrador.";
                }
            } else {
                mensajeAlert.innerText = "Este usuario no existe.";
            }
        }

    } catch (error) {
        console.error("Error al obtener los usuarios o administradores:", error);
        mensajeAlert.innerText = "Error en ingreso de datos";
    }

    // Limpiar los campos de entrada
    emailInput.value = "";
    passwordInput.value = "";
});
