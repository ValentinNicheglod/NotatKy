import React from 'react'

import SettingsSideBar from '../Components/SettingsSideBar';
import Collections from '../Components/Collections';
import Tags from '../Components/Tags';

const SettingsCollections = () => {
    return (
        <div className= "row full-height">
            <div className= "col-md-2 login-bg">
                <SettingsSideBar/> 
            </div>
            <div className= "col-md-5">
                <Collections/>
            </div>
            <div className= "col-md-5">
                <Tags/>
            </div>
        </div>
    )
}

export default SettingsCollections
