import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom"
import { parseJwt } from "../helpers/functions";
import useAuth from "../hooks/useAuth";
import { toast } from 'react-toastify';

const customId = 'MXDKZQ82IKA'


export const PrivateRoute = ({ children, roles }) => {


    const { user, token, logged, logout } = useAuth();
    const { pathname } = useLocation();
    let rol = '';

    if (user) {
        switch (user.Role.code) {
            case import.meta.env.VITE_ADMIN:
                rol = 'Administrador';
                break;
            case import.meta.env.VITE_USER:
                rol = 'Usuario';
                break;
            case import.meta.env.VITE_VISITOR:
                rol = 'Visitante';
                break;

            default:
                break;
        }
    }





    useEffect(() => {
        if (token) {
            const { exp } = parseJwt(token);
            const fechaExpiracionToken = exp * 1000;
            const fechaActual = Date.now();

            if (fechaActual > fechaExpiracionToken) {
                toast.info('La sesión expiró, vuelva a iniciar sesión.', {
                    toastId: customId
                });
                const timeout = setTimeout(() => {
                    localStorage.clear();
                    logout();
                }, 5000);
                return () => {
                    clearTimeout(timeout);
                };
            }
        }
    }, [pathname]);

    if (!logged) {
        return <Navigate to={'/login'} />

    }

    if (roles.includes(rol)) {
        return children;
    } else {
        return <Navigate to={'/'} />
    }

}



