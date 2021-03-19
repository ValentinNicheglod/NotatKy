import { TextField } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import "./css/Login.css"
import Logo from './Logo'
import { login } from '../Redux/Actions/Users'

const Login = ({condition}) => {

    const history = useHistory()

    const [data, setData] = useState({
        email: "admin@admin.com",
        password: "admin123"
    })

    useEffect(() => {
        if(sessionStorage.getItem('token') !== null){
            history.push('/home')
        }
    })

    const largeWidth = window.screen.width > 600
    const dispatch = useDispatch()
    
    return (
        <div className="login-bg full-height d-flex justify-content-center align-items-center row">
            {largeWidth && <Logo/>}
            <div className= "card-round card d-flex justify-content-between">
                <form className="all-center row">
                    <h3 className= "card-title d-flex justify-content-center">INICIO DE SESIÓN</h3>
                    <hr />
                            <div className="all-center">
                                <img src="/svg/login.svg" width="90%" alt="" className="mb-2" draggable="false"/>
                            </div>
                    <p className= "login-p">Ingresa con tu correo...</p>
                    <div className="d-flex align-items-end justify-content-between my-2">
                        <AlternateEmailIcon/>
                        <TextField 
                            className= "textfield"
                            label= "Correo electrónico"
                            name="email"
                            value= "admin@admin.com"
                        />
                    </div>
                    <div className="d-flex align-items-end justify-content-between my-2 mb-4">
                        <VpnKeyIcon/>
                        <TextField                         
                            className= "textfield"
                            label= "Contraseña"
                            name="password"
                            value= "admin123"
                            type="password"
                        />
                    </div>
                    <Button
                        color= "purple"
                        className= "total-width button my-2"
                        id= "login-submit"
                        //type= "submit"
                        onClick={(e) => {
                            e.preventDefault()
                            dispatch(login(data))
                            setTimeout(() => {
                                if(sessionStorage.getItem('token') !== null){
                                    history.push('/home')
                                } 
                            }, 500)
                        }}
                    >
                        INICIAR SESIÓN
                    </Button>
                </form>
                {/* <div className="total-width row m-1 login-bs">
                    <div className="col-md-5 p-0 mt-2">
                        <hr/>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center">
                        <p className= "login-p mb-1">o</p>
                    </div>
                    <div className="col-md-5 p-0 mt-2">
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
                    
                </div> */}
                
                <div className= "login-sign-up my-3 row bs-gutter">
                    <div className={largeWidth ? "col-md-3 p-0 mt-2" : "w-25  mt-2"}>
                        <hr/>
                    </div>
                    <div className={largeWidth ? "col-md-6 d-flex justify-content-center" : "w-50 d-flex justify-content-center"}>
                        <p className= "login-p">¿No tienes cuenta?</p>
                    </div>
                    <div className={largeWidth ? "col-md-3 p-0 mt-2" : "w-25  mt-2"}>
                        <hr/>
                    </div>
                    <Link to="/sign-up" className="sign-up-btn ui btn mt-3 ">REGISTRATE</Link>
                    <hr className="mt-4 mb-3"/>
                    <Link 
                        to="/reset-password" 
                        className= "d-flex justify-content-center login-p">
                            ¿Olvidaste tu contraseña?
                    </Link>
                </div>
            </div>
            {/* <div className="login-logo position-absolute p-0">
                <img src= "logo-black.png" alt="logo" width="150" height="150" className= "login-logo position-absolute"/>
            </div> */}
        </div>
    )
}

export default Login
