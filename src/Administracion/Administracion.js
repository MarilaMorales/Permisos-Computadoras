import { getPermisos } from "../get.js";

window.onload = function() {
    mostrarSolicitudes();
};

async function mostrarSolicitudes() {
    try {
        let solicitudes = await getSolicitudesPendientes();
        let tabla = document.getElementById("tablaSolicitudes");
        tabla.innerHTML = ''; // Limpiar tabla

        for (let i = 0; i < solicitudes.length; i++) {
            let solicitud = solicitudes[i];
            let fila = document.createElement('tr');

            let celdaNombre = document.createElement('td');
            celdaNombre.textContent = solicitud.nombreCompleto;
            fila.appendChild(celdaNombre);

            let celdaCodigo = document.createElement('td');
            celdaCodigo.textContent = solicitud.codigoComputadora;
            fila.appendChild(celdaCodigo);

            let celdaFechaSalida = document.createElement('td');
            celdaFechaSalida.textContent = solicitud.fechaSalida;
            fila.appendChild(celdaFechaSalida);

            let celdaFechaEntrega = document.createElement('td');
            celdaFechaEntrega.textContent = solicitud.fechaEntrega;
            fila.appendChild(celdaFechaEntrega);

            let celdaAcciones = document.createElement('td');
            
            let botonAceptar = document.createElement('button');
            botonAceptar.textContent = 'Aceptar';
            botonAceptar.onclick = async function() {
                await actualizarEstadoSolicitud(solicitud.id, 'aceptado');
                await mostrarSolicitudes(); // Volver a cargar las solicitudes
            };
            celdaAcciones.appendChild(botonAceptar);

            let botonRechazar = document.createElement('button');
            botonRechazar.textContent = 'Rechazar';
            botonRechazar.onclick = async function() {
                await actualizarEstadoSolicitud(solicitud.id, 'rechazado');
                await mostrarSolicitudes(); 
            };
            celdaAcciones.appendChild(botonRechazar);

            fila.appendChild(celdaAcciones);
            tabla.appendChild(fila);
        }
    } catch (error) {
        console.error('Error al mostrar solicitudes:', error);
    }
}


