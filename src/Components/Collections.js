import React, {useState} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from '@material-ui/core';
import TocIcon from '@material-ui/icons/Toc';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';

const Collections = ({collections, editing, handleChange, handleCreate, handleDelete, largeWidth, open, openModal, setDrawerOpen, setEditing}) => {

    const [newCollection, setNewCollection] = useState({
        name: '',
        description: ''
    })
    const [editCollection, setEditCollection] = useState()
    const [openDialog, setOpenDialog] = useState(false)
    
    const newData = (e) => {
        setNewCollection({
            ...newCollection,
            [e.target.name]: e.target.value
        })
    };

    const onChange = (e) => {
        setEditCollection({
            ...editCollection,
            [e.target.name]: e.target.value
        })
    };

    collections.collections.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
    });

    const modal = (
        <div className="modal-col">
            <h2 id="simple-modal-title">Crear una colección...</h2>
            <hr/>
            <TextField 
                autoComplete="off"
                className="w-100 my-3" 
                id="outlined-basic" 
                label="Nombre"
                value={newCollection.name}
                name="name"
                onChange={newData}
            />
            <TextField 
                className="w-100 my-3" 
                id="outlined-basic" 
                label="Descripción"
                value={newCollection.description}
                name="description"
                onChange={newData}
            />
            <div className="modal-col-action d-flex justify-content-between my-3">
                <button 
                    className="btn btn-success"
                    style={{width: '45%'}}
                    onClick={() => {
                        handleCreate(newCollection)
                        setTimeout(() => {
                            setNewCollection({
                                name: '',
                                description: ''
                            })
                        }, 1000)
                        
                    }}
                >
                    Guardar
                </button>
                <button  
                    className="btn btn-outline-danger ml-3"
                    style={{width: '45%'}}
                    onClick={() => openModal('col', false)}
                >
                    Cancelar
                </button>
            </div>
        </div>
      );

    return (
        <div className= "user-profile m-5 row d-flex justify-content-center">
            <h1 className="display-1 settings-title">
                {!largeWidth &&
                    <IconButton
                        onClick={() => setDrawerOpen(true)}
                        //id="btn-home"
                        style={{color: 'inherit'}}
                        className="btn mb-1"
                    >
                        <MenuIcon style={{color: 'inherit'}}/>
                    </IconButton>
                }
                Colecciones
            </h1>
            <div className="row h-75 d-flex justify-content-center my-2 p-0">
            
                <TableContainer component={Paper} id="tab-col-table">
                    <Table aria-label="caption table" id="tab-col-table">
                        <caption>Usa las colecciones como si fueran libretas, puedes guardar todas las notas relacionadas a un tema en especifico dentro de ellas.</caption>
                        <TableHead>
                            <TableRow>
                                <TableCell id="table-cell-"><b>Nombre</b></TableCell>
                                <TableCell><b>Descripción</b></TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {collections.collections.map((collection, index) => (
                                <TableRow key={collection.id}>
                                    <TableCell component="th" scope="row" className="table-cell-col">
                                        {
                                            editing.col === index
                                            ? <TextField 
                                            className="w-75" 
                                            id="outlined-basic" 
                                            placeholder="Nombre"
                                            value={editCollection.name}
                                            onChange={onChange}
                                            name="name"
                                            />
                                            : <p>
                                                <TocIcon/> 
                                                &nbsp;&nbsp;{collection.name}
                                            </p>
                                        }
                                        
                                    </TableCell>
                                    <TableCell className="table-cell-col">
                                        {
                                            editing.col === index
                                            ? <TextField 
                                            className="w-75" 
                                            id="outlined-basic" 
                                            placeholder="Descripción"
                                            value={editCollection.description}
                                            onChange={onChange}
                                            name="description"
                                            multiline
                                        />
                                            : <p>{collection.description}</p>
                                        }
                                        
                                    </TableCell>
                                    <TableCell align="right" className="p-0">
                                        <IconButton 
                                            className="p-2 btn"
                                            onClick={editing.col === index 
                                                ? () => handleChange(editCollection)
                                                : () => {
                                                    setEditCollection(collections.collections[index])
                                                    setEditing({
                                                        ...editing,
                                                        tag: undefined,
                                                        col: index
                                                    })
                                                }}
                                        >
                                            {
                                                editing.col === index
                                                ? <CheckSharpIcon 
                                                    //onClick={handleChange}
                                                    style={{color: '#198754'}}
                                                />
                                                : <EditSharpIcon
                                                    style={{color: '#2185D0'}}
                                                />
                                            }
                                        </IconButton>
                                        <IconButton 
                                            className="p-2 btn"
                                            onClick={() => {
                                                    setEditCollection(collections.collections[index])
                                                    setOpenDialog(true)
                                                }
                                            }
                                        >
                                        {editing.col === index && <DeleteSharpIcon style={{color: '#dc3545'}}/>}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                
                            ))}
                            <TableRow>
                                <TableCell className="table-cell-col">
                                    <button 
                                        className="btn btn-add-col p-0 all-center"
                                        onClick={() => openModal('col', true)}
                                    >
                                        <p>
                                            <AddIcon/>
                                            {largeWidth ? "  Crear nueva colección" : "  Nueva colección"}
                                        </p>
                                    </button>
                                </TableCell>
                                <TableCell/>
                                <TableCell/>
                            </TableRow>
                        </TableBody>
                    </Table>
                    
                    <Modal
                        open={open.col}
                        onClose={() => openModal('col', false)}
                        className="d-flex w-100 justify-content-center align-items-center"
                    >
                        {modal}
                    </Modal>
                    <Dialog
                        open={openDialog}
                        onClose={() => setOpenDialog(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            ¿Desea eliminar la colección?
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Tenga en cuenta que una vez que elimine la colección la misma no podrá ser recuperada.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button 
                                onClick={() => setOpenDialog(false)} 
                                color="primary"
                            >
                                Cancelar
                            </Button>
                            <Button 
                                onClick={() => {
                                    handleDelete(editCollection.id)
                                    setOpenDialog(false)
                                }} 
                                color="primary"
                            >
                                Eliminar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </TableContainer>
             </div>
        </div>
    )
}

export default Collections
