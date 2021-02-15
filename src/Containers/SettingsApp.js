import React from 'react'

import SettingsSideBar from '../Components/SettingsSideBar';
import AppSettings from '../Components/AppSettings';

const SettingsApp = () => {

    return (
        <div className= "row full-height">
            <div className= "col-md-2 login-bg">
               <SettingsSideBar/> 
            </div>
            <div className= "col-md-10">
                <AppSettings/>
            </div>
        </div>
    )
}

export default SettingsApp
