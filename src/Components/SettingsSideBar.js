import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { List, ListItem, ListItemIcon, ListItemText, Switch } from '@material-ui/core';

import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import MoreOutlinedIcon from '@material-ui/icons/MoreOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import NightsStayOutlinedIcon from '@material-ui/icons/NightsStayOutlined';


import "./css/Settings.css"

import Logo from './Logo'

const SettingsSideBar = () => {
	const location = useLocation()
	const history = useHistory()
	const path = location.pathname

	const changeRoute = (url) => {
		history.push(url)
	}

    return (
		<div className="row profile full-height sticky-vert d-flex justify-content-center">
			<div className="profile-sidebar">
                <div className= "col-md-4 inicio-logo">
                    <Logo/>
                </div>
				{
					path !== '/edit profile' &&
						<>
							<div className="profile-userpic mt-5">
								<img src="/profile.jpeg" className="img-responsive d-flex justify-content-center" alt="" />
							</div>
							<div className="profile-usertitle">
								<div className="profile-usertitle-name white">
									Valentín Nicheglod
								</div>
								<div className="profile-usertitle-job">
									nicheglod69@gmail.com
								</div>
								<div className="profile-usertitle-job">
									DEVELOPER
								</div>
							</div>
						</>
				}
				<div id="home-side-bar" style={{marginTop: 40}}>
					<List component="nav" className="white">
						<ListItem 
							button
							id={path === '/edit profile' ? "settings-select-blue" : "item-side-bar"}
							onClick={() => {changeRoute('/edit profile')}}
						>
							<ListItemIcon>
								<PersonOutlineOutlinedIcon className="white"/>
							</ListItemIcon>
							<ListItemText primary="Mi perfil" />
						</ListItem>
						{/* <ListItem 
							button 
							id={path === '/settings app' ? "settings-select" : "item-side-bar"} 
							onClick={() => {changeRoute('/settings app')}}>
							<ListItemIcon>
								<SettingsOutlinedIcon className={path === '/settings app' ? "violet" : "white"}/>
							</ListItemIcon>
							<ListItemText primary="Configuración" />
						</ListItem> */}
						<ListItem 
							button 
							id={path === '/collections tags' ? "settings-select" : "item-side-bar"} 
							onClick={() => {changeRoute('/collections tags')}}>
							<ListItemIcon>
								<MoreOutlinedIcon className={path === '/collections tags' ? "violet" : "white"}/>
							</ListItemIcon>
							<ListItemText primary="Collecciones y etiquetas" />
						</ListItem>
						<ListItem 
							button 
							id={path === '/help' ? "settings-select" : "item-side-bar"} 
							onClick={() => {changeRoute('/help')}}>
							<ListItemIcon>
								<HelpOutlineOutlinedIcon className={path === '/help' ? "violet" : "white"}/>
							</ListItemIcon>
							<ListItemText primary="Ayuda" />
						</ListItem>
						<hr/>
						<ListItem 
							button 
							id="item-side-bar"
							onClick={() => {/* changeRoute('/help') */}}>
							<ListItemIcon>
								<NightsStayOutlinedIcon className="white"/>
							</ListItemIcon>
							<ListItemText primary="Modo oscuro" />
							<Switch
								edge="end"
								//onChange={handleToggle('wifi')}
								//checked={checked.indexOf('wifi') !== -1}
								color="primary"
							/>
						</ListItem>
						<ListItem 
							button 
							id="item-side-bar"
							onClick={() => {/* changeRoute('/help') */}}>
							<ListItemIcon>
								<ExitToAppOutlinedIcon className="white"/>
							</ListItemIcon>
							<ListItemText primary="Cerrar sesión" />
						</ListItem>
					</List>
				</div>
			</div>
		</div>
    )
}

export default SettingsSideBar;
