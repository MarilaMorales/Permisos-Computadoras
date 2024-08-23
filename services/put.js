export async function putSolicitud(id, nuevoEstado) {
    try {
        const response = await fetch(`http://localhost:3001/permisos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estado: nuevoEstado })
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el estado');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar solicitud:', error);
        throw error;
    }
}


export {putSolicitud}
