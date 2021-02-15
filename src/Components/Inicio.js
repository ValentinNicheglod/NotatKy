import React from 'react'
import { Link } from 'react-router-dom'
//import { Icon } from 'semantic-ui-react'
import CardInfo from './CardInfo'

import './css/Inicio.css'
import Logo from './Logo'

const Inicio = () => {
    return (
        <div className="login-bg full-height row">
            <div className= "inicio-nav row d-flex align-items-center">
                <div className= "col-md-4 inicio-logo">
                    <Logo/>
                </div>
                <div className= "col-md-3">

                </div>
                <div className= "col-md-5 inicio-options">
                    <div className ="d-inline">
                        <Link to="/login" className="inicio-link">INICIAR SESIÓN</Link>
                        <p className="inicio-link">|</p>
                        <Link to="/sign-up" className="inicio-link">REGISTRARSE</Link> 
                    </div>
                    <div className ="d-inline">
                        <Link to= "/download" className="btn btn-outline-warning btn-round inicio-app">DESCARGA LA APLICACIÓN</Link>
                    </div>
{/*                     <div className ="d-inline">    
                        <Icon name="world"/>
                        <b className= "inicio-link">
                            ES | EN
                        </b>
                    </div> */}
                    
                </div>
            </div>
            <div className= "d-flex row d-flex align-items-start">
                <div className= "col-md-4 d-flex justify-content-center align-items-center">
                    <span data-tilt>
                    <CardInfo
                        image="svg/card-img-1.svg"
                        title="Lo importante en un solo lugar"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed dapibus est. Sed ante est, viverra imperdiet eros in, aliquet semper nibh. Nulla eu consequat tellus."
                        color="#e9c46a"
                    />
                    </span>
                </div>
                <div className= "col-md-4 d-flex justify-content-center align-items-center">
                    <CardInfo
                        image="svg/card-img-2.svg"
                        title="Aumenta tu productividad"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed dapibus est. Sed ante est, viverra imperdiet eros in, aliquet semper nibh. Nulla eu consequat tellus."
                        color="#e76f51"
                    />
                </div>
                <div className= "col-md-4 d-flex justify-content-center align-items-center">
                    <CardInfo
                        image="svg/card-img-3.svg"
                        title="Sincroniza todos tus dispositivos"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed dapibus est. Sed ante est, viverra imperdiet eros in, aliquet semper nibh. Nulla eu consequat tellus."
                        color="#2a9d8f"
                    />
                </div>
            </div>
        </div>
    )
}

export default Inicio
