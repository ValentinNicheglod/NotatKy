import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import SettingsSideBar from '../Components/SettingsSideBar';
import Collections from '../Components/Collections';
import Tags from '../Components/Tags';
import { createTag, deleteTag, getAllTags, updateTag } from '../Redux/Actions/Tags'
import { createCollection, deleteCollection, getAllCollections, updateCollection } from '../Redux/Actions/Collections'
import { getOneUser } from '../Redux/Actions/Users'
import { Drawer, IconButton, Snackbar } from '@material-ui/core';
import {HighlightOffOutlined} from '@material-ui/icons';


const SettingsCollections = ({match}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const darkMode = useSelector(state => state.users.darkMode)

    const users = useSelector(state => state.users)
    const collections = useSelector(state => state.collections)
    const tags = useSelector(state => state.tags)

    const [editing, setEditing] = useState({
        tag: '',
        col: ''
    }) 
    const [open, setOpen] = useState({
        tag: false,
        col: false
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: ''
    })
    const [drawerOpen, setDrawerOpen] = useState(false)

    useEffect(() => {
        dispatch(getOneUser(1));
        dispatch(getAllCollections(1));
        dispatch(getAllTags(1));
    }, [dispatch])

    useEffect(() => {
        if(sessionStorage.getItem('token') === null){
            history.push('/login')
        }
    }, [history])

    const largeWidth = window.screen.width > 600

    const updateInformation = () => {
        setTimeout(() => {
            dispatch(getAllCollections(1));
            dispatch(getAllTags(1));
        }, 500)
    }

    const handleChangeCollection = (data) => {
        dispatch(updateCollection(data))
        updateInformation()
        setEditing({
            ...editing,
            col: undefined
        });
        setSnackbar({
            open: true,
            message: "Colección actualizada"
        })
    };

    const handleCreateCollection = (data) => {
        data.name= data.name.charAt(0).toUpperCase() + data.name.slice(1);
        dispatch(createCollection(data, 1))
        setOpen({
            ...open,
            col: false
        })
        updateInformation()
        setSnackbar({
            open: true,
            message: "Colección creada"
        })
    };

    const handleDeleteCollection = (id) => {
        dispatch(deleteCollection(id))
        updateInformation()
        setEditing({
            ...editing,
            col: undefined
        });
        setSnackbar({
            open: true,
            message: "Colección eliminada"
        })
    };

    const handleChangeTag = (data) => {
        dispatch(updateTag(data))
        updateInformation()     
        setEditing({
            ...editing,
            tag: undefined
        });
        setSnackbar({
            open: true,
            message: "Etiqueta actualizada"
        })
    };

    const handleCreateTag = (data) => {
        data.name= data.name.charAt(0).toUpperCase() + data.name.slice(1);
        dispatch(createTag(data, 1))
        console.log(data)
        setOpen({
            ...open,
            tag: false
        })
        updateInformation()
        setSnackbar({
            open: true,
            message: "Etiqueta creada"
        })
    };

    const handleDeleteTag = (id) => {
        dispatch(deleteTag(id))
        updateInformation()
        setEditing({
            ...editing,
            tag: undefined,
            col: undefined
        })
        setSnackbar({
            open: true,
            message: "Etiqueta eliminada"
        })
    };

    const openModal = (type, state) => {
        setEditing({
            ...editing,
            tag: undefined,
            col: undefined
        })
        setOpen({
            ...open,
            [type]: state
        })
    };

    return (
        <div className= {largeWidth ? "row full-height" : "row full-height bs-gutter"}>
            {largeWidth
                ? <div className= "col-md-2 login-bg p-0">
                <SettingsSideBar
                    users={users}
                /> 
                </div>
                : <Drawer 
                    open={drawerOpen} 
                    onClose={() => setDrawerOpen(false)}
                >
                    <div className= "col-md-2 login-bg p-0 full-height">
                        <SettingsSideBar
                            users={users}
                            setDrawerOpen={setDrawerOpen}
                        /> 
                    </div>
                </Drawer>
            }
            {!largeWidth //If is mobile
                ? match.params.type === "col"
                    ? <div className= "col-md-5">
                        <Collections
                            collections={collections}
                            darkMode={darkMode}
                            editing={editing}
                            largeWidth={largeWidth}
                            open={open}
                            openModal={openModal}
                            setEditing={setEditing}
                            handleChange={handleChangeCollection}
                            handleCreate={handleCreateCollection}
                            handleDelete={handleDeleteCollection}
                            setDrawerOpen={setDrawerOpen}
                        />
                    </div>

                    : <div className= "col-md-5">
                        <Tags
                            darkMode={darkMode}
                            editing={editing}
                            open={open}
                            openModal={openModal}
                            setEditing={setEditing}
                            handleChange={handleChangeTag}
                            handleCreate={handleCreateTag}
                            handleDelete={handleDeleteTag}
                            largeWidth={largeWidth}
                            setDrawerOpen={setDrawerOpen}
                            tags={tags}
                        />
                    </div>
                : <>
                        <div className= "col-md-5">
                            <Collections
                                collections={collections}
                                darkMode={darkMode}
                                editing={editing}
                                largeWidth={largeWidth}
                                open={open}
                                openModal={openModal}
                                setEditing={setEditing}
                                handleChange={handleChangeCollection}
                                handleCreate={handleCreateCollection}
                                handleDelete={handleDeleteCollection}
                                setDrawerOpen={setDrawerOpen}
                            />
                        </div>

                        <div className= "col-md-5">
                            <Tags
                                darkMode={darkMode}
                                editing={editing}
                                open={open}
                                openModal={openModal}
                                setEditing={setEditing}
                                handleChange={handleChangeTag}
                                handleCreate={handleCreateTag}
                                handleDelete={handleDeleteTag}
                                largeWidth={largeWidth}
                                tags={tags}
                            />
                        </div>
                    </>
            }
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar(false)}
                message={snackbar.message}
                action={
                <>
                    <IconButton size="small" color="inherit" onClick={() => setSnackbar(false)}>
                    <HighlightOffOutlined fontSize="small" />
                    </IconButton>
                </>
                }
            />
        </div>
    )
}

export default SettingsCollections
