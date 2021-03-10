import React from 'react'
import { useHistory } from 'react-router-dom'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { Avatar, IconButton } from '@material-ui/core'


const NavBarHome = ({loading, onEdition, saveNote, user}) => {
    const history = useHistory()
    return (
        <div className="nav-home d-flex align-items-center justify-content-between">
            
            <div className="ui transparent input input-search col-md-6">
                <SearchOutlinedIcon style={{color: "#FFF", marginRight: "20px", height: "100%"}}/>
    	        <input type="text" placeholder="Buscar..." id="search-note"/>
            </div>
            <div className="col-md-4 actions-note">
                    {
                        loading 
                        ? onEdition.id && <LoopOutlinedIcon className="loop-out"/>
                        : onEdition.id && <IconButton 
                            style={{color: 'white'}}
                            className="btn white"
                            onClick={saveNote}
                            title="Guardar"
                        >
                            <SaveOutlinedIcon/>
                        </IconButton>
                    }
                    <IconButton 
                        style={{color: 'white'}} 
                        className="btn"
                        //onClick={() => history.push('/help')}
                    >
                        <HelpOutlineOutlinedIcon/>
                    </IconButton>
                    <IconButton 
                        id="btn-home" 
                        className="btn"
                        onClick={() => history.push('/edit profile')}
                    >
                        <SettingsOutlinedIcon/>
                    </IconButton>
                <h4 className="greeting-note">{`Hola ${user.name}!`}</h4>
                <Avatar src="/profile.jpeg"/>
            </div>
        </div>
    )
}

export default NavBarHome
