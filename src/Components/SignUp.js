import React from 'react'
import { Button, Icon, Input } from 'semantic-ui-react'

import "./css/Login.css"
import Logo from './Logo'

const SignUp = ({condition}) => {
    return (
        <div className="login-bg full-height d-flex justify-content-center align-items-center row position-relative">
            <Logo/>
            <div className= "card-round card d-flex justify-content-center position-absolute">
                <form>
                    <h3 className= "card-title d-flex justify-content-center">CREAR USUARIO</h3>
                    <hr />
                    <p className= "login-p">Completa el formulario con tus datos...</p>
                    <Input 
                        className= "my-2 total-width"
                        icon= "user" 
                        iconPosition= "left" 
                        placeholder= "Nombre"
                    />
                    <Input                         
                        className= "my-2 total-width"
                        icon= "user" 
                        iconPosition= "left" 
                        placeholder= "Apellido"
                    />
                    <Input 
                        className= "my-2 total-width"
                        icon= "mail" 
                        iconPosition= "left" 
                        placeholder= "Correo electrónico"
                    />
                    <Input                         
                        className= "my-2 total-width"
                        icon= "key" 
                        iconPosition= "left" 
                        placeholder= "Contraseña"
                    />
                    <Input                         
                        className= "my-2 total-width"
                        icon= "key" 
                        iconPosition= "left" 
                        placeholder= "Repite la contraseña"
                    />
                    <Button
                        color= "purple"
                        className= "total-width button my-2"
                        id= "login-submit"
                        type= "submit"
                    >
                        REGISTRARSE
                    </Button>
                </form>
                <div className="total-width row m-1 login-bs">
                    <div className="col-md-5 p-0">
                        <hr/>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center">
                        <p className= "login-p">o</p>
                    </div>
                    <div className="col-md-5 p-0">
                        <hr/>
                    </div>
                </div>
                <div className= "my-1 total-width row d-flex justify-content-between login-bs">
                    <Button className= "col-md-5 button google-btn my-2">
                        <Icon name= "google"/>
                        Continúa con Google
                    </Button>
                    <Button
                        color= "facebook"
                        className= "col-md-5 button my-2"
                    >
                        <Icon name= "facebook"/>
                        Continúa con Facebook
                    </Button>
                </div>
            </div>
            <div className="login-logo position-absolute p-0">
                <img src= "logo-black.png" alt="logo" width="150" height="150" className= "login-logo position-absolute"/>
            </div>
        </div>
    )
}

export default SignUp