import { useNavigate } from "react-router-dom"

export const Table = ({ medicamentos, setMedicamentoEliminar }) => {

    const navigate = useNavigate();

    const editarMedicamento = (id) => {

        const medicamentoSeleccionado = medicamentos.find(med => med.id === id);

        let valor = '';
        let cadenaFinal = '';
        Object.entries(medicamentoSeleccionado).forEach((row, i) => {
            valor = row[0] + '=' + row[1];
            if (i < Object.entries(medicamentoSeleccionado).length - 1) {
                valor = valor + '&';
            }
            if (i > 0) {
                cadenaFinal = cadenaFinal + valor;
            }

        });
        navigate(`/medicamento/${id}?${cadenaFinal}`);
    }

    const borrarMedicamento = (id) => {
        const medicamento = medicamentos.find(med => med.id === id);
        setMedicamentoEliminar(medicamento);
    }


    if (window.innerWidth > 1099) {
        return (
            <table className="med-table">
                <thead>
                    <tr>
                        <th>Nombre Comercial</th>
                        <th>Principio Activo</th>
                        <th>Tipo</th>
                        <th>Unidad</th>
                        <th>Lugar</th>
                        <th>Nivel</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        medicamentos.map(med => (
                            <tr key={med.id}>
                                <td>{med.nombre}</td>
                                <td>{med.principioActivo}</td>
                                <td>{med.tipo}</td>
                                <td>{med.unidad}</td>
                                <td>{med.lugar}</td>
                                <td>{med.nivel}</td>
                                <td>${med.precio}</td>
                                <td><i className="fa-solid fa-pen-to-square" onClick={() => editarMedicamento(med.id)}></i></td>
                                <td><i className="fa-solid fa-trash" onClick={() => borrarMedicamento(med.id)}></i></td>
                            </tr>

                        ))
                    }
                </tbody>
            </table>
        )
    } else {
        return (
            <>
                {
                    medicamentos.map(med => (
                        <div className="mobile-table" key={med.id}>
                            <div>
                                <p className="categoria">Nombre</p>
                            </div>
                            <div>
                                <p>{med.nombre}</p>
                            </div>

                            <div>
                                <p className="categoria">Principio Activo</p>
                            </div>
                            <div>
                                <p>{med.principioActivo}</p>
                            </div>

                            <div>
                                <p className="categoria">Tipo</p>
                            </div>
                            <div>
                                <p>{med.tipo}</p>
                            </div>

                            <div>
                                <p className="categoria">Unidad</p>
                            </div>
                            <div>
                                <p>{med.unidad}</p>
                            </div>

                            <div>
                                <p className="categoria">Lugar</p>
                            </div>
                            <div>
                                <p>{med.lugar}</p>
                            </div>

                            <div>
                                <p className="categoria">Nivel</p>
                            </div>
                            <div>
                                <p>{med.nivel}</p>
                            </div>

                            <div>
                                <p className="categoria">Precio</p>
                            </div>
                            <div>
                                <p>${med.precio}</p>
                            </div>
                            <div>
                                <p className="mobile-table-icons"><i className="fa-solid fa-pen-to-square" onClick={() => editarMedicamento(med.id)}></i></p>
                            </div>
                            <div>
                                <p className="mobile-table-icons"><i className="fa-solid fa-trash" onClick={() => borrarMedicamento(med.id)}></i></p>
                            </div>

                        </div>
                    ))
                }

            </>
        )
    }


}
