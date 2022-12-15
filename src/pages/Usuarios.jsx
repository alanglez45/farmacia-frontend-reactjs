import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar"
import { useForm } from "../hooks/useForm";
import { getUsuarios, agregarUsuario, editarUsuario, eliminarUsuario } from '../helpers/api_usuarios'
import useAuth from "../hooks/useAuth";
import { UserTable } from "../components/UserTable";
import { toast } from 'react-toastify';
import { getKindOfRole, validarEmail, validarNombre, validarPassword } from "../helpers/functions";


const customId = 'LODA89KSHE7'

export const Usuarios = () => {
    const { token } = useAuth();
    const [usuarios, setUsuarios] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [editandoUsuario, setEditandoUsuario] = useState({});
    const [usuarioEliminar, setUsuarioEliminar] = useState({});
    const { nombre, apellido, correo, password, rol, formState, setFormState, onResetForm, onInputChange } = useForm({
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        rol: ''
    });

    useEffect(() => {
        document.title = 'Farmacia Danahe – Usuarios';
        getUsuariosAPI();
    }, []);


    useEffect(() => {
        if (window.innerWidth < 768) {
            onShowingForm();
        }

        if (editandoUsuario.id) {
            setFormState({
                nombre: editandoUsuario.nombre || '',
                apellido: editandoUsuario.apellido || '',
                correo: editandoUsuario.correo || '',
                password: '',
                rol: getKindOfRole(editandoUsuario.Role.code)
            })
        }
    }, [editandoUsuario])

    const onShowingForm = () => {
        setMostrarFormulario(!mostrarFormulario);
    }

    const getUsuariosAPI = async () => {
        const resultado = await getUsuarios(token);
        if (resultado.ok) {
            setUsuarios(resultado.usuarios);
        } else {
            toast.error(resultado.msj, {
                toastId: customId
            });
        }
    }
    const agregarUsuarioAPI = async () => {
        const resultado = await agregarUsuario(token, formState);
        if (resultado.ok) {
            setUsuarios([...usuarios, resultado.usuario]);
            onResetForm();
        } else {
            toast.error(resultado.msj);
        }
    }

    const editarUsuarioAPI = async () => {
        const body = { ...formState };
        Object.entries(body).forEach(row => {
            if (row[1] === '') {
                delete body[row[0]];
            }
        })

        const resultado = await editarUsuario(token, editandoUsuario.id, body);
        if (resultado.ok) {
            const usuariosActualizados = usuarios.map(user => (
                user.id === editandoUsuario.id ? resultado.usuario : user
            ));
            setUsuarios(usuariosActualizados);
            setEditandoUsuario({});
            onResetForm();
        } else {
            toast.error(resultado.msj);
        }
    }

    const eliminarUsuarioAPI = async () => {
        const resultado = await eliminarUsuario(token, usuarioEliminar.id);
        if (resultado.ok) {
            toast.success(resultado.msj);

            setUsuarios(usuarios.filter(user => {
                return user.id !== usuarioEliminar.id
            }))
        } else {
            toast.error(resultado.msj);
        }
        cerrarModal();
    }


    const onSubmitForm = (e) => {
        e.preventDefault();
        if (editandoUsuario?.id) {

            if (validarActualizarUsuario()) {
                editarUsuarioAPI();
            }

        } else {
            if (Object.values(formState).includes('')) {
                toast.error('Todos los campos son obligatorios');
            } else {
                if (validarCampos()) {
                    agregarUsuarioAPI();
                }
            }
        }

    }

    const cerrarModal = (e) => {
        if (e) {
            e.stopPropagation();
        }
        setUsuarioEliminar({})
    }

    const validarCampos = () => {
        let flag = true;
        if (!validarNombre(nombre)) {
            toast.error('El nombre debe iniciar con mayúscula.');
            flag = false;
        }

        if (!validarNombre(apellido)) {
            toast.error('El apellido debe iniciar con mayúscula.');
            flag = false;
        }
        if (!validarEmail(correo)) {
            toast.error('El correo debe contener el caracter @ y un dominio.');
            flag = false;
        }
        if (!validarPassword(password)) {
            toast.error('La contraseña debe tener una longitud de 8 caracteres.');
            toast.error('La contraseña debe contener al menos una letra en mayúscula, una letra minúscula y un número.');
            flag = false;
        }
        return flag;
    }

    const validarActualizarUsuario = () => {
        let flag = true;
        if (editandoUsuario.nombre !== nombre) {
            if (!validarNombre(nombre)) {
                toast.error('El nombre debe iniciar con mayúscula.');
                flag = false;
            }
        }
        if (editandoUsuario.apellido !== apellido) {
            if (!validarNombre(apellido)) {
                toast.error('El apellido debe iniciar con mayúscula.');
                flag = false;
            }
        }
        if (editandoUsuario.correo !== correo) {
            if (!validarEmail(correo)) {
                toast.error('El correo debe contener el caracter @ y un dominio.');
                flag = false;
            }
        }
        if (password !== '') {
            if (!validarPassword(password)) {
                toast.error('La contraseña debe tener una longitud de 8 caracteres.');
                toast.error('La contraseña debe contener al menos una letra en mayúscula, una letra minúscula y un número.');
                flag = false;
            }
        }
        return flag;
    }

    return (
        <>
            <Navbar />

            <main className="seccion-usuarios">
                <div className="usuarios-header">
                    <h1>Usuarios</h1>
                    <div className="usuarios-ctrls">
                        <button className="btn" onClick={() => {

                            setMostrarFormulario(true);

                            setEditandoUsuario({});
                            onResetForm();
                        }}>
                            <i className="fa-solid fa-plus"></i>
                            Agregar Usuario
                        </button>
                        <button className="btn btn-usuarios" onClick={onShowingForm}>
                            <i className="fa-solid fa-arrows-left-right"></i>
                        </button>
                    </div>
                </div>

                <div className="usuarios-flex">
                    <div>
                        <UserTable usuarios={usuarios} mostrarFormulario={mostrarFormulario} setEditandoUsuario={setEditandoUsuario} setUsuarioEliminar={setUsuarioEliminar} />
                    </div>

                    <div className={`${window.innerWidth < 768 ? !mostrarFormulario ? "" : "ocultar" : ''}`}>
                        <h2 className="usuarios-subtitulo">{`${editandoUsuario?.id ? 'Editar Usuario' : 'Agregar Usuario'}`}</h2>
                        <form onSubmit={onSubmitForm}>

                            <div className="campo">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" id="nombre" placeholder="John" name="nombre" value={nombre} onChange={onInputChange} />
                            </div>
                            <div className="campo">
                                <label htmlFor="apellido">Apellido</label>
                                <input type="text" id="apellido" placeholder="Doe" name="apellido" value={apellido} onChange={onInputChange} />
                            </div>
                            <div className="campo">
                                <label htmlFor="correo">Correo</label>
                                <input type="text" id="correo" placeholder="correo@correo.com" name="correo" value={correo} onChange={onInputChange} />
                            </div>
                            <div className="campo">
                                <div className="input-password">
                                    <label htmlFor="password">Contraseña</label>
                                    <p className="icono">
                                        <i className={`fa-solid fa-eye${passwordVisible ? '-slash' : ""}`} onClick={() => setPasswordVisible(!passwordVisible)}></i>
                                    </p>
                                </div>

                                <input type={passwordVisible ? 'text' : 'password'} id="password" placeholder="*****" name="password" value={password} onChange={onInputChange} />
                            </div>
                            <div className="campo">
                                <label htmlFor="rol">Rol</label>
                                <select
                                    id="rol"
                                    name="rol"
                                    value={rol}
                                    onChange={onInputChange}
                                >
                                    <option value="" disabled={editandoUsuario.id}>-- Seleccionar --</option>
                                    <option value="ADMIN_ROLE">Administrador</option>
                                    <option value="VISITOR_ROLE">Visitante</option>
                                    <option value="USER_ROLE">Usuario</option>
                                </select>
                            </div>
                            <div className="campo">
                                <input type="submit" value={`${editandoUsuario?.id ? 'Guardar Cambios' : 'Enviar'}`} onClick={onSubmitForm} />
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            {
                usuarioEliminar?.id && (
                    <div className="fondo-eliminar" onClick={cerrarModal}>
                        <div className="card-eliminar" onClick={(e) => {
                            e.stopPropagation();
                        }}>
                            <p className="card-eliminar-mensaje">¿Seguro que desea eliminar el siguiente usuario?</p>
                            <p className="eliminar-medicamento">Nombre: <span>{`${usuarioEliminar.nombre} ${usuarioEliminar.apellido}`}</span></p>
                            <p className="eliminar-formula">Correo: <span>{usuarioEliminar.correo}</span></p>
                            <div className="btns-eliminar">
                                <p className="btn btn-cancelar" onClick={cerrarModal}>Cancelar</p>
                                <p className="btn btn-eliminar" onClick={eliminarUsuarioAPI}>Eliminar</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
