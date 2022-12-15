import { useEffect, useState } from "react"
import { Table } from "../components/Table";
import { Navbar } from "../components/Navbar"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import useAuth from "../hooks/useAuth";

const customId = 'KAIQ8JDN12';

export const Buscador = () => {
    const { token, user } = useAuth();
    const [busqueda, setBusqueda] = useState('');
    const [medicamentos, setMedicamentos] = useState([]);
    const [medicamentoEliminar, setMedicamentoEliminar] = useState({});

    useEffect(() => {
        document.title = 'Farmacia Danahe – Buscador'
    }, []);

    const navigate = useNavigate();

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

    const agregarMedicamento = () => {
        navigate('/medicamento');
    }

    const onChangeInput = (valor) => {
        setBusqueda(valor);
    }

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            if (busqueda.length > 0) {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/medicamentos`;
                const resp = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'input': busqueda,
                        'Content-Type': 'application/json',
                    }
                });
                const resultado = await resp.json();
                if (resultado.ok) {
                    setMedicamentos(resultado.medicamentos);
                } else {
                    toast.error(resultado.msj, {
                        toastId: customId
                    });
                }
            }
        } catch (error) {
            console.log(error)
        }


    }

    const getMedicamentosTodos = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/medicamentos/all`;
            const resp = await fetch(url);
            const resultado = await resp.json();

            if (resultado.ok) {
                setMedicamentos(resultado.medicamentos);
            } else {
                toast.error(resultado.msj);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const limpiarBusqueda = () => {
        setMedicamentos([]);
        setBusqueda('');
    }

    const cerrarModal = (e) => {
        if (e) {
            e.stopPropagation();
        }
        setMedicamentoEliminar({})
    }

    const eliminarMedicamento = (e) => {
        e.stopPropagation();
        eliminarMedicamentoApi();
        cerrarModal();
    }

    const eliminarMedicamentoApi = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/medicamentos/${medicamentoEliminar.id}`
            const resp = await fetch(url, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
            const resultado = await resp.json();

            if (resultado.ok) {
                setMedicamentos(medicamentos.filter(med => {

                    return med.id !== medicamentoEliminar.id
                }))
                toast.success(resultado.msj);
            } else {
                toast.error(resultado.msj);
            }

            cerrarModal();

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Navbar />
            <div className="med-ctrls">
                <form className="busqueda-form" onSubmit={submitForm}>
                    <div className="busqueda-ctrls">
                        <input type="text" placeholder="Búsqueda" value={busqueda} onChange={(e) => onChangeInput(e.target.value)} />
                        <button type="submit" className="btn btn-loupe">
                            <i className="fa-solid fa-magnifying-glass"> </i>
                        </button>
                    </div>
                </form>
                <div className="button-group">
                    <button className="btn" onClick={getMedicamentosTodos}>
                        <i className="fa-solid fa-earth-americas"></i>
                        Todos
                    </button>
                    <button className="btn" onClick={limpiarBusqueda}>
                        <i className="fa-solid fa-broom"></i>
                        Limpiar
                    </button>
                    {
                        (rol !== 'Visitante') &&
                        <button className="btn" onClick={agregarMedicamento}>
                            <i className="fa-solid fa-plus"></i>
                            Agregar
                        </button>
                    }

                </div>
            </div>

            {
                medicamentos?.length > 0 ?

                    <Table medicamentos={medicamentos} setMedicamentoEliminar={setMedicamentoEliminar} />

                    :
                    <h2 className="sugerencia-buscador">Realiza una búsqueda del medicamento ya sea por su nombre comercial o principio activo.</h2>
            }

            {
                medicamentoEliminar?.id && (
                    <div className="fondo-eliminar" onClick={cerrarModal}>
                        <div className="card-eliminar" onClick={(e) => {
                            e.stopPropagation();
                        }}>
                            <p className="card-eliminar-mensaje">¿Seguro que desea eliminar el siguiente medicamento?</p>
                            <p className="eliminar-medicamento">Nombre: <span>{medicamentoEliminar.nombre}</span></p>
                            <p className="eliminar-formula">Principio Activo: <span>{medicamentoEliminar.principioActivo}</span></p>
                            <div className="btns-eliminar">
                                <p className="btn btn-cancelar" onClick={cerrarModal}>Cancelar</p>
                                <p className="btn btn-eliminar" onClick={eliminarMedicamento}>Eliminar</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
