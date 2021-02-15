import React from 'react'
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import TocIcon from '@material-ui/icons/Toc';
import EditSharpIcon from '@material-ui/icons/EditSharp';


  function createData(name, description) {
    return { name, description};
  }
  
  const rows = [
    createData('Universidad', 'Apuntes'),
    createData('Curso de programación', 'Curso Henry'),
    createData('Personal', 'Sin descripción'),
  ];

const Collections = () => {

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
                                <TableCell align="right"><b>Editar</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        <TocIcon/>&nbsp;&nbsp;{row.name}
                                    </TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell align="right">
                                        <IconButton className="p-1 btn">
                                            <EditSharpIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
             </div>
        </div>
    )
}

export default Collections
