import React, {useState} from 'react'
import moment from 'moment'
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Modal } from '@material-ui/core'
import NoteCard from './NoteCard'
import AddIcon from '@material-ui/icons/Add';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import RestoreFromTrashOutlinedIcon from '@material-ui/icons/RestoreFromTrashOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import CollectionsBookmarkOutlinedIcon from '@material-ui/icons/CollectionsBookmarkOutlined';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';

const Notes = ({
    addTag, 
    automaticSave, 
    collection,
    collections,
    deleteTag, 
    duplicate, 
    editCollection, 
    editNote, 
    handleChange, 
    handleDelete, 
    handleStateChange, 
    newNote, 
    note, 
    notes, 
    onEdition, 
    pathname, 
    tags
}) => {

    const [openTagModal, setOpenTagModal] = useState(false)
    const [openColModal, setOpenColModal] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)

    const includesTag = note.tags.map(tag => tag.name)

    const colModal = (
        <div className="modal-col">
            <h2 id="simple-modal-title">
                {note.collectionId ? "Editar colección" : "Añadir colección"}
            </h2>
            <hr/>
            <div>
                {
                    collections && collections.map((col) => (
                        <>
                            <div className="d-flex justify-content-between align-items-center px-2">
                                <p className="d-inline m-0">
                                    <CollectionsBookmarkOutlinedIcon/>
                                    &nbsp;&nbsp;&nbsp;{col.name}
                                </p>
                                {col.id === note.collectionId
                                    ? <Chip label="Seleccionada" variant="outlined" 
                                    color="primary"/>
                                    : <IconButton
                                        className="btn"
                                        onClick={() => {
                                            editCollection(col.id)
                                            setOpenColModal(false)
                                        }} 
                                    >
                                        <AddIcon/>
                                    </IconButton>
                                }
                            </div>
                            <hr/>
                        </>
                    ))
                }
            </div>
        </div>
      );

    const tagModal = (
        <div className="modal-col">
            <h2 id="simple-modal-title">Añadir etiquetas</h2>
            <hr/>
            <div>
                {
                    tags && tags.map((tag) => (
                        <>
                            <div className="d-flex justify-content-between align-items-center px-2">
                                <p className="d-inline m-0">
                                <LocalOfferIcon style={{color: tag.color}}/>
                                &nbsp;&nbsp;&nbsp;{tag.name}
                                
                                </p>
                                {note.tags.map(tag => tag.name).includes(tag.name)
                                    ? <CheckSharpIcon style={{margin: 12, color: "#198754"}}/>
                                    : <IconButton
                                        className="btn"
                                        onClick={() => addTag(onEdition.id, tag.id)} 
                                    >
                                        <AddIcon/>
                                    </IconButton>
                                }
                            </div>
                            <hr/>
                        </>
                    ))
                }
            </div>
            <div className="w-50 d-flex justify-content-between my-3">
                <button 
                    className="btn btn-outline-success"
                    style={{width: '45%'}}
                    onClick={() => {
                            setOpenTagModal(false)
                        }
                    }
                >
                    Listo
                </button>
            </div>
        </div>
      );

    return (
        <>
            <div className= "col-md-3 blue-aside" id="notes-cont">
                <div className="row full-height w-100">
                    <div className="col d-flex justify-content-between align-items-center">
                        {pathname === '/archive'
                            ? <h4 className="display-6 white">Notas archivadas</h4>
                            : pathname === '/trash'
                            ? <h4 className="display-5 white">Papelera</h4>
                            : <>
                                <h4 className="display-5 white">Notas</h4>
                                <IconButton 
                                    className="p-0 btn"
                                    style={{width: 45, height: 45}}
                                    onClick={newNote}
                                >
                                    <AddIcon className="w-75 h-75 white"/>
                                </IconButton>
                            </>
                        }
                    </div>
                    <div id="notes-cont-3">
                        {
                            notes && notes.map((note, index) => (
                                <NoteCard
                                    editNote={editNote}
                                    collection={collections.filter(e => e.id === note.collectionId)[0]}
                                    content={note.id === onEdition.id ? onEdition.content : note.content}
                                    date={note.createdAt && moment(note.createdAt.slice(0, 10), "YYYY-MM-DD").format("DD/MM/YYYY")}
                                    hour="20:15"
                                    id={note.id}
                                    key={index}
                                    title={note.id === onEdition.id ? onEdition.title : note.title}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="col-md-9 row" id="notes-cont-2">
                {onEdition.id
                    ? <>
                        <div className="row w-100 h-95">
                            <div className="ui transparent input input-title mx-3 w-100">
                                <Modal
                                    open={openColModal}
                                    onClose={() => setOpenColModal(false)}
                                    className="d-flex w-100 justify-content-center align-items-center"
                                >
                                    {colModal}
                                </Modal>
                                <input 
                                    className="w-50" 
                                    autocomplete="off"
                                    type="text" 
                                    placeholder="Título..." 
                                    value={onEdition.title || ''}
                                    name="title"
                                    onChange={handleChange}
                                    id="note-title"
                                />
                                {note.collectionId
                                    ? <Chip 
                                        clickable
                                        variant="outlined" 
                                        color="primary"
                                        icon={<CollectionsBookmarkOutlinedIcon/>} 
                                        label={collection.name}
                                        onClick={() => setOpenColModal(true)}
                                    />
                                    : <Chip 
                                        clickable
                                        //variant="outlined" 
                                        color="primary"
                                        icon={<AddIcon/>} 
                                        label="Añadir colección"
                                        onClick={() => setOpenColModal(true)}
                                    />
                                }
                            </div>
                            <div className="ui transparent textarea w-100 h-95 mx-3">
                                <textarea 
                                    placeholder="Deja fluír tus ideas..." 
                                    className="note-content w-100 h-95" 
                                    style={{height: '95%', paddingTop: '2%'}} 
                                    value={onEdition.content || ''}
                                    name="content"
                                    onChange={handleChange}
                                    onKeyUp={automaticSave}
                                />
                            </div>
                        </div>
                        <div className="actions-notes p-0 px-3">
                            <Modal
                                open={openTagModal}
                                onClose={() => setOpenTagModal(false)}
                                className="d-flex w-100 justify-content-center align-items-center"
                            >
                                {tagModal}
                            </Modal>
                            <div className="row">
                                <div className="col-md-8 m-0 d-flex align-items-center">
                                    {note.tags && note.tags.map(tag => (
                                        <div className="tab-indicator mx-1 px-2" style={{backgroundColor: tag.color}}>
                                            <div className="col d-flex align-items-center justify-content-between h-100">
                                            <p>
                                            {tag.name}
                                            </p>
                                            <IconButton 
                                                className="p-0 btn" 
                                                id="delete-tag"
                                                onClick={() => deleteTag(onEdition.id, tag.id)}
                                            >
                                                <HighlightOffOutlinedIcon/>
                                            </IconButton>
                                            </div>
                                        </div>
                                    ))}
                                    <IconButton
                                        className="btn"
                                        onClick={() => setOpenTagModal(true)}
                                        title="Añadir etiqueta"
                                    >
                                    <AddIcon/>
                                    </IconButton>
                                </div>
                                <div  className="col-md-4 m-0 d-flex justify-content-end">
                                    {pathname === '/home' &&
                                        <>
                                            <IconButton 
                                                className="btn"
                                                onClick={duplicate}
                                                title="Duplicar"
                                            >
                                                <FileCopyOutlinedIcon/>
                                            </IconButton>
                                            <IconButton 
                                                className="btn"
                                                //onClick={duplicate}
                                                title="Favorito"
                                            >
                                                <FavoriteBorderOutlinedIcon/>
                                            </IconButton>
                                        </>
                                    }
                                    {pathname === '/archive' 
                                        ? <IconButton 
                                            className="btn"
                                            onClick={() => handleStateChange('main-dashboard')}
                                            title="Desarchivar"
                                        >
                                            <UnarchiveOutlinedIcon/>
                                        </IconButton>
                                        : <IconButton 
                                            className="btn"
                                            onClick={() => handleStateChange('archive')}
                                            title="Archivar"
                                        >
                                            <ArchiveOutlinedIcon/>
                                        </IconButton>
                                    }
                                    {pathname === '/trash' 
                                        ? <>
                                         <IconButton 
                                            className="btn"
                                            onClick={() => setOpenDialog(true)}
                                            title="Eliminar nota"
                                        >
                                            <DeleteForeverOutlinedIcon/>
                                        </IconButton>
                                        <IconButton 
                                            className="btn"
                                            onClick={() => handleStateChange('main-dashboard')}
                                            title="Restaurar">
                                            <RestoreFromTrashOutlinedIcon/>
                                        </IconButton>
                                        </>
                                        : <IconButton 
                                            className="btn"
                                            onClick={() => handleStateChange('trash')}
                                            title="Mover a la papelera">
                                            <DeleteOutlineOutlinedIcon/>
                                        </IconButton>
                                    }
                                    <IconButton 
                                        className="btn"
                                        onClick={() => {}}
                                        //title=""
                                    >
                                        <MoreVertOutlinedIcon/>
                                    </IconButton>
                                    
                                </div>
                            </div>
                        </div>
                      </>
                    : <div className="all-center full-height row">
                            <img 
                                src="/svg/select.svg" 
                                alt="" 
                                height="70%"
                                draggable={false}
                            />
                            <b className="all-center">Selecciona una nota para ver su contenido o editarla</b>
                      </div>
                }
                <Dialog
                        open={openDialog}
                        onClose={() => setOpenDialog(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            ¿Desea eliminar la nota?
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Tenga en cuenta que una vez que elimine la nota la misma no podrá ser recuperada.
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
                                    handleDelete(onEdition.id, onEdition.userId)
                                    setOpenDialog(false)
                                }} 
                                color="primary"
                            >
                                Eliminar
                            </Button>
                        </DialogActions>
                    </Dialog>
            </div>
        </>
    )
}

export default Notes
