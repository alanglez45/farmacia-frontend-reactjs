import { Route, Routes } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { Buscador } from "../pages/Buscador"
import { Login } from "../pages/Login"
import { Medicamento } from "../pages/Medicamento"
import { NotFound } from "../pages/NotFound"
import { Usuarios } from "../pages/Usuarios"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"



export const RouterApp = () => {
    return (
        <>
            <Routes>

                <Route path='/login' element={<PublicRoute />} >
                    <Route index element={< Login />} />
                </Route>

                <Route
                    path="/"
                    element={
                        <PrivateRoute roles={['Administrador', 'Usuario', 'Visitante']}>
                            <Buscador />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/usuarios"
                    element={
                        <PrivateRoute roles={['Administrador']}>
                            <Usuarios />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/medicamento"
                    element={
                        <PrivateRoute roles={['Administrador', 'Usuario']}>
                            <Medicamento />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/medicamento:id"
                    element={
                        <PrivateRoute roles={['Administrador', 'Usuario']}>
                            <Medicamento />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="*"
                    element={
                        <NotFound />
                    }
                />

            </Routes>
        </>
    )
}
