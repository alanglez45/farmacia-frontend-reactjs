import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth";

export const PublicRoute = () => {
    const { logged } = useAuth();
    return (
        <>
            {
                !logged
                    ? < Outlet />
                    : <Navigate to={'/'} />
            }

        </>
    )
}
