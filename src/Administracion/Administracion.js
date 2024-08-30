import { getPermisos } from "../../services/get.js"; 
import { putSolicitud } from "../../services/put.js"; 

window.onload = function() {
    mostrarSolicitudes();
    mostrarHistorial(); // Llama a la función para mostrar el historial al cargar

    // Asignar event listener al botón de búsqueda
    let botonBuscar = document.querySelector('.btn-outline-success');
    botonBuscar.addEventListener('click', filtrarSolicitudes);

    // Asignar event listener al select para filtrar por estado
    document.getElementById('solicitudSearch').addEventListener('change', function() {
        estadoSelect = this.value.trim();
        filtrarSolicitudes();
    });

    // Declarar variable estadoSelect
    let estadoSelect = '';

    // Asignar event listener al campo de búsqueda para filtrar mientras se escribe
    let inputSearch = document.getElementById('inputSearch');
    inputSearch.addEventListener('input', filtrarSolicitudes);

    // Manejo de la visibilidad de secciones
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section');

    function mostrarSeccion(targetId) {
        sections.forEach(function(section) {
            if (section.id === targetId) {
                section.style.display = 'block'; // Mostrar la sección seleccionada
            } else {
                section.style.display = 'none'; // Ocultar las demás secciones
            }
        });
    }

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
            const targetId = link.getAttribute('data-target'); // Obtener el id de la sección desde el data-target
            mostrarSeccion(targetId);
        });
    });

    // Mostrar la primera sección al cargar la página
    mostrarSeccion('solicitudesPendientes');
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
function filtrarSolicitudes() {
    // Obtener los valores de entrada
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

    // Obtener todas las filas del historial
    let tbody = document.getElementById('Historial').querySelector('tbody');
    let filas = tbody.getElementsByClassName('filaHistorial');

    // Filtrar filas
    let filteredRows = [];
    for (let i = 0; i < filas.length; i++) {
        let fila = filas[i];
        let nombre = fila.getElementsByClassName('nombre')[0].textContent.toLowerCase().trim();
        let estado = fila.getElementsByClassName('estado')[0].textContent.toLowerCase().trim();
        let fechaSalida = new Date(fila.children[2].textContent.trim());
        let fechaRegreso = new Date(fila.children[3].textContent.trim());

        // Verificar si el nombre coincide con la búsqueda
        let nombreCoincide = nombre.includes(inputSearch);

        // Verificar el estado
        let estadoCoincide = false;
        if (estadoSelect === 'todos') {
            estadoCoincide = true; // Mostrar todas las solicitudes si se selecciona 'todos'
        } else {
            estadoCoincide = estado === estadoSelect; // Comparar el estado de la fila con el seleccionado
        }

        // Verificar si la fecha de salida y regreso están dentro del rango especificado
        let fechaDentroRango = true;

        if (fechaInicio && fechaSalida < fechaInicio) {
            fechaDentroRango = false;
        }

        if (fechaFinal && fechaRegreso > fechaFinal) {
            fechaDentroRango = false;
        }

        // Agregar fila a la lista de filas filtradas si coincide con los filtros
        if (nombreCoincide && estadoCoincide && fechaDentroRango) {
            filteredRows.push(fila);
        }
    }

    // Mostrar u ocultar filas según la lista de filas filtradas
    for (let i = 0; i < filas.length; i++) {
        let fila = filas[i];
        if (filteredRows.includes(fila)) {
            fila.style.display = ''; // Mostrar la fila
        } else {
            fila.style.display = 'none'; // Ocultar la fila
        }
    }
}

// Función para actualizar una solicitud
async function actualizarSolicitud(id, estado) {
    try {
        // Obtener la solicitud original antes de actualizar
        let solicitudes = await getPermisos();
        let solicitudOriginal = null;

        // Buscar la solicitud por ID
        for (let i = 0; i < solicitudes.length; i++) {
            if (solicitudes[i].id === id) {
                solicitudOriginal = solicitudes[i];
                break;
            }
        }

        // Si no se encuentra la solicitud, lanza un error
        if (solicitudOriginal === null) {
            throw new Error('Solicitud no encontrada');
        }

        // Crear un objeto con todos los datos originales más el nuevo estado
        let solicitudActualizada = {
            id: solicitudOriginal.id,
            usuario: solicitudOriginal.usuario,
            codigoComputadora: solicitudOriginal.codigoComputadora,
            fechaSalida: solicitudOriginal.fechaSalida,
            fechaRegreso: solicitudOriginal.fechaRegreso,
            estado: estado // Actualizar solo el campo estado
        };

        // Enviar la solicitud actualizada al servidor
        await putSolicitud(id, solicitudActualizada);

        console.log('Solicitud actualizada:', id, estado);
        mostrarSolicitudes(); // Recargar solicitudes después de actualizar
        mostrarHistorial(); // Recargar historial después de actualizar
    } catch (error) {
        console.error('Error al actualizar la solicitud:', error);
    }
}






