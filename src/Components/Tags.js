import React, {useState} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from '@material-ui/core';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import AddIcon from '@material-ui/icons/Add';

const colors = ['#B592A0', '#79ADDC', '#FFC09F', '#FFEE93', '#ADF7B6','#DCB6D5', '#F2F7F2']

const Tags = ({tags, editing, handleChange, handleCreate, handleDelete, open, openModal, setEditing}) => {

    const [newTag, setNewTag] = useState({
        name: '',
        color: ''
    })
    const [editTag, setEditTag] = useState()
    const [openDialog, setOpenDialog] = useState(false)

    console.log(editTag)

    const newData = (e) => {
        setNewTag({
            ...newTag,
            [e.target.name]: e.target.value
        })
    };

    const newColor = (color, type) => {
        type === 'create'
        ? setNewTag({
            ...newTag,
            color
        })
        : setEditTag({
            ...editTag,
            color
        })
    };

    const onChange = (e) => {
        setEditTag({
            ...editTag,
            [e.target.name]: e.target.value
        })
    };

    tags.tags.sort((a, b) => {
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
            <h2 id="simple-modal-title">Crear una etiqueta...</h2>
            <hr/>
            <TextField 
                autoComplete="off"
                className="w-100 my-3" 
                id="outlined-basic" 
                label="Nombre"
                value={newTag.name}
                name="name"
                onChange={newData}
            />
            <div className="w-100 row my-3">
                <p style={{fontSize: '1rem'}}>Color</p>
                <div className="d-flex justify-content-center">
                    {colors.map((dot, index) => (
                        <IconButton
                            className="p-2"
                            onClick={() => newColor(dot, 'create')}
                            key={index}
                        >
                            <FiberManualRecordIcon 
                                style={{color: dot, fontSize: 35}}
                            />
                        </IconButton>
                    ))}
                </div>
            </div>
            <div className="w-50 d-flex justify-content-between my-3">
                <button 
                    className="btn btn-outline-success"
                    style={{width: '45%'}}
                    onClick={() => {
                        handleCreate(newTag)
                        setTimeout(() => {
                            setNewTag({
                                name: '',
                                color: ''
                            })
                        }, 1000)
                        
                    }}
                >
                    Guardar
                </button>
                <button 
                    type="submit" 
                    className="btn btn-outline-danger ml-3"
                    style={{width: '45%'}}
                    onClick={() => openModal('tag', false)}
                >
                    Cancelar
                </button>
            </div>
        </div>
      );

    return (
        <div className= "user-profile m-5 row d-flex justify-content-center">
            <h1 className="display-1 settings-title">Etiquetas</h1>
            <div className="row h-75 d-flex justify-content-center my-2 p-0">
                <TableContainer component={Paper} id="tab-col-table">
                    <Table aria-label="caption table">
                        <caption>Usa las etiquetas para ordenar tus notas por categoría, de esta forma podrás encontrar la nota que buscas rapidamente.</caption>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Nombre</b></TableCell>
                                <TableCell><b>Color</b></TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tags.tags.map((tag, index) => (
                                <TableRow key={tag.name}>
                                    <TableCell component="th" scope="row" className="table-cell-col">
                                    {
                                            editing.tag === index
                                            ? <TextField 
                                            className="w-75" 
                                            id="outlined-basic" 
                                            placeholder="Nombre"
                                            value={editTag.name}
                                            onChange={onChange}
                                            name="name"
                                            />
                                            : <p>
                                                <LocalOfferOutlinedIcon/>
                                                &nbsp;&nbsp;{tag.name}
                                            </p>
                                        }
                                        
                                    </TableCell>
                                    <TableCell className="table-cell-col">
                                        {
                                            editing.tag === index
                                            ? colors.map(dot => (
                                                <IconButton 
                                                    className={tag.color === dot ? "p-0 selected-color" : "p-0"}
                                                    onClick={() => newColor(dot, 'update')}
                                                >
                                                    <FiberManualRecordIcon 
                                                        style={{color: dot}}
                                                    />
                                                </IconButton>
                                            ))
                                            : <>
                                                <FiberManualRecordIcon 
                                                    style={{color: tag.color}}
                                                />
                                            </>
                                        }
                                        
                                    </TableCell>
                                    <TableCell align="right" className="p-0">
                                        <IconButton 
                                            className="p-2 btn"
                                            onClick={editing.tag === index 
                                                ? () => handleChange(editTag)
                                                : () => {
                                                    setEditTag(tags.tags[index])
                                                    setEditing({
                                                        ...editing,
                                                        tag: index,
                                                        col: undefined
                                                    })
                                                }}
                                        >
                                        {
                                                editing.tag === index
                                                ? <CheckSharpIcon 
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
                                                setEditTag(tags.tags[index])
                                                setOpenDialog(true)
                                            }
                                        }
                                            >
                                            {editing.tag === index && <DeleteSharpIcon style={{color: '#dc3545'}}/>}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell className="table-cell-col">
                                    <button 
                                        className="btn btn-add-col p-0"
                                        onClick={() => openModal('tag', true)}
                                    >
                                        <p>
                                            <AddIcon/>
                                            &nbsp;&nbsp;Crear nueva etiqueta
                                        </p>
                                    </button>
                                </TableCell>
                                <TableCell/>
                                <TableCell/>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Modal
                        open={open.tag}
                        onClose={() => openModal('tag', false)}
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
                            ¿Desea eliminar la etiqueta?
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Tenga en cuenta que una vez que elimine la etiqueta la misma no podrá ser recuperada.
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
                                    handleDelete(editTag.id)
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

export default Tags;