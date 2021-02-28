import React, {useState} from 'react'
import {IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from '@material-ui/core';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import AddIcon from '@material-ui/icons/Add';


  function createData(name, color) {
    return { name, color};
  }
  
  const rows = [
    createData('Matematicas', 'greenyellow'),
    createData('Reforma', 'lightblue')
  ];

  const colors = ['#B592A0', '#79ADDC', '#FFC09F', '#FFEE93', '#ADF7B6','#DCB6D5', '#F2F7F2']

const Tags = () => {

    const [editing, setEditing] = useState();
    const [open, setOpen] = useState(false);  

    const submitChanges = () => {
        setEditing(undefined);

    }

    const modal = (
        <div className="modal-col">
            <h2 id="simple-modal-title">Crear una etiqueta...</h2>
            <hr/>
            <TextField 
                className="w-100 my-3" 
                id="outlined-basic" 
                label="Nombre"
            />
            <div className="w-100 row my-3">
                <p style={{fontSize: '1rem'}}>Color</p>
                <div className="d-flex justify-content-center">
                    {colors.map(dot => (
                        <IconButton className="p-2">
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
            <h1 className="display-1 settings-title">Etiquetas</h1>
            <div className="row h-100 d-flex justify-content-center my-2 p-0">
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
                            {rows.map((row, index) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row" className="table-cell-col">
                                    {
                                            editing === index
                                            ? <TextField 
                                            className="w-75" 
                                            id="outlined-basic" 
                                            placeholder="Nombre"
                                            value={row.name}
                                            />
                                            : <p>
                                                <LocalOfferOutlinedIcon/>
                                                &nbsp;&nbsp;{row.name}
                                            </p>
                                        }
                                        
                                    </TableCell>
                                    <TableCell>
                                        {
                                            editing === index
                                            ? colors.map(dot => (
                                                <IconButton className="p-0">
                                                    <FiberManualRecordIcon 
                                                        style={{color: dot}}
                                                    />
                                                </IconButton>
                                            ))
                                            : <>
                                                <FiberManualRecordIcon 
                                                    style={{color: row.color}}
                                                />
                                            </>
                                        }
                                        
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton className="p-2">
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

export default Tags;