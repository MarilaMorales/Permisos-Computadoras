import { getUsers, GetAdmins } from "../../services/get";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("btnLogin");

loginButton.addEventListener("click", async function () {
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    try {
        const userAppi = await getUsers(); // Espera la promesa de getUsers
        const adminAppi = await GetAdmins(); // Espera la promesa de GetAdmins

        // Buscar en la lista de usuarios normales
        const user = userAppi.find(u => u.correo === emailValue);
        
        if (user) {
            if (user.password === passwordValue) {
                alert("¡Éxito! Usuario normal entrando.");
            } else {
                alert("Contraseña incorrecta.");
            }
        } else {
            // Si no se encuentra en los usuarios, buscar en la lista de administradores
            const useradmin = adminAppi.find(admin => admin.correo === emailValue);

            if (useradmin) {
                if (useradmin.password === passwordValue) {
                    alert("¡Éxito! Administrador entrando.");
                } else {
                    alert("Contraseña incorrecta para administrador.");
                }
            } else {
                alert("Este usuario no existe.");
            }
        }

    } catch (error) {
        console.error("Error al obtener los usuarios o administradores:", error);
        alert("Error en ingreso de datos");
    }

    // Limpiar los campos de entrada
    emailInput.value = "";
    passwordInput.value = "";
});
