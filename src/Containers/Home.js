import React from 'react'

import HomeSideBar from '../Components/HomeSideBar';
import NavBarHome from '../Components/NavBarHome';
import Notes from '../Components/Notes';

import "../Components/css/Notes.css"

const SettingsCollections = () => {
    return (
        <div className= "row full-height">
            <div className= "col-md-2 login-bg" id="home-side-bar">
                <HomeSideBar/> 
            </div>
            <div className= "col-md-10 row">
                <NavBarHome/>
                <Notes/>
            </div>
        </div>
    )
}

export default SettingsCollections