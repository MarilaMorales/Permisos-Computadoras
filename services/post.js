async function postUser(nombre, correo, password) {
    try {
        let nuevoUsuario = {
            nombre,
            correo,
            password
        };

        let response = await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoUsuario)
        });

        if (!response.ok) {
            throw new Error('No se pudo guardar el usuario');
        }

        let data = await response.json();
        console.log('Usuario guardado con éxito:', data);
    } catch (error) {
        console.error('No se pudo guardar el usuario:', error);
    }
}



async function postAdmins(nombre, correo, password) {
    try {
        let nuevoAdmin = {
            nombre,
            correo,
            password
        };


        let response = await fetch('http://localhost:3001/admins', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoAdmin)
        });

        if (!response.ok) {
            throw new Error('No se pudo guardar el usuario');
        }

        let dataAdmin = await response.json();
        console.log('Usuario guardado con éxito:', dataAdmin);
        return dataAdmin;

    } catch (error) {
        console.error('No se pudo guardar el usuario', error);
    }
}

export {postUser, postAdmins}