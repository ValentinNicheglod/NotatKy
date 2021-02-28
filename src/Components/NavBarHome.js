import React from 'react'
import { useHistory } from 'react-router-dom'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import { Avatar, IconButton } from '@material-ui/core'


const NavBarHome = () => {
    const history = useHistory()
    return (
        <div className="nav-home d-flex align-items-center">
            
            <div className="ui transparent input col-md-6">
                <SearchOutlinedIcon style={{color: "#FFF", marginRight: "20px"}}/>
    	        <input type="text" placeholder="Buscar..." id="search-note"/>
            </div>
            <div className="col-md-4 actions-note">
                    <IconButton 
                        style={{color: 'white'}} 
                        onClick={() => history.push('/help')}
                    >
                        <HelpOutlineOutlinedIcon/>
                    </IconButton>
                    <IconButton 
                        id="btn-home" 
                        onClick={() => history.push('/settings app')}
                    >
                        <SettingsOutlinedIcon/>
                    </IconButton>
                <h4 className="greeting-note">Hola Valentín!</h4>
                <Avatar src="/profile.jpeg"/>
            </div>
        </div>
    )
}

export default NavBarHome
