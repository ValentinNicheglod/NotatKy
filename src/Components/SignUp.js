import { TextField } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import FaceIcon from '@material-ui/icons/Face';
import "./css/Login.css"
import Logo from './Logo'
import { useHistory } from 'react-router';

const SignUp = ({condition}) => {

    const largeWidth = window.screen.width > 600

    const history = useHistory();

    useEffect(() => {
        if(sessionStorage.getItem('token') !== null){
            history.push('/home')
        }
    })

    return (
        <div className="login-bg full-height d-flex justify-content-center align-items-center row">
            {largeWidth && <Logo/>}
            <div className= "card-round card d-flex justify-content-center sign-up">
                <form>
                    <h3 className= "card-title d-flex justify-content-center">CREAR USUARIO</h3>
                    <hr />
                            <div className="all-center">
                                <img src="/svg/sign-up.svg" width="90%" alt="" className="mb-2" draggable="false"/>
                            </div>
                    <p className= "login-p">Completa el formulario con tus datos...</p>
                    <div className="d-flex align-items-end justify-content-between my-2">
                        <FaceIcon/>
                        <TextField 
                            className= "textfield name"
                            //icon= "user" 
                            //iconPosition= "left" 
                            label= "Nombre"
                        />
                        <TextField                         
                            className= "textfield name"
                            //icon= "user" 
                            //iconPosition= "left" 
                            label= "Apellido"
                        />
                    </div>
                    <div className="d-flex align-items-end justify-content-between my-2">
                        <AlternateEmailIcon/>
                        <TextField 
                            className= "textfield"
                            //icon= "mail" 
                            //iconPosition= "left" 
                            label= "Correo electrónico"
                        />
                    </div>
                    <div className="d-flex align-items-end justify-content-between my-2">
                        <VpnKeyIcon/>
                        <TextField                         
                            className= "textfield"
                            type="password"
                            //icon= "key" 
                            //iconPosition= "left" 
                            label= "Contraseña"
                        />
                    </div>
                    <div className="d-flex align-items-end justify-content-between my-2 mb-4">
                        <VpnKeyIcon/>
                        <TextField                         
                            className= "textfield"
                            type="password"
                            //icon= "key" 
                            //iconPosition= "left" 
                            label= "Repite la contraseña"
                        />
                    </div>
                    <div className="all-center">
                        <Button
                            color= "purple"
                            className= "textfield button my-2"
                            id= "login-submit"
                            type= "submit"
                        >
                            REGISTRARSE
                        </Button>
                    </div>
                </form>
                {/* <div className="textfield row m-1 login-bs">
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
                <div className= "my-1 textfield row d-flex justify-content-between login-bs">
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
                </div> */}
            </div>
            {/* <div className="login-logo position-absolute p-0">
                <img src= "logo-black.png" alt="logo" width="150" height="150" className= "login-logo position-absolute"/>
            </div> */}
        </div>
    )
}

export default SignUp