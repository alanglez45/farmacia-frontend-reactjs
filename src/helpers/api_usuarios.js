export const getUsuarios = async (token) => {
    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios`;
        const resp = await fetch(url, {
            headers: {
                // 'input': busqueda,
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        const resultado = await resp.json();
        return resultado;
    } catch (error) {
        console.log(error)
    }
}

export const agregarUsuario = async (token, usuario) => {
    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios`;
        const resp = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        const resultado = await resp.json();
        return resultado;
    } catch (error) {
        console.log(error)
    }
}

export const editarUsuario = async (token, id, data) => {
    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${id}`;
        const resp = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        const resultado = await resp.json();
        return resultado;
    } catch (error) {
        console.log(error)
    }
}
export const eliminarUsuario = async (token, id) => {
    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${id}`;
        const resp = await fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        const resultado = await resp.json();
        return resultado;
    } catch (error) {
        console.log(error)
    }
}