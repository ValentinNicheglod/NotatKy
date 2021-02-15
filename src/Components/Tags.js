import React from 'react'
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


  function createData(name, color) {
    return { name, color};
  }
  
  const rows = [
    createData('Matematicas', 'greenyellow'),
    createData('Reforma', 'lightblue')
  ];

const Tags = () => {

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
                                <TableCell align="right"><b>Editar</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        <LocalOfferOutlinedIcon/>&nbsp;&nbsp;{row.name}
                                    </TableCell>
                                    <TableCell>
                                        <FiberManualRecordIcon style={{color: row.color, marginLeft: 8}}/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton className="p-1">
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

export default Tags;