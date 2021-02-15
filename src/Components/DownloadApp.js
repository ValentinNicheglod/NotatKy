import React from 'react'
import { Link } from 'react-router-dom'

import "./css/Login.css"

const DownloadApp = () => {
    return (
        <div className="login-bg full-height d-flex justify-content-center row p-5">
            <img src= "svg/working.svg" alt="icon" width="500" height="500"/> 
            <h3 className= "d-flex justify-content-center white">¡Nuestra aplicación se encuentrá en producción!</h3>
            <h5 className= "d-flex justify-content-center white">Te enviaremos un correo electrónico cuando hayamos finalizado</h5>
            <Link className= "d-flex justify-content-center link-btn btn-round" to="/" >VOLVER AL INICIO</Link>
        </div>
    )
}

export default DownloadApp
