import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import SettingsSideBar from '../Components/SettingsSideBar';
//import AppSettings from '../Components/AppSettings';
import UserCard from '../Components/UserCard';
import Profile from '../Components/Profile';

import { getAllCollections } from '../Redux/Actions/Collections'
import { getAllNotes } from '../Redux/Actions/Notes'
import { getAllTags } from '../Redux/Actions/Tags'
import { getOneUser, updateUser } from '../Redux/Actions/Users'

const SettingsProfile = () => {
    const [editing, setEditing] = useState('')
    const [visiblePassword, setVisiblePassword] = useState({
        newPassword: false,
        password: false
    })
    const [information, setInformation] = useState()

    const dispatch = useDispatch();
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getOneUser(1));
    }, [dispatch])

    useEffect(() => {
        setInformation(users.user)
    }, [users])

    const visibilityPassword = (type) => {
        setVisiblePassword({
            ...visiblePassword,
            [type]: !visiblePassword[type]
        });
    };

    const handleChange = (e) => {
        setInformation({
            ...information,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(updateUser(information))
        setEditing("")
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

    const editionMode = (section) => {
        setEditing(section);
    }

    return (
        <div className= "row full-height">
            <div className= "col-md-2 login-bg">
               <SettingsSideBar/> 
            </div>
            <div className= "col-md-3 blue-aside">
                <UserCard
                    user={users.user}
                />
            </div>
            <div className= "col-md-7">
                <Profile
                    editing={editing}
                    editionMode={editionMode}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    information={information}
                    mouseEnter={mouseEnter}
                    mouseLeave={mouseLeave}
                    visibilityPassword={visibilityPassword}
                    visiblePassword={visiblePassword}
                    user={users.user}
                />
            </div>
        </div>
    )
}

export default SettingsProfile;
