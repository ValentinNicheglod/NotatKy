import React, { useState } from 'react'
import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import CollectionsBookmarkOutlinedIcon from '@material-ui/icons/CollectionsBookmarkOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';

import "./css/Notes.css"

import Logo from './Logo'

const collections = ['Universidad', 'Personal', 'Trabajo'];
const tags = ['Reforma', "Proyecto final", "Matematicas", "Informatica"]

const HomeSideBar = () => {

    const [openTags, setOpenTags] = useState(true);
    const [openCollections, setOpenCollections] = useState(true);
  
    const handleClick = (type) => {
      type === 'tag' ? setOpenTags(!openTags) : setOpenCollections(!openCollections)
    };

    return (
		<div className="row profile full-height sticky-vert d-flex justify-content-center">
            <div className="profile-sidebar">
                <div className= "col-md-4 inicio-logo">
                    <Logo/>
                </div>
            </div>
            <div className="d-flex row justify-content-center p-4">
                <button className="btn btn-outline-warning btn-round letter-btn mb-4">CREAR NOTA</button>
                {/* <button className="btn btn-outline-warning btn-round inicio-app">NUEVA NOTA RAPIDA</button> */}
            </div>

            <div id="home-side-bar">
                <List component="nav" className="white">
                    <ListItem button>
                        <ListItemIcon>
                            <HomeOutlinedIcon className="white"/>
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItem>

                    <ListItem button onClick={() => {handleClick('col')}}>
                        <ListItemIcon>
                            <CollectionsBookmarkOutlinedIcon className="white"/>
                        </ListItemIcon >
                        <ListItemText primary="Colecciones" />
                        {openCollections ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openCollections} timeout="auto" unmountOnExit>
                        {
                            collections.sort().map((collection) => (
                                <List component="div" disablePadding>
                                    <ListItem button style={{paddingLeft: 40}}>
                                        <ListItemIcon>
                                            <ListOutlinedIcon className="white"/>
                                        </ListItemIcon>
                                        <ListItemText primary={collection} />
                                    </ListItem>
                                </List>
                            ))
                        }
                    </Collapse>

                    <ListItem button onClick={() => {handleClick('tag')}}>
                        <ListItemIcon>
                        <LocalOfferOutlinedIcon className="white"/>
                        </ListItemIcon >
                        <ListItemText primary="Etiquetas" />
                        {openTags ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openTags} timeout="auto" unmountOnExit>
                        {
                            tags.sort().map((tag) => (
                                <List component="div" disablePadding>
                                    <ListItem button style={{paddingLeft: 40}}>
                                        <ListItemIcon>
                                            <LabelOutlinedIcon className="white"/>
                                        </ListItemIcon>
                                        <ListItemText primary={tag} />
                                    </ListItem>
                                </List>
                            ))
                        }
                    </Collapse>

                    <ListItem button>
                        <ListItemIcon>
                            <ArchiveOutlinedIcon className="white"/>
                        </ListItemIcon>
                        <ListItemText primary="Notas archivadas" />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <DeleteOutlineOutlinedIcon className="white"/>
                        </ListItemIcon>
                        <ListItemText primary="Papelera de reciclaje" />
                    </ListItem>
                </List>
            </div>
		</div>
    )
}

export default HomeSideBar;