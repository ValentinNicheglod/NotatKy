import React, {useState} from 'react'
import {IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from '@material-ui/core';
import TocIcon from '@material-ui/icons/Toc';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import AddIcon from '@material-ui/icons/Add';


  function createData(name, description) {
    return { name, description};
  }
  
  const rows = [
    createData('Universidad', 'Apuntes'),
    createData('Curso de programación', 'Curso Henry'),
    createData('Personal', 'Sin descripción'),
  ];

const Collections = () => {

    const [editing, setEditing] = useState() 
    const [open, setOpen] = useState(false);   

    const submitChanges = () => {
        setEditing(undefined);
    }

    const modal = (
        <div className="modal-col">
            <h2 id="simple-modal-title">Crear una colección...</h2>
            <hr/>
            <TextField 
                className="w-100 my-3" 
                id="outlined-basic" 
                label="Nombre"
            />
            <TextField 
                className="w-100 my-3" 
                id="outlined-basic" 
                label="Descripción"
            />
            <div className="w-50 d-flex justify-content-between my-3">
                <button 
                    className="btn btn-outline-success"
                    style={{width: '45%'}}
                >
                    Guardar
                </button>
                <button 
                    type="submit" 
                    className="btn btn-outline-danger ml-3"
                    style={{width: '45%'}}
                    onClick={() => setOpen(false)}
                >
                    Cancelar
                </button>
            </div>
        </div>
      );

    return (
        <div className= "user-profile m-5 row d-flex justify-content-center">
            <h1 className="display-1 settings-title">Colecciones</h1>
            <div className="row h-100 d-flex justify-content-center my-2 p-0">
            
                <TableContainer component={Paper} id="tab-col-table">
                    <Table aria-label="caption table">
                        <caption>Usa las colecciones como si fueran libretas, puedes guardar todas las notas relacionadas a un tema en especifico dentro de ellas.</caption>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Nombre</b></TableCell>
                                <TableCell><b>Descripción</b></TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row" className="table-cell-col">
                                        {
                                            editing === index
                                            ? <TextField 
                                            className="w-75" 
                                            id="outlined-basic" 
                                            placeholder="Nombre"
                                            
                                            />
                                            : <p>
                                                <TocIcon/> 
                                                &nbsp;&nbsp;{row.name}
                                            </p>
                                        }
                                        
                                    </TableCell>
                                    <TableCell className="table-cell-col">
                                        {
                                            editing === index
                                            ? <TextField 
                                            className="w-75" 
                                            id="outlined-basic" 
                                            placeholder="Descripción"
                                        />
                                            : <p>{row.description}</p>
                                        }
                                        
                                    </TableCell>
                                    <TableCell align="right" className="p-0">
                                        <IconButton className="p-2 btn">
                                            {
                                                editing === index
                                                ? <CheckSharpIcon 
                                                    onClick={submitChanges}
                                                    style={{color: '#198754'}}
                                                />
                                                : <EditSharpIcon 
                                                    onClick={() => setEditing(index)}
                                                    style={{color: '#2185D0'}}
                                                />
                                            }
                                        </IconButton>
                                        <IconButton className="p-2 btn">
                                        {editing === index && <DeleteSharpIcon style={{color: '#dc3545'}}/>}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell className="table-cell-col">
                                    <button 
                                        className="btn btn-add-col p-0"
                                        onClick={() => setOpen(true)}
                                    >
                                        <p>
                                            <AddIcon/>
                                            &nbsp;&nbsp;Crear nueva colección
                                        </p>
                                    </button>
                                </TableCell>
                                <TableCell/>
                                <TableCell/>
                            </TableRow>
                        </TableBody>
                    </Table>
                    
                    <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        className="d-flex w-100 justify-content-center align-items-center"
                    >
                        {modal}
                    </Modal>
                </TableContainer>
             </div>
        </div>
    )
}

export default Collections
