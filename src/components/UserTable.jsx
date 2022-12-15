import { getRole } from "../helpers/functions"

export const UserTable = ({ usuarios, mostrarFormulario, setEditandoUsuario, setUsuarioEliminar, }) => {

    if (window.innerWidth > 767) {
        return (
            <table className="tabla-usuarios">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map(user => (
                            <tr key={user.id}>
                                <td>{`${user.nombre} ${user.apellido}`}</td>
                                <td>{user.correo}</td>
                                <td>{getRole(user.Role.code)}</td>
                                <td><i className="fa-solid fa-pen-to-square" onClick={() => setEditandoUsuario(user)}></i></td>
                                <td><i className="fa-solid fa-trash" onClick={() => setUsuarioEliminar(user)}></i></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    } else {
        return (
            <div className={`${!mostrarFormulario ? "ocultar" : ""}`}>
                {
                    usuarios.map(user => (
                        <div className="usuarios-tabla-mobile" key={user.id}>
                            <p className="categoria">Nombre</p>
                            <p className="usuarios-tabla-mobile-data">{`${user.nombre} ${user.apellido}`}</p>
                            <p className="categoria">Correo</p>
                            <p className="usuarios-tabla-mobile-data">{user.correo}</p>
                            <p className="categoria">Rol</p>
                            <p className="usuarios-tabla-mobile-data">{getRole(user.Role.code)}</p>
                            <div className="usuarios-tabla-mobile-ctrls">
                                <div>
                                    <p className="mobile-table-icons"><i className="fa-solid fa-pen-to-square" onClick={() => setEditandoUsuario(user)}></i></p>
                                </div>
                                <div>
                                    <p className="mobile-table-icons"><i className="fa-solid fa-trash" onClick={() => setUsuarioEliminar(user)}></i></p>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>


        )
    }

}
