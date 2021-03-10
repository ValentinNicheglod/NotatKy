import React, {useState} from 'react'
import moment from 'moment';
import { Avatar} from 'antd';

const UserCard = ({user}) => {
    const [editing, setEditing] = useState('')

    const creationDate = user.createdAt && moment(user.createdAt.slice(0, 10), "YYYY-MM-DD").format("DD/MM/YYYY");

    return (
        <div className="card card-edit p-3">
        <Avatar className="mt-4 profile-userpic" size={170} src="/profile.jpeg"/>
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
            {user.name}
        </h1>
        <h1 className="display-6">
            {user.lastname}
        </h1>
        <div className="user-data-card w-100 my-4">
            <div className="my-2">
                <b className="d-inline px-2">Ocupación:&nbsp;&nbsp;</b>
                <p className="d-inline profile-usertitle-job">
                    {user.ocupation}
                </p>
            </div>
            <hr/>
            <div className="my-2">
                <b className="d-inline px-2">Miembro desde:</b>
                <p className="d-inline profile-usertitle-job">
                    {creationDate}
                </p>                            
            </div>
        </div>                   
    </div>
    )
}

export default UserCard
