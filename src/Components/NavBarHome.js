import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
//import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CollectionsBookmarkOutlinedIcon from '@material-ui/icons/CollectionsBookmarkOutlined';
import AddIcon from '@material-ui/icons/Add';
import { Avatar, Chip, IconButton } from '@material-ui/core'


const NavBarHome = ({bigScreen, closeNote, collection, handleChange, inputValue, largeWidth, loading, note, onEdition, openNote, saveNote, setDrawerOpen, setOpenColModal, user}) => {
    
    const history = useHistory()

    return (
        <div className="nav-home d-flex align-items-center justify-content-between">
            {
                !largeWidth &&
                <div>
                    {openNote
                        ? <IconButton
                            onClick={closeNote}
                            id="btn-home"
                            className="btn"
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        : <IconButton
                            onClick={() => setDrawerOpen(true)}
                            className="btn white"
                        >
                            <MenuIcon />
                        </IconButton>
                    }
                    
                </div>
            }
            <div className="ui transparent input input-search col-md-6">
                {<SearchOutlinedIcon style={{color: "#FFF", marginRight: "20px", height: "100%"}}/>}
                <input 
                    type="text" 
                    placeholder="Buscar..." 
                    onChange={handleChange}
                    id="search-note"
                    value={inputValue}
                />
            </div>

            <div className={largeWidth ? "col-md-4 actions-note" : "actions-note"}>
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
                    {/* <IconButton 
                        style={{color: 'white'}} 
                        className="btn"
                        //onClick={() => history.push('/help')}
                    >
                        <HelpOutlineOutlinedIcon/>
                    </IconButton> */}
                    {largeWidth &&
                        <IconButton 
                            id="btn-home" 
                            className="btn"
                            onClick={() => history.push('/edit profile')}
                        >
                            <SettingsOutlinedIcon/>
                        </IconButton>
                    }
                    {
                        openNote && !largeWidth
                        ? <div className="all-center row m-1">
                            {note.collectionId
                                ? <Chip 
                                    clickable
                                    variant="outlined"
                                    icon={<CollectionsBookmarkOutlinedIcon style={{color: '#FFFF'}}/>} 
                                    label={collection.name}
                                    className="chip-out"
                                    onClick={() => setOpenColModal(true)}
                                />
                                : <Chip 
                                clickable
                                color="secondary"
                                id="back-blue"
                                icon={<AddIcon/>} 
                                label="Añadir colección"
                                onClick={() => setOpenColModal(true)}
                            />
                            }
                            
                        </div>
                        : <>
                            {largeWidth && <h4 className="greeting-note">{`Hola ${user.name}!`}</h4>}
                            {
                            user.profile_photo
                            ? <Avatar 
                                alt="profile_photo"
                                src={`data:${user.profile_photo && user.profile_photo.contentType};base64, ${user.profile_photo && user.profile_photo.image}`}
                            />
                            : <Avatar
                                alt="profile_photo"
                                className="blue"
                            >
                                {user.name && user.name.slice(0, 1)} {user.lastname && user.lastname.slice(0, 1)}
                            </Avatar>
                            }
                        </>
                    }
            </div>
        </div>
    )
}

export default NavBarHome
