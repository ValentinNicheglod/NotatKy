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
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
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
      <div>
        <h2 id="simple-modal-title" className="display-6">{editCollection ? 'Editar colección' : 'Crear una colección...'}</h2>
        <hr />
      </div>
      <div className="all-center">
        <img
          src="svg/collection.svg"
          width="90%"
          alt=""
          className="mb-2"
          draggable="false"
          style={{ pointerEvents: 'none' }}
        />
      </div>
      <TextField
        autoComplete="off"
        autoFocus={!!largeWidth}
        className="w-100 my-3"
        id="outlined-basic"
        inputProps={{
          maxLength: 20,
          autoComplete: 'new-password'
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
          maxLength: 50,
          autoComplete: 'new-password'
        }}
        value={newCollection.description}
        name="description"
        onChange={newData}
      />
      <div className="modal-col-action d-flex justify-content-between my-3 w-100">
        {editCollection ? (
          <button
            className="btn btn-success btn-round"
            style={{ width: '30%', paddingLeft: 0, paddingRight: 0 }}
            disabled={newCollection.name.length === 0}
            onClick={() => {
              handleChange({
                ...newCollection,
                id: editCollection.id,
                userId: editCollection.userId
              });
              setTimeout(() => {
                setNewCollection({
                  name: '',
                  description: '',
                });
                setEditCollection(null);
              }, 1500);
              openModal('col', false);
            }}
            type="button"
          >
            Guardar
          </button>
        ) : (
          <button
            className="btn btn-success btn-round"
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
        )}
        {editCollection
        && (
        <button
          type="submit"
          className="btn btn-outline-danger ml-3 btn-round"
          style={{ width: '30%', paddingLeft: 0, paddingRight: 0 }}
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          Eliminar
        </button>
        )}
        <button
          className={editCollection ? 'btn btn-round btn-outline-dark ml-3' : 'btn btn-round btn-outline-danger ml-3'}
          style={editCollection ? { width: '30%', paddingLeft: 0, paddingRight: 0 } : { width: '45%' }}
          onClick={() => {
            openModal('col', false);
            setEditCollection(null);
            setNewCollection({
              name: '',
              description: '',
            });
          }}
          type="button"
        >
          Cancelar
        </button>
      </div>
    </div>
  );

  return (
    <div className="user-profile user-tag m-5 row d-flex justify-content-center">
      <h1 className="display-1 settings-title">
        {!largeWidth && (
          <IconButton
            onClick={() => setDrawerOpen(true)}
            style={{ color: 'inherit' }}
            className="btn mb-1 p-0"
            iconStyle={{ width: '35px', height: '40px', marginRight: '5px' }}
          >
            <MenuIcon className="menu-icon" />
          </IconButton>
        )}
        Colecciones
      </h1>
      <div className="row d-flex justify-content-center my-2 conf-2">
        {collections.collections.length > 0
          ? (
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
                            className="w-100"
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
                            className="w-100"
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
                        {largeWidth
                          ? (
                            <>
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
                            </>
                          ) : (
                            <IconButton
                              className="p-2 btn"
                              onClick={() => {
                                setEditCollection(collections.collections[index]);
                                setNewCollection({
                                  ...newCollection,
                                  name: collections.collections[index].name,
                                  description: collections.collections[index].description
                                });
                                openModal('col', true);
                              }}
                            >
                              <EditOutlinedIcon />
                            </IconButton>
                          )}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="table-cell-col add">
                      {!largeWidth && (
                      <button
                        className="btn p-0 my-2"
                        type="button"
                        style={{ opacity: 0 }}
                      >
                        A
                      </button>
                      )}
                      <button
                        className="btn p-0 mt-2 btn-add"
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
            </TableContainer>
          )
          : (
            <div className="no-data-cont all-center row">
              <div>
                <img
                  draggable={false}
                  src="svg/alert.svg"
                  width="100%"
                  alt="not-found"
                  style={{ marginBottom: '10%', pointerEvents: 'none' }}
                />
                <p className="all-center">
                  <b>No hay colecciones</b>
                </p>
                <div className="all-center">
                  <button
                    className="btn btn-round my-3 btn-sm btn-primary all-center create-btn"
                    onClick={() => openModal('col', true)}
                    type="button"
                  >
                    <AddIcon />
                    &nbsp;&nbsp;Crea tu primera colección
                  </button>
                </div>
              </div>
            </div>
          )}

        <Modal
          open={open.col}
          onClose={() => {
            openModal('col', false);
            setEditCollection(null);
            setNewCollection({
              name: '',
              description: '',
            });
          }}
          className="d-flex w-100 justify-content-center align-items-center"
        >
          {modal}
        </Modal>
        <Dialog
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
            setEditCollection(null);
            setNewCollection({
              name: '',
              description: '',
            });
          }}
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
                if (!largeWidth) {
                  openModal('col', false);
                  setNewCollection({
                    name: '',
                    description: '',
                  });
                  setEditCollection(null);
                }
              }}
              color="primary"
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Collections;
