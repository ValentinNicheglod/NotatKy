import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import TocIcon from '@material-ui/icons/Toc';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';

const Collections = ({
  collections,
  editing,
  handleChange,
  handleCreate,
  handleDelete,
  largeWidth,
  open,
  openModal,
  setDrawerOpen,
  setEditing,
}) => {
  const [newCollection, setNewCollection] = useState({
    name: '',
    description: '',
  });
  const [editCollection, setEditCollection] = useState();
  const [openDialog, setOpenDialog] = useState(false);

  const newData = (e) => {
    setNewCollection({
      ...newCollection,
      [e.target.name]: e.target.value,
    });
  };

  const onChange = (e) => {
    setEditCollection({
      ...editCollection,
      [e.target.name]: e.target.value,
    });
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
      <h2 id="simple-modal-title" className="display-6">Crear una colección...</h2>
      <hr />
      <div className="all-center">
        <img
          src="svg/collection.svg"
          width="90%"
          alt=""
          className="mb-2"
          draggable="false"
        />
      </div>
      <TextField
        autoComplete="off"
        autoFocus
        className="w-100 my-3"
        id="outlined-basic"
        inputProps={{
          maxLength: 20
        }}
        label="Nombre"
        value={newCollection.name}
        name="name"
        onChange={newData}
      />
      <TextField
        className="w-100 my-3"
        id="outlined-basic"
        label="Descripción"
        inputProps={{
          maxLength: 50
        }}
        value={newCollection.description}
        name="description"
        onChange={newData}
      />
      <div className="modal-col-action d-flex justify-content-between my-3 w-100">
        <button
          className="btn btn-success"
          style={{ width: '45%' }}
          disabled={newCollection.name.length === 0}
          onClick={() => {
            handleCreate(newCollection);
            setTimeout(() => {
              setNewCollection({
                name: '',
                description: '',
              });
            }, 1000);
          }}
          type="button"
        >
          Crear
        </button>
        <button
          className="btn btn-outline-danger ml-3"
          style={{ width: '45%' }}
          onClick={() => openModal('col', false)}
          type="button"
        >
          Cancelar
        </button>
      </div>
    </div>
  );

  return (
    <div className="user-profile m-5 row d-flex justify-content-center">
      <h1 className="display-1 settings-title">
        {!largeWidth && (
          <IconButton
            onClick={() => setDrawerOpen(true)}
            style={{ color: 'inherit' }}
            className="btn mb-1"
          >
            <MenuIcon style={{ color: 'inherit' }} />
          </IconButton>
        )}
        Colecciones
      </h1>
      <div className="row h-75 d-flex justify-content-center my-2 p-0">
        <TableContainer component={Paper} id="tab-col-table">
          <Table aria-label="caption table" id="tab-col-table">
            <caption>
              Usa las colecciones como si fueran libretas, puedes guardar todas
              las notas relacionadas a un tema en especifico dentro de ellas.
            </caption>
            <TableHead>
              <TableRow>
                <TableCell id="table-cell-">
                  <b>Nombre</b>
                </TableCell>
                <TableCell>
                  <b>Descripción</b>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {collections.collections.map((collection, index) => (
                <TableRow key={collection.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    className="table-cell-col"
                  >
                    {editing.col === index ? (
                      <TextField
                        className="w-75"
                        id="outlined-basic"
                        inputProps={{
                          maxLength: 20
                        }}
                        placeholder="Nombre"
                        value={editCollection.name}
                        onChange={onChange}
                        name="name"
                      />
                    ) : (
                      <p>
                        <TocIcon />
                        &nbsp;&nbsp;
                        {collection.name}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="table-cell-col">
                    {editing.col === index ? (
                      <TextField
                        className="w-75"
                        id="outlined-basic"
                        inputProps={{
                          maxLength: 50
                        }}
                        placeholder="Descripción"
                        value={editCollection.description}
                        onChange={onChange}
                        name="description"
                        multiline
                      />
                    ) : (
                      <p>{collection.description}</p>
                    )}
                  </TableCell>
                  <TableCell align="right" className="p-0">
                    <IconButton
                      className="p-2 btn"
                      onClick={
                        editing.col === index
                          ? () => handleChange(editCollection)
                          : () => {
                            setEditCollection(collections.collections[index]);
                            setEditing({
                              ...editing,
                              tag: undefined,
                              col: index,
                            });
                          }
                      }
                    >
                      {editing.col === index ? (
                        <CheckSharpIcon
                          style={{ color: '#198754' }}
                        />
                      ) : (
                        <EditSharpIcon style={{ color: '#2185D0' }} />
                      )}
                    </IconButton>
                    <IconButton
                      className="p-2 btn"
                      onClick={() => {
                        setEditCollection(collections.collections[index]);
                        setOpenDialog(true);
                      }}
                    >
                      {editing.col === index && (
                        <DeleteSharpIcon style={{ color: '#dc3545' }} />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="table-cell-col add">
                  <button
                    className="btn btn-add-col p-0"
                    onClick={() => openModal('col', true)}
                    type="button"
                  >
                    <p>
                      <AddIcon />
                      {largeWidth
                        ? '  Crear nueva colección'
                        : '  Nueva colección'}
                    </p>
                  </button>
                </TableCell>
                <TableCell />
                <TableCell />
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
                Tenga en cuenta que una vez que elimine la colección la misma no
                podrá ser recuperada.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                className="btn"
                onClick={() => setOpenDialog(false)}
                color="primary"
              >
                Cancelar
              </Button>
              <Button
                className="btn"
                onClick={() => {
                  handleDelete(editCollection.id);
                  setOpenDialog(false);
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
  );
};

export default Collections;
