async function actualizarEstadoSolicitud(id, estado) {
    try {
        const response = await fetch('http://localhost:3001/solicitudes/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estado: estado })
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la solicitud');
        }

        console.log('Solicitud actualizada:', id, estado);
    } catch (error) {
        console.error('Error al actualizar la solicitud:', error);
    }
}
