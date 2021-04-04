import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';

const colors = [
  '#79ADDC',
  '#FFC09F',
  '#FFEE93',
  '#ADF7B6',
  '#FBADFF',
  '#DCB6D5',
  '#F2F7F2',
];

const Tags = ({
  tags,
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
  const [newTag, setNewTag] = useState({
    name: '',
    color: '',
  });
  const [editTag, setEditTag] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const newData = (e) => {
    setNewTag({
      ...newTag,
      [e.target.name]: e.target.value,
    });
  };

  const newColor = (color, type) => {
    if (type === 'create') {
      setNewTag({
        ...newTag,
        color,
      });
    } else {
      setEditTag({
        ...editTag,
        color,
      });
    }
  };

  const onChange = (e) => {
    setEditTag({
      ...editTag,
      [e.target.name]: e.target.value,
    });
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

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const superSmallWidth = window.screen.width < 350;

  const modal = (
    <div className="modal-col">
      <div>
        <h2 id="simple-modal-title" className="display-6">Crear una etiqueta...</h2>
        <hr />
      </div>
      <div className="all-center">
        <img
          src="svg/tag.svg"
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
        value={newTag.name}
        name="name"
        onChange={newData}
      />
      <div className="w-100 row my-3">
        {!superSmallWidth && <p style={{ fontSize: '1rem' }}>Color</p>}
        <div className="d-flex justify-content-between w-100">
          {colors.map((dot) => (
            <IconButton
              className={largeWidth ? 'p-2' : 'p-0'}
              onClick={() => newColor(dot, 'create')}
              key={dot}
            >
              <FiberManualRecordIcon
                style={{ color: dot, fontSize: superSmallWidth ? 25 : 35 }}
              />
            </IconButton>
          ))}
        </div>
      </div>
      <div className="modal-col-action d-flex justify-content-between my-3 w-100">
        <button
          className="btn btn-success"
          style={{ width: '45%' }}
          disabled={newTag.name.length === 0}
          onClick={() => {
            handleCreate(newTag);
            setTimeout(() => {
              setNewTag({
                name: '',
                color: '',
              });
            }, 1500);
          }}
          type="button"
        >
          Crear
        </button>
        <button
          type="submit"
          className="btn btn-outline-danger ml-3"
          style={{ width: '45%' }}
          onClick={() => openModal('tag', false)}
        >
          Cancelar
        </button>
      </div>
    </div>
  );

  return (
    <div className="user-profile m-5 row d-flex justify-content-center full-height">
      <h1 className="display-1 settings-title">
        {!largeWidth && (
          <IconButton
            onClick={() => setDrawerOpen(true)}
            style={{ color: 'inherit' }}
            className="btn mb-1 p-0"
          >
            <MenuIcon style={{ color: 'inherit' }} />
          </IconButton>
        )}
        Etiquetas
      </h1>
      <div className="row d-flex justify-content-center my-2 conf-2">
        <TableContainer component={Paper} id="tab-col-table">
          <Table aria-label="caption table">
            <caption>
              Usa las etiquetas para ordenar tus notas por categoría, de esta
              forma podrás encontrar la nota que buscas rapidamente.
            </caption>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Nombre</b>
                </TableCell>
                <TableCell>
                  <b>Color</b>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {tags.tags.map((tag, index) => (
                <TableRow key={tag.name}>
                  <TableCell
                    component="th"
                    scope="row"
                    className="table-cell-col"
                  >
                    {editing.tag === index ? (
                      <TextField
                        className="w-100"
                        placeholder="Nombre"
                        value={editTag.name}
                        onChange={onChange}
                        name="name"
                        inputProps={{
                          maxLength: 20
                        }}
                      />
                    ) : (
                      <p>
                        <LocalOfferOutlinedIcon />
                        &nbsp;&nbsp;
                        {tag.name}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="table-cell-col">
                    {editing.tag === index ? (
                      colors.map((dot) => (
                        <IconButton
                          className="color-dot"
                          onClick={() => newColor(dot, 'update')}
                        >
                          <FiberManualRecordIcon style={{ color: dot }} />
                        </IconButton>
                      ))
                    ) : (
                      <>
                        <FiberManualRecordIcon style={{ color: tag.color }} />
                      </>
                    )}
                  </TableCell>
                  <TableCell align="right" className="p-0">
                    {largeWidth
                      ? (
                        <>
                          <IconButton
                            className="p-2 btn"
                            onClick={
                        editing.tag === index
                          ? () => handleChange(editTag)
                          : () => {
                            setEditTag(tags.tags[index]);
                            setEditing({
                              ...editing,
                              tag: index,
                              col: undefined,
                            });
                          }
                      }
                          >
                            {editing.tag === index ? (
                              <CheckSharpIcon style={{ color: '#198754' }} />
                            ) : (
                              <EditSharpIcon style={{ color: '#2185D0' }} />
                            )}
                          </IconButton>
                          <IconButton
                            className="p-2 btn"
                            onClick={() => {
                              setEditTag(tags.tags[index]);
                              setOpenDialog(true);
                            }}
                          >
                            {editing.tag === index && (
                            <DeleteSharpIcon style={{ color: '#dc3545' }} />
                            )}
                          </IconButton>
                        </>
                      )
                      : (
                        <>
                          {editing.tag === index
                            ? (
                              <IconButton
                                className="p-2 btn"
                                onClick={() => {
                                  handleChange(editTag);
                                  handleClose();
                                }}
                              >
                                <CheckSharpIcon style={{ color: '#198754' }} />
                              </IconButton>
                            )
                            : (
                              <IconButton
                                className="p-2 btn"
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                              >
                                <MoreVertIcon />
                              </IconButton>
                            )}
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            <MenuItem onClick={() => {
                              setEditTag(tags.tags[index]);
                              setEditing({
                                ...editing,
                                tag: index,
                                col: undefined,
                              });
                            }}
                            >
                              <ListItemIcon>
                                <EditSharpIcon fontSize="small" />
                              </ListItemIcon>
                              <Typography variant="inherit">Editar</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                              setEditTag(tags.tags[index]);
                              setOpenDialog(true);
                            }}
                            >
                              <ListItemIcon>
                                <DeleteSharpIcon fontSize="small" />
                              </ListItemIcon>
                              <Typography variant="inherit">Eliminar</Typography>
                            </MenuItem>
                          </Menu>
                        </>
                      )}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="table-cell-col add">
                  <button
                    className="btn p-0 mt-2"
                    onClick={() => openModal('tag', true)}
                    type="button"
                  >
                    <p>
                      <AddIcon />
                      {largeWidth
                        ? '  Crear nueva etiqueta'
                        : '  Nueva etiqueta'}
                    </p>
                  </button>
                </TableCell>
                <TableCell />
                <TableCell />
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
                Tenga en cuenta que una vez que elimine la etiqueta la misma no
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
                  handleDelete(editTag.id);
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

export default Tags;
