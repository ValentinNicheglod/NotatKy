import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import SettingsSideBar from '../Components/SettingsSideBar';
import Collections from '../Components/Collections';
import Tags from '../Components/Tags';
import { createTag, deleteTag, getAllTags, updateTag } from '../Redux/Actions/Tags'
import { createCollection, deleteCollection, getAllCollections, updateCollection } from '../Redux/Actions/Collections'
import { getOneUser } from '../Redux/Actions/Users'

const SettingsCollections = () => {
    const dispatch = useDispatch();

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

    useEffect(() => {
        dispatch(getOneUser(1));
        dispatch(getAllCollections(1));
        dispatch(getAllTags(1));
    }, [dispatch])

    console.log(tags)

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
    };

    const handleCreateCollection = (data) => {
        data.name= data.name.charAt(0).toUpperCase() + data.name.slice(1);
        dispatch(createCollection(data, 1))
        setOpen({
            ...open,
            col: false
        })
        updateInformation()
    };

    const handleDeleteCollection = (id) => {
        dispatch(deleteCollection(id))
        updateInformation()
        setEditing({
            ...editing,
            col: undefined
        });
    };

    const handleChangeTag = (data) => {
        dispatch(updateTag(data))
        updateInformation()     
        setEditing({
            ...editing,
            tag: undefined
        });   
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
    };

    const handleDeleteTag = (id) => {
        dispatch(deleteTag(id))
        updateInformation()
        setEditing({
            ...editing,
            tag: undefined,
            col: undefined
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
        <div className= "row full-height">
            <div className= "col-md-2 login-bg">
                <SettingsSideBar
                    users={users}
                /> 
            </div>
            <div className= "col-md-5">
                <Collections
                    collections={collections}
                    editing={editing}
                    open={open}
                    openModal={openModal}
                    setEditing={setEditing}
                    handleChange={handleChangeCollection}
                    handleCreate={handleCreateCollection}
                    handleDelete={handleDeleteCollection}
                />
            </div>
            <div className= "col-md-5">
                <Tags
                    tags={tags}
                    editing={editing}
                    open={open}
                    openModal={openModal}
                    setEditing={setEditing}
                    handleChange={handleChangeTag}
                    handleCreate={handleCreateTag}
                    handleDelete={handleDeleteTag}
                />
            </div>
        </div>
    )
}

export default SettingsCollections
