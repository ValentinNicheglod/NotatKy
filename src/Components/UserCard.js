import React, {useState} from 'react'
import { Avatar} from 'antd';

const UserCard = () => {
    const [editing, setEditing] = useState('')

    return (
        <div className="card card-edit p-3">
        <Avatar className="mt-4" size={170} src="svg/card-img-1.svg"/>
        <hr/>
        {
            editing === "profilePicture"
            ? <>
                <input 
                    className="form-control form-control-sm mb-3" 
                    id="formFileSm" type="file" 
                    accept="image/*"
                />
                <div className="d-flex justify-content-around w-100">
                <button className="btn btn-round my-2 btn-outline-success">
                    Guardar
                </button>
                <button className="btn btn-round my-2 btn-outline-danger">
                    Eliminar
                </button>
                <button 
                    className="btn btn-round my-2 btn-outline-dark"
                    onClick={() => setEditing("")}
                >
                    Cancelar
                </button>
                </div>
            </>
            : <button 
                className="btn btn-round my-1 btn-sm btn-outline-primary"
                onClick={() => setEditing("profilePicture")}
            >
                Editar foto de perfil
            </button>
        }
        <h1 className="display-6">
            Valentín
        </h1>
        <h1 className="display-6">
            Nicheglod
        </h1>
        <div className="user-data-card w-100 my-4">
            <div className="my-2">
                <b className="d-inline px-2">Ocupación:&nbsp;&nbsp;</b>
                <p className="d-inline profile-usertitle-job">
                    Developer
                </p>
            </div>
            <hr/>
            <div className="my-2">
                <b className="d-inline px-2">Miembro desde:</b>
                <p className="d-inline profile-usertitle-job">
                    12/06/20
                </p>                            
            </div>
        </div>                   
    </div>
    )
}

export default UserCard
