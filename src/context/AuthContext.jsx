import { createContext, useReducer } from "react";
import { toast } from "react-toastify";
import { authReducer, initialState } from "../reducer/authReducer";

const AuthContext = createContext(initialState);

const init = () => {
    const user = JSON.parse(localStorage.getItem('user')) || '';
    const token = JSON.parse(localStorage.getItem('token')) || '';
    const logged = JSON.parse(localStorage.getItem('logged')) || false;

    return {
        logged,
        token,
        user
    }
}

const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, initialState, init);


    const login = (credential) => {
        const action = {
            type: 'LOG_IN',
            payload: credential

        }
        dispatch(action);
    }
    const logout = () => {
        const action = {
            type: 'LOG_OUT',
        }
        localStorage.clear();
        dispatch(action);
    }

    const iniciarSesionAPI = async (correo, password) => {
        const crendential = { correo, password };
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/login`;
            const resp = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(crendential),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const resultado = await resp.json();

            if (resultado.ok) {
                localStorage.setItem('user', JSON.stringify(resultado.usuario));
                localStorage.setItem('token', JSON.stringify(resultado.token));
                localStorage.setItem('logged', JSON.stringify(true));

                toast.success('Iniciando Sesión...', {
                    autoClose: 2000
                })
                setTimeout(() => {
                    login(resultado);
                }, 3000);
            } else {
                toast.success(resultado.msj)
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <AuthContext.Provider value={{
            user: state.user,
            token: state.token,
            logged: state.logged,
            logout,
            iniciarSesionAPI,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}


export default AuthContext;