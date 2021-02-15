import React, { useState } from 'react'

import SettingsSideBar from '../Components/SettingsSideBar';
//import AppSettings from '../Components/AppSettings';
import UserCard from '../Components/UserCard';
import Profile from '../Components/Profile';

const SettingsProfile = () => {
    const [editing, setEditing] = useState('')

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
                <UserCard/>
            </div>
            <div className= "col-md-7">
                <Profile
                    editing={editing}
                    editionMode={editionMode}
                    mouseEnter={mouseEnter}
                    mouseLeave={mouseLeave}
                />
            </div>
        </div>
    )
}

export default SettingsProfile;
