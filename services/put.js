async function putSolicitud(id, nuevoEstado) {
    try {
        let solicitudData = { 
            estado: nuevoEstado 
        };
        let response = await fetch('db.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                ...solicitudData
            })
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
