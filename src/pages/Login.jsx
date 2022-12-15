import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { validarEmail, validarPassword } from "../helpers/functions";
import useAuth from "../hooks/useAuth";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailStatus, setEmailStatus] = useState(null);
    const [passwordStatus, setPasswordStatus] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const { iniciarSesionAPI, msj } = useAuth();

    useEffect(() => {
        document.title = 'Farmacia Danahe';
    }, []);

    useEffect(() => {
        if (msj) {
            toast.error(msj);
        }

    }, [msj])


    const changeCorreo = (email) => {
        setEmail(email);
    }
    const changePassword = (password) => {
        setPassword(password);
    }

    const mostrarPassword = () => {
        setPasswordVisible(!passwordVisible);
    }

    const submitForm = (e) => {
        e.preventDefault();

        if ([email, password].includes('')) {
            setEmailStatus(false);
            setPasswordStatus(false);
            toast.error("Todos los campos son obligatorios");
            return;
        }

        if (!validarEmail(email)) {
            setEmailStatus(false);
            toast.error("El correo debe incluir el carácter @ y un dominio");
        } else {
            setEmailStatus(true);
        }

        if (!validarPassword(password)) {
            toast.error("La contraseña debe incluir una mayuscula, una miniscula, un número y una longitud de 8 caracteres");
            setPasswordStatus(false);
        } else {
            setPasswordStatus(true);
        }

        iniciarSesionAPI(email, password);

    }


    return (
        <>
            <div className="bg-body">
                <div className="logo">
                    <img src="/img/Negro.png" alt="Logotipo de Farmacia Danahe" />
                </div>
                <div className="login">
                    <div className="div-img">
                        <img src="/img/medecines.jpg" alt="Imagén de medicinas" />
                    </div>
                    <div className="div-form">
                        <div className="login-titulo">
                            <h1 className="">Bienvenido,</h1>
                            <p>Inicie sesión para continuar</p>
                        </div>
                        <form onSubmit={submitForm}>
                            <label htmlFor="email">Correo</label>
                            <input
                                className={emailStatus === true ? 'input-success' : emailStatus === false ? 'input-error' : ''}
                                type="text"
                                placeholder="correo@correo.com"
                                name="email"
                                id="email"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => changeCorreo(e.target.value)}
                            />
                            <div className="input-password">
                                <label htmlFor="password">Contraseña</label>
                                <p className="icono" onClick={mostrarPassword} >

                                    <i className={`fa-solid fa-eye${passwordVisible ? '-slash' : ""}`}></i>
                                    {/* <i className="fa-solid fa-eye-slash"></i> */}
                                </p>
                            </div>
                            <input
                                className={passwordStatus === true ? 'input-success' : passwordStatus === false ? 'input-error' : ''}
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="******"
                                id="password"
                                name="password"
                                autoComplete="off"
                                value={password}
                                onChange={(e) => changePassword(e.target.value)}
                            />
                            <button className="btn-login" type="submit">Iniciar Sesión</button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
