import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import SettingsSideBar from '../Components/SettingsSideBar';
//import AppSettings from '../Components/AppSettings';
import UserCard from '../Components/UserCard';
import Profile from '../Components/Profile';

//import { getAllCollections } from '../Redux/Actions/Collections'
//import { getAllNotes } from '../Redux/Actions/Notes'
//import { getAllTags } from '../Redux/Actions/Tags' 
import { getOneUser, updateUser } from '../Redux/Actions/Users'
import { Drawer } from '@material-ui/core';
import { useHistory } from 'react-router';

const SettingsProfile = () => {
    const [visiblePassword, setVisiblePassword] = useState({
        newPassword: false,
        password: false
    })
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: ''
    })
    const [password, setPassword] = useState({
        current: '',
        new1: '',
        new2: ''
    })
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [information, setInformation] = useState()
    const [editing, setEditing] = useState('')
    
    const dispatch = useDispatch();
    const history = useHistory()
    const users = useSelector(state => state.users)
    const darkMode = users.darkMode

    useEffect(() => {
        dispatch(getOneUser(1));
    }, [dispatch])

    useEffect(() => {
        setInformation(users.user)
    }, [users])

    useEffect(() => {
        if(sessionStorage.getItem('token') === null){
            history.push('/login')
        }
    }, [history])

    const largeWidth = window.screen.width > 600

    const closeSnackbar = () => {
        setSnackbar({
            ...snackbar,
            open: false
        })
    }

    const editionMode = (section) => {
        setEditing(section);
    }

    const handleChange = (e) => {
        setInformation({
            ...information,
            [e.target.name]: e.target.value
        })
    }

    const handleDeletePhoto = () => {
        dispatch(updateUser({
            ...information,
            profile_photo: null
        }))
    }
    

    const handlePasswordChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!information.name){
            setSnackbar({
                open: true,
                message: "Debe ingresar un nombre"
            })
        }
        else if (!information.lastname){
            setSnackbar({
                open: true,
                message: "Debe ingresar un apellido"
            })
        }
        else if (!(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(information.email))){
            if (information.email.length === 0){
                setSnackbar({
                    open: true,
                    message: "Debe ingresar un correo"
                })
            } else {
                setSnackbar({
                    open: true,
                    message: "Ingrese un correo válido"
                })
            }
            
        } else {
            dispatch(updateUser(information))
            setEditing("")
            setSnackbar({
                open: true,
                message: "Datos actualizados"
            })
        }
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        if (password.current !== information.password){
            setSnackbar({
                open: true,
                message: "Contraseña actual incorrecta"
            })
        }
        else if (password.new1 !== password.new2){
            setSnackbar({
                open: true,
                message: "Las contraseñas no coincíden"
            })
        }
        else if (!password.current || !password.new1 || !password.new2){
            setSnackbar({
                open: true,
                message: "Complete los campos requeridos"
            })
        } else {
            dispatch(updateUser({
                ...information,
                password: password.new1
            }))
            setEditing("")
            setSnackbar({
                open: true,
                message: "Contraseña actualizada"
            })
        }
    }

    const mouseEnter = (e) => {
        const children = e.target.children[0];
        if (children) {
            children.className = "btn btn-round mx-3 btn-sm btn-outline-primary profile-edit-active";
        }
    } 

    const mouseLeave = (e) => {
        const children = e.target.children[0];
        if (children) {
            children.className = "btn btn-round mx-3 btn-sm btn-outline-primary profile-edit"
        }
    }

    const visibilityPassword = (type) => {
        setVisiblePassword({
            ...visiblePassword,
            [type]: !visiblePassword[type]
        });
    };

    return (
        <div className= {largeWidth ? "row full-height" : "row full-height bs-gutter"}>
            {largeWidth
                ? <div className= "col-md-2 login-bg p-0">
                <SettingsSideBar/> 
                </div>
                : <Drawer 
                    open={drawerOpen} 
                    onClose={() => setDrawerOpen(false)}
                >
                    <div className= "col-md-2 login-bg p-0 full-height">
                        <SettingsSideBar
                            setDrawerOpen={setDrawerOpen}
                        />
                    </div>
                </Drawer>
            }
            {largeWidth &&
                <div 
                    className= "col-md-3 blue-aside"
                    id={darkMode && 'dark-border'}
                >
                    <UserCard
                        darkMode={darkMode}
                        handleDelete={handleDeletePhoto}
                        user={users.user}
                    />
                </div>
            }
            <div 
                className= {largeWidth ? "col-md-7" : "bs-gutter"}
                id={darkMode && "dark"}
            >
                <Profile
                    closeSnackbar={closeSnackbar}
                    darkMode={darkMode}
                    editing={editing}
                    editionMode={editionMode}
                    handleChange={handleChange}
                    handlePasswordChange={handlePasswordChange}
                    handlePasswordSubmit={handlePasswordSubmit}
                    handleSubmit={handleSubmit}
                    information={information}
                    largeWidth={largeWidth}
                    mouseEnter={mouseEnter}
                    mouseLeave={mouseLeave}
                    password={password}
                    setDrawerOpen={setDrawerOpen}
                    snackbar={snackbar}
                    visibilityPassword={visibilityPassword}
                    visiblePassword={visiblePassword}
                    user={users.user}
                />
            </div>
        </div>
    )
}

export default SettingsProfile;
