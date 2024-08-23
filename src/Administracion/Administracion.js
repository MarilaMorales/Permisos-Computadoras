import { getPermisos } from "../get.js";
import { putSolicitud } from "/Users/mgonz/Desktop/Permisos-Computadora/Premisos-Computadoras/services/put.js";

window.onload = function() {
    mostrarSolicitudes();
};

// Función para filtrar las solicitudes pendientes
function filtrarSolicitudesPendientes(solicitudes) {
    return solicitudes.filter(function(solicitud) {
        return solicitud.estado === 'pendiente';
    });
}

// Función para mostrar las solicitudes en la tabla
async function mostrarSolicitudes() {
    try {
        let solicitudes = await getPermisos();
        let solicitudesPendientes = filtrarSolicitudesPendientes(solicitudes); // Aplicar el filtro
        let tabla = document.getElementById('tablaSolicitudes');
        let tbody = tabla.querySelector('tbody');
        tbody.innerHTML = ''; // Limpiar la tabla

        for (let i = 0; i < solicitudesPendientes.length; i++) {
            let solicitud = solicitudesPendientes[i];
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
            celdaFechaEntrega.textContent = solicitud.fechaRegreso; // Usar fechaRegreso en lugar de fechaEntrega
            fila.appendChild(celdaFechaEntrega);

            let celdaAcciones = document.createElement('td');

            let botonAceptar = document.createElement('button');
            botonAceptar.textContent = 'Aceptar';
            botonAceptar.onclick = async function() {
                try {
                    await putSolicitud(solicitud.id, 'aceptado');
                    await mostrarSolicitudes(); // Volver a cargar las solicitudes
                } catch (error) {
                    console.error('Error al aceptar solicitud:', error);
                }
            };
            celdaAcciones.appendChild(botonAceptar);

            let botonRechazar = document.createElement('button');
            botonRechazar.textContent = 'Rechazar';
            botonRechazar.onclick = async function() {
                try {
                    await putSolicitud(solicitud.id, 'rechazado');
                    await mostrarSolicitudes(); // Volver a cargar las solicitudes
                } catch (error) {
                    console.error('Error al rechazar solicitud:', error);
                }
            };
            celdaAcciones.appendChild(botonRechazar);

            fila.appendChild(celdaAcciones);
            tbody.appendChild(fila);
        }
    } catch (error) {
        console.error('Error al mostrar solicitudes:', error);
    }
}

// Inicializar al cargar la página
window.onload = function() {
    mostrarSolicitudes();
};
