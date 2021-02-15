import React from 'react'
import { Button, Input } from 'semantic-ui-react'

import "./css/Login.css"
import Logo from './Logo'

const ResetPassword = ({condition}) => {
    return (
        <div className="login-bg full-height d-flex justify-content-center align-items-center row position-relative">
            <Logo/>
            <div className="d-flex full-height justify-content-center align-items-center">
                <div className= "reset-pw card d-flex p-5 justify-content-center" >
                    <form className="">
                        <h3 className= "card-title d-flex justify-content-center">REESTABLECE TU CONTRASEÑA</h3>
                        <hr />
                        <p className= "login-p">Te enviaremos un correo electrónico para que puedas reestablecer tu contraseña...</p>
                        <Input 
                            className= "my-2 total-width"
                            icon= "user" 
                            iconPosition= "left" 
                            placeholder= "Correo electrónico"
                        />
                        <Button
                            color= "purple"
                            className= "total-width button my-2"
                            id= "login-submit"
                            type= "submit"
                        >
                            ENVIAR
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword