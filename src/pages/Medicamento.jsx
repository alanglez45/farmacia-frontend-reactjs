import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { toast } from 'react-toastify';
import { useForm } from "../hooks/useForm";
import queryString from 'query-string';
import useAuth from "../hooks/useAuth";


export const Medicamento = () => {
    const navigate = useNavigate();
    const { token } = useAuth();

    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const medicamento = queryString.parse(location.search);

    const { nombre, principioActivo, tipo, unidad, lugar, nivel, precio, onInputChange, formState, onResetForm } = useForm({
        nombre: medicamento.nombre || '',
        principioActivo: medicamento.principioActivo || '',
        tipo: medicamento.tipo || '',
        unidad: medicamento.unidad || '',
        lugar: medicamento.lugar || '',
        nivel: medicamento.nivel || '',
        precio: medicamento.precio || ''
    });

    useEffect(() => {
        document.title = `Farmacia Danahe – ${id ? 'Modificar Medicamento' : 'Agregar Medicamento'}`;
    }, []);


    const onSubmitForm = (e) => {
        e.preventDefault();
        llamarAPI();
    }

    const llamarAPI = async () => {
        // Actualizar
        if (id) {
            editarMedicamento();

        } else {
            // Agregar
            if (Object.values(formState).includes('')) {
                toast.error('Todos los campos son obligatorios');
                return;
            }
            agregarMedicamento();
        }
    }

    const agregarMedicamento = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/medicamentos/`
            const resp = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formState),
            });
            const resultado = await resp.json();
            if (resultado.ok) {
                toast.success(resultado.msj);
            } else {
                if (resultado.msj) {
                    toast.error(resultado.msj);
                } else {
                    if (resultado.errors?.errors) {
                        toast.error('Todos los campos son obligatorios. Revise bien sus entradas.');
                    }
                }
            }

            setTimeout(() => {
                onResetForm();
            }, 2500);
        } catch (error) {
            console.log(error)
        }
    }

    const editarMedicamento = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/medicamentos/${id}`
            const resp = await fetch(url, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formState),
            });
            const resultado = await resp.json();

            if (resultado.ok) {
                toast.success(resultado.msj);
            } else {
                if (resultado.msj) {
                    toast.error(resultado.msj);
                } else {
                    if (resultado.errors?.errors) {
                        toast.error('Todos los campos son obligatorios. Revise bien sus entradas.');
                    }
                }
            }


            setTimeout(() => {
                onResetForm();
                navigate('/');

            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }



    const anaqueles = ['Gaveta'];
    for (let i = 1; i < 11; i++) {
        anaqueles.push(`Anaquel-${i}`);
    }
    const niveles = [1, 2, 3, 4];


    return (
        <>
            <Navbar />
            <h1 className="titulo-medicamento">{id ? 'Modificar Medicamento' : 'Agregar Medicamento'}</h1>

            <form className="formulario-medicamentos" onSubmit={onSubmitForm}>
                <div className="campo">
                    <label htmlFor="nombre">Nombre Comercial</label>
                    <input type="text" id="nombre" placeholder="Quitadol" name="nombre" value={nombre} onChange={onInputChange} />
                </div>
                <div className="campo">
                    <label htmlFor="principioActivo">Principio Activo</label>
                    <input type="text" id="principioActivo" placeholder="Paracetamol" name="principioActivo" value={principioActivo} onChange={onInputChange} />
                </div>
                <div className="campo">
                    <label htmlFor="tipo">Tipo</label>
                    <input type="text" id="tipo" placeholder="Tabletas" name="tipo" value={tipo} onChange={onInputChange} />
                </div>
                <div className="campo">
                    <label htmlFor="unidad">Unidad</label>
                    <input type="text" id="unidad" placeholder="750 mg" name="unidad" value={unidad} onChange={onInputChange} />
                </div>
                <div className="campo">
                    <label htmlFor="">Lugar</label>
                    <select
                        name="lugar"
                        value={lugar}
                        onChange={onInputChange}
                    >
                        <option value="null">-- Seleccionar --</option>
                        {
                            anaqueles.map(lugar => (
                                <option key={lugar} value={lugar}>{lugar}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="campo">
                    <label htmlFor="">Nivel</label>
                    <select
                        name="nivel"
                        value={nivel}
                        onChange={onInputChange}
                    >
                        <option value="null">-- Seleccionar --</option>
                        {
                            niveles.map(nivel => (
                                <option key={nivel} value={nivel}>{nivel}</option>

                            ))
                        }
                    </select>
                </div>
                <div className="campo">
                    <label htmlFor="precio">Precio</label>
                    <input id="precio" type="number" placeholder="$100" name="precio" value={precio} onChange={onInputChange} />
                </div>

                <div className="campo">
                    <input className="btn" type="submit" value={`${id ? "Guardar Cambios" : "Enviar"}`} onClick={onSubmitForm} />
                </div>
            </form>
        </>
    )
}
