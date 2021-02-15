import React, { /* useState */ } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Input } from 'semantic-ui-react'

import "./css/Login.css"
import Logo from './Logo'

const Login = ({condition}) => {
    //const [clicks, setClicks] = useState(0)
    return (
        <div className="login-bg full-height d-flex justify-content-center align-items-center row position-relative">
            <Logo/>
            <div className= "card-round card d-flex justify-content-center position-absolute">
                <form>
                    <h3 className= "card-title d-flex justify-content-center">INICIO DE SESIÓN</h3>
                    <hr />
                    <p className= "login-p">Ingresa con tu correo...</p>
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
                    <Button
                        color= "purple"
                        className= "total-width button my-2"
                        id= "login-submit"
                        type= "submit"
                        onClick={() => {}}
                    >
                        INICIAR SESIÓN
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
                    <p className= "login-p">Inicia sesión con...</p>
                    <Button className= "col-md-5 button google-btn my-2">
                        <Icon name= "google"/>
                        Google
                    </Button>
                    <Button
                        color= "facebook"
                        className= "col-md-5 button my-2"
                    >
                        <Icon name= "facebook"/>
                        Facebook
                    </Button>
                    
                </div>
                
                <div className= "login-sign-up total-width my-3 row">
                    <div className="col-md-3 p-0">
                        <hr/>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                        <p className= "login-p">¿No tienes cuenta?</p>
                    </div>
                    <div className="col-md-3 p-0">
                        <hr/>
                    </div>
                    <Link to="/sign-up" className="sign-up-btn ui btn mt-3 ">REGISTRATE</Link>
                    <Link 
                        to="/reset-password" 
                        className= "total-width d-flex justify-content-center my-2 login-p">
                            ¿Olvidaste tu contraseña?
                    </Link>
                </div>
            </div>
            <div className="login-logo position-absolute p-0">
                <img src= "logo-black.png" alt="logo" width="150" height="150" className= "login-logo position-absolute"/>
            </div>
        </div>
    )
}

export default Login
