import { getPermisos } from "../../services/get.js"; 
import { putSolicitud } from "../../services/put.js"; 

window.onload = function() {
    mostrarSolicitudes();
    mostrarHistorial(); // Llama a la función para mostrar el historial al cargar
};

async function mostrarSolicitudes() {
    console.log('Iniciando mostrarSolicitudes');
    try {
        let solicitudes = await getPermisos();
        console.log('Solicitudes obtenidas:', solicitudes);
        
        let solicitudesPendientes = filtrarPendientes(solicitudes);
        console.log('Solicitudes pendientes:', solicitudesPendientes);
        
        mostrarEnTabla(solicitudesPendientes);
    } catch (error) {
        console.error('Error al mostrar solicitudes:', error);
    }
}

async function mostrarHistorial() {
    console.log('Iniciando mostrarHistorial');
    try {
        let solicitudes = await getPermisos();
        console.log('Solicitudes obtenidas para historial:', solicitudes);
        
        // Muestra todas las solicitudes (incluyendo las que ya están aceptadas o rechazadas)
        mostrarHistorialEnTabla(solicitudes);
    } catch (error) {
        console.error('Error al mostrar historial:', error);
    }
}

function filtrarPendientes(solicitudes) {
    return solicitudes.filter(function(solicitud) {
        return !solicitud.estado; // Filtra solicitudes que no tienen el campo 'estado' definido
    });
}


function mostrarEnTabla(solicitudes) {
    let tabla = document.getElementById('tablaSolicitudes');
    let tbody = tabla.querySelector('tbody'); // Usar querySelector en lugar de getElementsByTagName
    tbody.innerHTML = ''; // Limpiar la tabla

    for (let i = 0; i < solicitudes.length; i++) {
        let solicitud = solicitudes[i];
        let fila = document.createElement('tr');

        let celdaNombre = document.createElement('td');
        celdaNombre.textContent = solicitud.usuario;
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
        botonAceptar.onclick = function() {
            actualizarSolicitud(solicitud.id, 'aceptado');
        };

        celdaAcciones.appendChild(botonAceptar);

        let botonRechazar = document.createElement('button');
        botonRechazar.textContent = 'Rechazar';
        botonRechazar.onclick = function() {
            actualizarSolicitud(solicitud.id, 'rechazado');
        };

        celdaAcciones.appendChild(botonRechazar);
        fila.appendChild(celdaAcciones);
        tbody.appendChild(fila);
    }
}














function mostrarHistorialEnTabla(solicitudes) {
    let tablaHistorial = document.getElementById('Historial');
    let tbody = tablaHistorial.querySelector('tbody'); // Usar querySelector en lugar de getElementsByTagName
    tbody.innerHTML = ''; // Limpiar la tabla

    for (let i = 0; i < solicitudes.length; i++) {
        let solicitud = solicitudes[i];
        let fila = document.createElement('tr');

        let celdaNombre = document.createElement('td');
        celdaNombre.textContent = solicitud.usuario;
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

        let celdaEstado = document.createElement('td');
        celdaEstado.textContent = solicitud.estado || 'Pendiente'; // Muestra 'Pendiente' si no hay estado
        fila.appendChild(celdaEstado);

        tbody.appendChild(fila);
    }
}

async function actualizarSolicitud(id, nuevoEstado) {
    try {
        // Paso 1: Obtener la solicitud actual
        console.log(`Obteniendo la solicitud con ID: ${id}`);
        let solicitudResponse = await fetch(`http://localhost:3001/permisos/${id}`);
        if (!solicitudResponse.ok) {
            throw new Error('Error al obtener la solicitud');
        }
        const solicitud = await solicitudResponse.json();
        console.log('Solicitud obtenida:', solicitud);
        
        // Paso 2: Actualizar el estado en la solicitud completa
        solicitud.estado = nuevoEstado;
        
        // Paso 3: Usar la función putSolicitud con la solicitud completa
        await putSolicitud(id, solicitud);

        console.log('Solicitud actualizada y enviada:', solicitud);
    } catch (error) {
        console.error('Error al actualizar solicitud:', error);
        throw error;
    }
}














































// import { getPermisos } from "../../services/get.js"; 
// import { putSolicitud } from "../../services/put.js"; 




// window.onload = function() {
//     mostrarSolicitudes();
// };



// async function mostrarSolicitudes() {
//     console.log('Iniciando mostrarSolicitudes');
//     try {
//         let solicitudes = await getPermisos();
        
//         console.log('Solicitudes obtenidas:', solicitudes); // Verifica el contenido
        
//         let solicitudesPendientes = filtrarPendientes(solicitudes);
        
//         console.log('Solicitudes pendientes:', solicitudesPendientes); // Verifica el filtrado
        
//         mostrarEnTabla(solicitudesPendientes);
//     } catch (error) {
//         console.error('Error al mostrar solicitudes:', error);
//     }
// }




// function filtrarPendientes(solicitudes) {
//     return solicitudes.filter(function(solicitud) {
//         return !solicitud.estado; // Filtra solicitudes que no tienen el campo 'estado' definido
//     });
// }




// function mostrarEnTabla(solicitudes) {
//     let tabla = document.getElementById('tablaSolicitudes');
//     let tbody = tabla.querySelector('tbody');
//     tbody.innerHTML = ''; // Limpiar la tabla



//     for (let solicitud of solicitudes) {
//         let fila = document.createElement('tr');


        // let celdaNombre = document.createElement('td');
        // celdaNombre.textContent = solicitud.usuario; // Asegúrate de usar el nombre correcto del campo
        // fila.appendChild(celdaNombre);

        // let celdaCodigo = document.createElement('td');
        // celdaCodigo.textContent = solicitud.codigoComputadora;
        // fila.appendChild(celdaCodigo);



        // let celdaFechaSalida = document.createElement('td');
        // celdaFechaSalida.textContent = solicitud.fechaSalida;
        // fila.appendChild(celdaFechaSalida);

        // let celdaFechaEntrega = document.createElement('td');
        // celdaFechaEntrega.textContent = solicitud.fechaRegreso;
        // fila.appendChild(celdaFechaEntrega);

        // let celdaAcciones = document.createElement('td');

        // let botonAceptar = document.createElement('button');
        // botonAceptar.textContent = 'Aceptar';
        // botonAceptar.onclick = async function() {

        //     try {

        //         await putSolicitud(solicitud.id, 'aceptado');
        //         await mostrarSolicitudes(); // Recargar solicitudes después de actualizar

        //     } catch (error) {
        //         console.error('Error al aceptar solicitud:', error);
        //     }
        // };



        // celdaAcciones.appendChild(botonAceptar);

        // let botonRechazar = document.createElement('button');
        // botonRechazar.textContent = 'Rechazar';
        // botonRechazar.onclick = async function() {
        //     try {


//                 await putSolicitud(solicitud.id, 'rechazado');
//                 await mostrarSolicitudes(); // Recargar solicitudes después de actualizar
//             } catch (error) {
//                 console.error('Error al rechazar solicitud:', error);
//             }
//         };
//         celdaAcciones.appendChild(botonRechazar);

//         fila.appendChild(celdaAcciones);
//         tbody.appendChild(fila);
//     }
// }




// async function actualizarSolicitud(id, nuevoEstado) {
//     try {
//         // Paso 1: Obtener la solicitud actual
//         console.log(`Obteniendo la solicitud con ID: ${id}`);
//         const solicitudResponse = await fetch(`http://localhost:3001/permisos/${id}`);
//         if (!solicitudResponse.ok) {
//             throw new Error('Error al obtener la solicitud');
//         }
//         const solicitud = await solicitudResponse.json();
//         console.log('Solicitud obtenida:', solicitud);
        
//         // Paso 2: Actualizar el estado
//         solicitud.estado = nuevoEstado;
        
//         // Paso 3: Enviar la solicitud actualizada al servidor
//         console.log('Enviando solicitud actualizada:', solicitud);
//         const response = await fetch(`http://localhost:3001/permisos/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(solicitud) // Enviar la solicitud completa actualizada
//         });

//         if (!response.ok) {
//             throw new Error('Error al actualizar el estado');
//         }

//         console.log('Respuesta del servidor:', await response.json());
//     } catch (error) {
//         console.error('Error al actualizar solicitud:', error);
//         throw error;
//     }
// }
