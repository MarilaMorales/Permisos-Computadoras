import { postPermisos } from "../../services/post.js";

// Llamados al DOM para los inputs y el botón de enviar
const usuarioInput = document.getElementById('usuario');
const sedeSelect = document.getElementById('sede');
const fechaSalidaInput = document.getElementById('fechaSalida');
const fechaRegresoInput = document.getElementById('fechaRegreso');
const codigoComputadoraInput = document.getElementById('codigoComputadora');
const condicionesCheckbox = document.getElementById('condiciones');
const enviarBtn = document.getElementById("btnEnviar")



// Ejemplo de cómo podrías manejar el evento de envío del formulario
enviarBtn.addEventListener('click', async function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    
    // Acceder a los valores de los inputs
    const usuario = usuarioInput.value;
    const sede = sedeSelect.value;
    const fechaSalida = fechaSalidaInput.value;
    const fechaRegreso = fechaRegresoInput.value;
    const codigoComputadora = codigoComputadoraInput.value;
    const condicionesAceptadas = condicionesCheckbox.checked;

    // Validación básica
    if (!usuario || !sede || !fechaSalida || !fechaRegreso || !codigoComputadora || !condicionesAceptadas) {
        alert('Por favor, completa todos los campos y acepta las condiciones.');
        return;
    }

    // Lógica adicional para procesar los datos del formulario
    console.log('Formulario enviado con éxito');
    console.log({
        usuario,
        sede,
        fechaSalida,
        fechaRegreso,
        codigoComputadora,
        condicionesAceptadas
    });

    try {
        await postPermisos(usuario, sede , fechaSalida , fechaRegreso , codigoComputadora , condicionesAceptadas);

        alert("PERMISO ENVIADO");
       
    } catch (error) {
        console.error('Error al ENVIAR el permiso ', error);
    }


});

console.log(enviarBtn);

