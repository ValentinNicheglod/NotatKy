import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemIcon, ListItemText, Switch } from '@material-ui/core';

//import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import MoreOutlinedIcon from '@material-ui/icons/MoreOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import NightsStayOutlinedIcon from '@material-ui/icons/NightsStayOutlined';
import CollectionsBookmarkOutlinedIcon from '@material-ui/icons/CollectionsBookmarkOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';

import { setDarkMode as darkModeToggle, logout, updateUser } from '../Redux/Actions/Users' 

import "./css/Settings.css"

import Logo from './Logo'

const SettingsSideBar = ({setDrawerOpen}) => {
	const location = useLocation()
	const history = useHistory()
	const dispatch = useDispatch()
	const path = location.pathname
	const [openDialogLogout, setOpenDialogLogout] = useState(false)
	const [openDialogDeletePhoto, setOpenDialogDeletePhoto] = useState(false)
	const [editingPhoto, setEditingPhoto] = useState(false)
	const [selectedFile, setSelectedFile] = useState(false)
	const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === true || localStorage.getItem('darkMode') === 'true')
	const user = useSelector(state => state.users.user)

	useEffect(() => {
		//localStorage.setItem('darkMode', darkMode)
		if (typeof(darkMode === Boolean)){
			dispatch(darkModeToggle(darkMode))
		}
	}, [darkMode, dispatch])

	const largeWidth = window.screen.width > 600

	const changeRoute = (url) => {
		history.push(url)
		!largeWidth && setDrawerOpen(false)
	}

	const handleDelete = () => {
        dispatch(updateUser({
            ...user,
            profile_photo: null
        }))
    }

	const handleLogout = () => {
		dispatch(logout)
		sessionStorage.clear()
		history.push('/')
	}
	

	const handleToggle = () => {
		setDarkMode(!darkMode)
	}

    return (
		<div className="row profile full-height m-0 d-flex">
			<div className="profile-sidebar full-height">
                <div 
					className= ""
					onClick={() => changeRoute('/home')}
					style={{cursor: 'pointer'}}
				>
                    <Logo/>
                </div>  
				{ 
					(path !== '/edit profile' || !largeWidth) &&
						<>
							{
								user.profile_photo
								? <div className="all-center">
									<Avatar
										alt="profile_photo"
										className="mt-4 profile-userpic" 
										sizes={180}
										draggable={false}
										src={`data:${user.profile_photo && user.profile_photo.contentType};base64, ${user.profile_photo && user.profile_photo.image}`}
									/>
								</div>
								: <div className="all-center">
									<Avatar
										alt="profile_photo"
										className="mt-4 profile-userpic blue" 
									>
										{user.name && user.name.slice(0, 1)} {user.lastname && user.lastname.slice(0, 1)}
									</Avatar>
								</div>
							}
							{largeWidth
								? <div className="profile-usertitle">
									<div className="profile-usertitle-name white">
										{user.name} {user.lastname}
									</div>
									<div className="profile-usertitle-job">
										{user.email}
									</div>
									<div className="profile-usertitle-job">
										{user.ocupation}
									</div>
								</div>
								: editingPhoto
									? <div className="all-center">
										<form 
											action="http://localhost:3001/user/uploadphoto" 
											enctype="multipart/form-data" 
											id="profile-input"
											method="POST"
											onChange={(e) => {
												setSelectedFile(true)
												e.target.files.length === 0
												? setSelectedFile(false)
												: setSelectedFile(true)
											}}
										>
											<div class="inputWrapper btn btn-round my-1 btn-sm btn-primary w-100 all-center">
												<input 
													id="formFileSm" 
													name="picture"
													className="fileInput"
													type="file" 
													accept="image/*"
													//style={{display: "none"}}
												/>
												Seleccionar foto
											</div>
											{/* <input 
												className="btn btn-round my-1 btn-sm btn-outline-primary w-100" 
												type="button"
												onclick={(e) => {
													document.getElementById('formFileSm').click()
												}} 
												value="Seleccionar foto"
											>
												
											</input> */}

											<div className="d-flex justify-content-between w-100">
												<button 
													className="btn btn-sm btn-round my-2 btn-success"
													type="submit"
													disabled={!selectedFile}
												>
													Guardar
												</button>
												{user.profile_photo &&
													<button 
														className="btn btn-sm btn-round my-2 mx-1 btn-danger"
														onClick={(e) => {
															e.preventDefault()
															setOpenDialogDeletePhoto(true)
														}}
													>
														Eliminar
													</button>
												}
												<button 
													className="btn btn-sm btn-round my-2 btn-dark"
													onClick={() => {
														setEditingPhoto(false)
													}}
												>
													Cancelar
												</button>
												
											</div>
										</form>
									</div>
									: <div className="all-center"> 
										<button 
											className="btn btn-round my-1 btn-sm btn-outline-primary"
											onClick={() => setEditingPhoto(true)}
										>
											{`${user.profile_photo ? "Editar" : "Agregar"} foto de perfil`}
										</button>
									</div>
							}
						</>
				}
				<div id="home-side-bar" style={{marginTop: 40}}>
					<List component="nav" className="white">
						<ListItem 
							button
							className={path === '/edit profile' && "settings-select-blue"}
							id="item-side-bar"
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
						{largeWidth
							? <ListItem 
								button 
								className={path === '/collections tags/' && darkMode ? "settings-select-dark" : path === '/collections tags' ? "settings-select": null} 
								id="item-side-bar"
								onClick={() => {changeRoute('/collections tags')}}>
								<ListItemIcon>
									<MoreOutlinedIcon className={path === '/collections tags' ? "violet" : "white"}/>
								</ListItemIcon>
								<ListItemText primary="Colecciones y etiquetas" />
							</ListItem>
							: <ListItem 
								button 
								className={path === '/collections tags/col' && darkMode ? "settings-select-dark" : path === '/collections tags/col' ? "settings-select": null} 
								id="item-side-bar"
								onClick={() => {changeRoute('/collections tags/col')}}>
								<ListItemIcon>
									<CollectionsBookmarkOutlinedIcon className={path === '/collections tags/col' ? "violet" : "white"}/>
								</ListItemIcon>
								<ListItemText primary="Colecciones" />
							</ListItem>
						}
						{!largeWidth &&
							<ListItem 
								button 
								className={path === '/collections tags/tag' && darkMode ? "settings-select-dark" : path === '/collections tags/tag' ? "settings-select": null} 
								id="item-side-bar"
								onClick={() => {changeRoute('/collections tags/tag')}}>
								<ListItemIcon>
									<LocalOfferOutlinedIcon className={path === '/collections tags/tag' ? "violet" : "white"}/>
								</ListItemIcon>
								<ListItemText primary="Etiquetas" />
							</ListItem>
						}
						<hr/>
						<ListItem 
							button 
							className="item-side-bar"
							id="item-side-bar"
							onClick={() => {/* changeRoute('/help') */}}>
							<ListItemIcon>
								<NightsStayOutlinedIcon className="white"/>
							</ListItemIcon>
							<ListItemText primary="Modo oscuro" />
							<Switch
								edge="end"
								onChange={handleToggle}
								checked={darkMode}
								color="primary"
							/>
						</ListItem>
						<ListItem 
							button 
							className="item-side-bar"
							id="item-side-bar"
							onClick={() => setOpenDialogLogout(true)}>
							<ListItemIcon>
								<ExitToAppOutlinedIcon className="white"/>
							</ListItemIcon>
							<ListItemText primary="Cerrar sesión" />
						</ListItem>
					</List>
				</div>
			</div>
			<Dialog
            open={openDialogLogout}
            onClose={() => setOpenDialogLogout(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                ¿Desea cerrar sesión?
            </DialogTitle>
            <DialogActions>
                <Button 
                    onClick={() => setOpenDialogLogout(false)} 
                    color="primary"
                >
                    No
                </Button>
                <Button 
                    onClick={() => handleLogout()}
                    color="primary"
                >
                    Sí
                </Button>
            </DialogActions>
        </Dialog> 
		<Dialog
            open={openDialogDeletePhoto}
            onClose={() => setOpenDialogDeletePhoto(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                ¿Desea eliminar la foto de perfil?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Tenga en cuenta que una vez que elimine la foto la misma no podrá ser recuperada.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={() => setOpenDialogDeletePhoto(false)} 
                    color="primary"
                >
                    Cancelar
                </Button>
                <Button 
                    onClick={() => {
                        handleDelete()
                        setOpenDialogDeletePhoto(false)
                    }} 
                    color="primary"
                >
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>   
		</div>
    )
}

export default SettingsSideBar;
