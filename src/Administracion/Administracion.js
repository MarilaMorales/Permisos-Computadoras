import { getPermisos } from "../../services/get.js"; 
import { putSolicitud } from "../../services/put.js"; 

window.onload = function() {
    mostrarSolicitudes();
    mostrarHistorial(); // Llama a la función para mostrar el historial al cargar

    // Asignar event listener al botón de búsqueda
    document.querySelector('.btn-outline-success').addEventListener('click', filtrarSolicitudes);

    // Asignar event listener al select para filtrar por estado
    document.getElementById('solicitudSearch').addEventListener('change', function() {
        estadoSelect = this.value.trim();
        filtrarSolicitudes();
      });

     
    let estadoSelect = '';

    // Asignar event listener al campo de búsqueda para filtrar mientras se escribe
    let inputSearch = document.getElementById('inputSearch');
    inputSearch.addEventListener('input', filtrarSolicitudes);
};




// Función para mostrar las solicitudes pendientes
async function mostrarSolicitudes() {
    try {
        let solicitudes = await getPermisos();
        let solicitudesPendientes = filtrarPendientes(solicitudes);
        mostrarEnTabla(solicitudesPendientes);
    } catch (error) {
        console.error('Error al mostrar solicitudes:', error);
    }
}

// Función para mostrar todo el historial
async function mostrarHistorial() {
    try {
        let solicitudes = await getPermisos();
        mostrarHistorialEnTabla(solicitudes);
        filtrarSolicitudes(); // Filtrar después de mostrar
    } catch (error) {
        console.error('Error al mostrar historial:', error);
    }
}

// Filtrar solicitudes que no tienen estado
function filtrarPendientes(solicitudes) {
    return solicitudes.filter(function(solicitud) {
        return !solicitud.estado; // Filtra solicitudes que no tienen el campo 'estado' definido
    });
}

// Mostrar solicitudes pendientes en la tabla
function mostrarEnTabla(solicitudes) {
    let tabla = document.getElementById('tablaSolicitudes');
    let tbody = tabla.querySelector('tbody');
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

// Mostrar historial en la tabla
function mostrarHistorialEnTabla(solicitudes) {
    let tablaHistorial = document.getElementById('Historial');
    let tbody = tablaHistorial.querySelector('tbody'); // Usar querySelector en lugar de getElementsByTagName
    tbody.innerHTML = ''; // Limpiar la tabla

    for (let i = 0; i < solicitudes.length; i++) {
        let solicitud = solicitudes[i];
        let fila = document.createElement('tr');
        fila.className = 'filaHistorial'; // Añadido clase filaHistorial

        let celdaNombre = document.createElement('td');
        celdaNombre.className = 'nombre'; // Añadido clase nombre
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
        celdaEstado.className = 'estado'; // Añadido clase estado
        celdaEstado.textContent = solicitud.estado || 'Pendiente'; // Muestra 'Pendiente' si no hay estado
        fila.appendChild(celdaEstado);

        tbody.appendChild(fila);
    }
}





// Función para filtrar solicitudes en el historial

filtrarSolicitudes()



async function filtrarSolicitudes() {
    try {
        let solicitudes = await getPermisos();

        let aceptadas = solicitudes.filter((element) => element.estado == 'aprobada');
        let rechazadas = solicitudes.filter((element) => element.estado == 'rechazada');

        console.log(aceptadas);
        console.log(rechazadas);

        // Ahora obtén los valores de entrada para filtrar
        let inputSearch = document.getElementById('inputSearch').value.toLowerCase().trim();
        let estadoSelect = document.getElementById('solicitudSearch').value.trim();
        let fechaInicio = document.getElementById('fechaInicio').value;
        let fechaFinal = document.getElementById('fechaFinal').value;

        // Convertir fechas a objetos Date si están definidas
        if (fechaInicio) {
            fechaInicio = new Date(fechaInicio);
        } else {
            fechaInicio = null;
        }

        if (fechaFinal) {
            fechaFinal = new Date(fechaFinal);
        } else {
            fechaFinal = null;
        }

        // Filtrar solicitudes según el estado seleccionado
        let solicitudesFiltradas = [];
        if (estadoSelect === 'aprobada') {
            solicitudesFiltradas = aceptadas;
        } else if (estadoSelect === 'rechazada') {
            solicitudesFiltradas = rechazadas;
        } else {
            solicitudesFiltradas = solicitudes;
        }

        // Aplicar filtros adicionales por nombre y fecha
        solicitudesFiltradas = solicitudesFiltradas.filter(solicitud => {
            let nombre = solicitud.nombre.toLowerCase().trim();
            let fechaSalida = new Date(solicitud.fechaSalida);
            let fechaRegreso = new Date(solicitud.fechaEntrega);

            let nombreCoincide = nombre.includes(inputSearch);

            let fechaDentroRango = true;
            if (fechaInicio && fechaSalida < fechaInicio) {
                fechaDentroRango = false;
            }
            if (fechaFinal && fechaRegreso > fechaFinal) {
                fechaDentroRango = false;
            }

            return nombreCoincide && fechaDentroRango;
        });

        // Mostrar las solicitudes filtradas en la tabla
        let tbody = document.getElementById('Historial').querySelector('tbody');
        tbody.innerHTML = ''; // Limpiar la tabla antes de agregar los nuevos resultados

        solicitudesFiltradas.forEach(solicitud => {
            let fila = document.createElement('tr');
            fila.classList.add('filaHistorial');

            fila.innerHTML = `
                <td class="nombre">${solicitud.nombre}</td>
                <td>${solicitud.codigoComputadora}</td>
                <td>${solicitud.fechaSalida}</td>
                <td>${solicitud.fechaEntrega}</td>
                <td class="estado">${solicitud.estado}</td>
            `;

            tbody.appendChild(fila);
        });

    } catch (error) {
        console.error('Error al mostrar historial:', error);
    }
}

// Event listener para el botón de buscar









// async function filtrarSolicitudes() {
//     try {
//         let solicitudes = await getPermisos();

//         let aceptadas = solicitudes.filter((element) => element.estado == 'aceptado')
//         let rechazadas = solicitudes.filter((element) => element.estado == 'rechazado')

//         console.log(aceptadas);
//         console.log(rechazadas);
        
//     } catch (error) {
//         console.error('Error al mostrar historial:', error);
//     }

// //   // Obtener los valores de entrada

//   let inputSearch = document.getElementById('inputSearch').value.toLowerCase().trim();
//   let estadoSelect = document.getElementById('solicitudSearch').value.trim();
//   let fechaInicio = document.getElementById('fechaInicio').value;
//   let fechaFinal = document.getElementById('fechaFinal').value;

//   // Convertir fechas a objetos Date si están definidas
//   if (fechaInicio) {
//     fechaInicio = new Date(fechaInicio);
//   } else {
//     fechaInicio = null;
//   }
  
//   if (fechaFinal) {
//     fechaFinal = new Date(fechaFinal);
//   } else {
//     fechaFinal = null;
//   }

//   // Obtener todas las filas del historial
//   let tbody = document.getElementById('Historial').querySelector('tbody');
//   let filas = tbody.getElementsByClassName('filaHistorial');

//   // Filtrar filas
//   let filteredRows = [];
//   for (let i = 0; i < filas.length; i++) {
//     let fila = filas[i];
//     let nombre = fila.getElementsByClassName('nombre')[0].textContent.toLowerCase().trim();
//     let estado = fila.getElementsByClassName('estado')[0].textContent.toLowerCase().trim();
//     let fechaSalida = new Date(fila.children[2].textContent.trim());
//     let fechaRegreso = new Date(fila.children[3].textContent.trim());

//     // Verificar si el nombre coincide con la búsqueda
//     let nombreCoincide = nombre.includes(inputSearch);

//     // Verificar el estado
//     let estadoCoincide = false;
//     if (estadoSelect.value === 'todos') {
//       estadoCoincide = true; // Mostrar todas las solicitudes si se selecciona 'todos'
//     } else {
//       estadoCoincide = estado === estadoSelect; // Comparar el estado de la fila con el seleccionado
//     }

//     // Verificar si la fecha de salida y regreso están dentro del rango especificado
//     let fechaDentroRango = true;

//     if (fechaInicio && fechaSalida < fechaInicio) {
//       fechaDentroRango = false;
//     }

//     if (fechaFinal && fechaRegreso > fechaFinal) {
//       fechaDentroRango = false;
//     }

//     // Agregar fila a la lista de filas filtradas si coincide con los filtros
//     if (nombreCoincide && estadoCoincide && fechaDentroRango) {
//       filteredRows.push(fila);
//     }
//   }

//   // Mostrar u ocultar filas según la lista de filas filtradas
//   for (let i = 0; i < filas.length; i++) {
//     let fila = filas[i];
//     if (filteredRows.includes(fila)) {
//       fila.style.display = ''; // Mostrar la fila
//     } else {
//       fila.style.display = 'none'; // Ocultar la fila
//     }
//   }
// }






// Función para actualizar una solicitud
async function actualizarSolicitud(id, estado) {
    try {
        await putSolicitud(id, { estado: estado });
        console.log('Solicitud actualizada:', id, estado);
        mostrarSolicitudes(); // Recargar solicitudes después de actualizar
        mostrarHistorial(); // Recargar historial después de actualizar
    } catch (error) {
        console.error('Error al actualizar la solicitud:', error);
    }
}







































