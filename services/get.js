
async function getUsers() {
    try {
        const response = await fetch('http://localhost:3001/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching users');
        }

        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}




async function GetAdmins() {
    try {
        let response = await fetch('http://localhost:3001/admins');
        
        if (!response.ok) {
            throw new Error('No sirve');
        }
        
        let dataAdmin = await response.json();
        console.log(dataAdmin);       
        return dataAdmin;

    } catch (error) {
        console.error('No sirve la cochinada de este fetch', error);
    }
}

export {GetAdmins}

export { getUsers };