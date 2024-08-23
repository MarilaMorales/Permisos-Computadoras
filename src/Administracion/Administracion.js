import { getPermisos } from "../get.js";
import { putSolicitud } from "/Users/mgonz/Desktop/Permisos-Computadora/Premisos-Computadoras/services/put.js";



window.onload = function() {
    mostrarSolicitudes();
};



async function mostrarSolicitudes() {
    console.log('Iniciando mostrarSolicitudes');
    try {
        let solicitudes = await getPermisos();
        console.log('Solicitudes obtenidas:', solicitudes); // Verifica el contenido
        let solicitudesPendientes = filtrarSolicitudesPendientes(solicitudes);
        console.log('Solicitudes pendientes:', solicitudesPendientes); // Verifica el filtrado
        mostrarEnTabla(solicitudesPendientes);
    } catch (error) {
        console.error('Error al mostrar solicitudes:', error);
    }
}


// async function mostrarSolicitudes() {
//     console.log('Mostrando solicitudes'); // Verifica si se llama
//     try {

//         let solicitudes = await getPermisos(); // Obtener solicitudes desde db.json
//         console.log(solicitudes); // Para ver que pu esta pasando
//         let solicitudesPendientes = filtrarSolicitudesPendientes(solicitudes); 
//         mostrarEnTabla(solicitudesPendientes); // Mostrar las solicitudes en la tabla


//     } catch (error) {
//         console.error('Error al mostrar solicitudes:', error);
//     }
// }



function filtrarSolicitudesPendientes(solicitudes) {
    return solicitudes.filter(function(solicitud) {
        return !solicitud.estado; // Filtra solicitudes que no tienen el campo 'estado' definido
    });
}




function mostrarEnTabla(solicitudes) {
    let tabla = document.getElementById('tablaSolicitudes');
    let tbody = tabla.querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar la tabla



    for (let solicitud of solicitudes) {
        let fila = document.createElement('tr');


        let celdaNombre = document.createElement('td');
        celdaNombre.textContent = solicitud.usuario; // Asegúrate de usar el nombre correcto del campo
        fila.appendChild(celdaNombre);

        let celdaCodigo = document.createElement('td');
        celdaCodigo.textContent = solicitud.codigoComputadora;
        fila.appendChild(celdaCodigo);



        let celdaFechaSalida = document.createElement('td');
        celdaFechaSalida.textContent = solicitud.fechaSalida;
        fila.appendChild(celdaFechaSalida);

        let celdaFechaEntrega = document.createElement('td');
        celdaFechaEntrega.textContent = solicitud.fechaRegreso;
        fila.appendChild(celdaFechaEntrega);

        let celdaAcciones = document.createElement('td');

        let botonAceptar = document.createElement('button');
        botonAceptar.textContent = 'Aceptar';
        botonAceptar.onclick = async function() {

            try {

                await putSolicitud(solicitud.id, 'aceptado');
                await mostrarSolicitudes(); // Recargar solicitudes después de actualizar

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
                await mostrarSolicitudes(); // Recargar solicitudes después de actualizar
            } catch (error) {
                console.error('Error al rechazar solicitud:', error);
            }
        };
        celdaAcciones.appendChild(botonRechazar);

        fila.appendChild(celdaAcciones);
        tbody.appendChild(fila);
    }
}





