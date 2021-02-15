import React from 'react'
import { Link} from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

import "./css/Settings.css"

import Logo from './Logo'

const SettingsSideBar = () => {
    return (
		<div className="row profile full-height sticky-vert d-flex justify-content-center">
			<div className="profile-sidebar">
                <div className= "col-md-4 inicio-logo">
                    <Logo/>
                </div>
				<div className="profile-userpic mt-5">
					<img src="svg/card-img-1.svg" className="img-responsive d-flex justify-content-center" alt="" />
				</div>
				<div className="profile-usertitle">
					<div className="profile-usertitle-name white">
						Valentín Nicheglod
					</div>
					<div className="profile-usertitle-job">
						nicheglod69@gmail.com
					</div>
				</div>
				<div className="profile-usermenu">
					<ul className="nav row">
						<li>
                            <Icon name= "edit outline"/>
							<Link to="/edit profile">
							Editar Perfil </Link>
						</li>
						<li>
                            <Icon name= "cog"/>
							<Link to="/settings app">
							Configuración </Link>
						</li>
						<li>
                            <Icon name= "book"/>
							<Link to="/collections">
							Colecciones y etiquetas</Link>
						</li>
						<li>
                            <Icon name= "help"/>
							<Link to="/help">
							Ayuda </Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
    )
}

export default SettingsSideBar;
