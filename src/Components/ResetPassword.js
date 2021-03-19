import { TextField } from '@material-ui/core'
import React from 'react'
import { Button } from 'semantic-ui-react'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';


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
                        <div className="d-flex align-items-end justify-content-between my-2">
                        <AlternateEmailIcon/>
                        <TextField
                            className= "textfield"
                            //icon= "mail" 
                            //iconPosition= "left" 
                            label= "Correo electrónico"
                        />
                    </div>
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