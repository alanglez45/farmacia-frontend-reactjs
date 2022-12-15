import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { generarFecha } from "../helpers/functions";
import useAuth from "../hooks/useAuth";



export const Navbar = () => {

    const { user, logout } = useAuth();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const location = useLocation();

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    }

    let rol = '';
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

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', {
            replace: true
        });
    }

    return (
        <header>
            <nav>
                <div className="farmacia-logo">
                    <img src="/img/Negro.png" alt="Logotipo de Farmacia Danahe" />
                </div>
                <p className="hora-text">{generarFecha()}</p>
                <div className="menu-dropdown-button">
                    <p className="dropbtn" onClick={toggleDropdown}>
                        {`${user.nombre}  ${user.apellido}`}
                        {
                            !dropdownVisible
                                ? <i className="fa-solid fa-caret-down"></i>
                                : <i className="fa-solid fa-caret-up"></i>
                        }

                    </p>
                    <div className={`menu-ctrls-list ${!dropdownVisible ? 'hidden' : ''}`}>

                        <ul>
                            <li><i className="fa-solid fa-user"></i>{rol}</li>
                            <li><i className="fa-solid fa-envelope"></i>{user.correo}</li>
                        </ul>
                        {
                            (rol === 'Administrador' && location.pathname.split('/')[1] !== 'usuarios') &&
                            <Link to='/usuarios'><i className="fa-solid fa-users"></i>Usuarios</Link>
                        }
                        {
                            location.pathname !== '/' &&
                            <Link to='/'><i className="fa-solid fa-magnifying-glass"></i>Buscador</Link>
                        }

                        <Link to='/login' onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i>Cerrar Sesión</Link>

                    </div>
                </div>
            </nav>
        </header>
    )
}
