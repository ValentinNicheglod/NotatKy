import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import HomeSideBar from '../Components/HomeSideBar';
import NavBarHome from '../Components/NavBarHome';
import Notes from '../Components/Notes'; 

import { getAllCollections } from '../Redux/Actions/Collections'
import { addNoteTag, deleteNoteTag, getAllNotes, getOneNote, createNote, updateNoteState, deleteNote, updateNote } from '../Redux/Actions/Notes'
import { getAllTags } from '../Redux/Actions/Tags'
import { getOneUser, setDarkMode } from '../Redux/Actions/Users' 

import "../Components/css/Notes.css"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer, IconButton, Modal, Snackbar } from '@material-ui/core';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import EditNote from '../Components/EditNote';

const SettingsCollections = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const pathname = history.location.pathname;

    const notes = useSelector(state => state.notes);
    const tags = useSelector(state => state.tags);
    const collections = useSelector(state => state.collections);
    const users = useSelector(state => state.users)

    const [onEdition, setOnEdition] = useState({
        content: '',
        title: '' 
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        undo: true
    })
    const [selectedFilter, setSelectedFilter] = useState({
        type: '',
        name: ''
    })
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState(false)
    const [counter, setCounter] = useState(0)
    const [drawerOpen, setDrawerOpen] = useState(false)

    const [openDialog, setOpenDialog] = useState(false)
    const [openNote, setOpenNote] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [openTagModal, setOpenTagModal] = useState(false)
    const [openColModal, setOpenColModal] = useState(false)
    

    useEffect(() => {
        if(sessionStorage.getItem('token') === null){
            history.push('/login')
        }
    }, [history])

    useEffect(() => {
        dispatch(getOneUser(1))
        dispatch(getAllCollections(1))
        dispatch(getAllTags(1))
        dispatch(getAllNotes(1))
        dispatch(setDarkMode(localStorage.getItem('darkMode') === true || localStorage.getItem('darkMode') === 'true'))
        //notes.notes[0] && setOnEdition(notes.notes[0])
        if (!notes.note.id && onEdition.id){
            dispatch(getOneNote(onEdition.id))
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    notes.notes && notes.notes.sort((a, b) => {
        if (a.updatedAt > b.updatedAt) {
          return -1;
        }
        if (a.updatedAt < b.updatedAt) {
          return 1;
        }
        return 0;
    });

    let mainDashboardNotes = notes.notes.filter((note) => note.state === "main-dashboard")
    let archivedNotes = notes.notes.filter((note) => note.state === "archive")
    let trashNotes = notes.notes.filter((note) => note.state === "trash")

    const largeWidth = window.innerWidth > 600

    const addTag = (noteId, tagId) => {
        dispatch(addNoteTag(noteId, tagId))
        setTimeout(() => {
            dispatch(getAllNotes(1))
        }, 500)
    }

    const automaticSave = () => {
        setCounter(counter + 1)
        if (counter >= 10) {
            setLoading(true)
            setCounter(0)
            dispatch(updateNote(onEdition))
            setTimeout(() => {
                dispatch(getAllNotes(1))
            }, 500)
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }
    }

    const closeNote = () => {
        setOpenNote(false)
        setTimeout(() => {
            setOnEdition({
                title: '',
                content: ''
            })
        }, 1000)
    }

    const closeSnackbar = () => {
        setSnackbar({
            ...snackbar,
            open: false
        })
    }

    const deleteTag = (noteId, tagId) => {
        dispatch(deleteNoteTag(noteId, tagId))
    }
    
    const newNote = async () => {
        dispatch(createNote({
            title: '',
            content: ''
        }, 1))
        setTimeout(() => {
            dispatch(getAllNotes(1))
        }, 500) 
        setTimeout(() => {
            setOnEdition({
                title: '',
                content: ''
            })
        }, 1000)
        
    }

    const duplicateNote = () => {
        onEdition.id && dispatch(createNote({
            ...notes.note,
            title: onEdition.title,
            content: onEdition.content
        }, 1))
        showSnackBar('Nota duplicada', notes.response, false)
        setTimeout(() => {
            dispatch(getAllNotes(1))
        }, 500) 
    }

    const editNoteCollection = (id) => {
        dispatch(updateNote({
            ...notes.note,
            collectionId: id
        }))
        setTimeout(() => {
            dispatch(getAllNotes(1))
        }, 500)
    }

    const editNote = (id) => {
        onEdition.id && saveNote()
        const noteById = notes.notes.filter(note => note.id === id)
        setTimeout(() => {
            setOnEdition(noteById[0])
            dispatch(getOneNote(id))
            !largeWidth && setOpenNote(true)
        }, 300)
    }

    const filterCollections = (id) => {
        setDrawerOpen(false)
        setSelectedFilter({
            type: 'Colección',
            name: collections.collections.filter((col) => col.id === id)[0].name
        })
        pathname === '/trash' 
        ? setFilter(trashNotes.filter((note) => note.collectionId === id))
        : pathname === '/archive'
        ? setFilter(archivedNotes.filter((note) => note.collectionId === id))
        : setFilter(mainDashboardNotes.filter((note) => note.collectionId === id))
    }

    const filterTags = (id) => {
        setDrawerOpen(false)
        setSelectedFilter({
            type: 'Etiqueta',
            name: tags.tags.filter((tag) => tag.id === id)[0].name
        })
        pathname === '/trash' 
        ? setFilter(trashNotes.filter((note) => note.tags.some((tag) => tag.id === id)))
        : pathname === '/archive'
        ? setFilter(archivedNotes.filter((note) => note.tags.some((tag) => tag.id === id)))
        : setFilter(mainDashboardNotes.filter((note) => note.tags.some((tag) => tag.id === id)))
    }

    const handleChange = (e) => {
        setOnEdition({
            ...onEdition,
            [e.target.name]: e.target.value
        })
    }

    const handleDelete = (noteId, userId) => {
        dispatch(deleteNote(noteId, userId))
        setOnEdition({
            title: '',
            content: ''
        })
        setOpenNote(false)
        showSnackBar('Nota eliminada', notes.response, false)
    };

    const handleSearchChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleStateChange = (type, message) => {
        dispatch(updateNoteState({
            ...notes.note,
            state: type
        }))
        setOnEdition({
            title: '',
            content: ''
        })
        setOpenNote(false)
        showSnackBar(message, notes.response, true)
    }

    const restartFilter = () => {
        setSelectedFilter({
            type: '',
            name: ''
        })
        changeRoute('/home')
    }
    

    const saveNote = () => {
        if (onEdition.title !== notes.note.title || onEdition.content !== notes.note.content){
            dispatch(updateNote(onEdition))
            setTimeout(() => {
                dispatch(getAllNotes(1))
            }, 500)   
        }   
    }

    const showSnackBar = (message, status, undo) => {
        status === 201
        ? setSnackbar({
            open: true,
            message,
            undo
        })
        : setSnackbar({
            open: true,
            message: "Ha ocurrido un error",
            undo: false
        })
    }
    

    const changeRoute = (url) => {
		history.push(url)
        setFilter(false)
        setOnEdition({
            title: '',
            content: ''
        })
        setDrawerOpen(false)
	}

    const filteredMainNotes = mainDashboardNotes.filter((note) => note.title.includes(inputValue) || note.content.includes(inputValue));
    const filteredTrashNotes = trashNotes.filter((note) => note.title.includes(inputValue) || note.content.includes(inputValue));
    const filteredArchiveNotes = archivedNotes.filter((note) => note.title.includes(inputValue) || note.content.includes(inputValue));
    const filteredFilter = filter && filter.filter((note) => note.title.includes(inputValue) || note.content.includes(inputValue));

    return (
        <div className= {largeWidth ? "row full-height overflow-hidden" : "row full-height overflow-hidden bs-gutter"}>
                    {largeWidth
                        ? <div className= "col-md-2 login-bg full-height" id="home-side-bar">
                            <HomeSideBar
                                changeRoute={changeRoute}
                                filterTags={filterTags}
                                filterCollections={filterCollections}
                                largeWidth={largeWidth}
                                tags={tags.tags}
                                collections={collections.collections}
                                pathname={pathname}
                            /> 
                        </div>
                        : <Drawer 
                            open={drawerOpen} 
                            onClose={() => setDrawerOpen(false)}
                        >
                            <div className= "col-md-2 login-bg full-height" id="home-side-bar">
                            <HomeSideBar
                                changeRoute={changeRoute}
                                filterTags={filterTags}
                                filterCollections={filterCollections}
                                largeWidth={largeWidth}
                                tags={tags.tags}
                                collections={collections.collections}
                                pathname={pathname}
                            />
                            </div>
                        </Drawer>
                    }
                    <div className= "col-md-10 row full-height mr-0" id="notes-cont-4">
                        <NavBarHome
                            closeNote={closeNote}
                            collection={collections.collections.filter(e => e.id === notes.note.collectionId)[0]}
                            handleChange={handleSearchChange}
                            inputValue={inputValue}
                            largeWidth={largeWidth}
                            loading={loading}
                            note={notes.note}
                            onEdition={onEdition}
                            openNote={openNote}
                            saveNote={saveNote}
                            setDrawerOpen={setDrawerOpen}
                            setOpenColModal={setOpenColModal}
                            user={users.user}
                        />
                        <div className="row h-95 note-cont-4">
                            <div className="col-md-3 bs-gutter full-height">
                                {openNote && !largeWidth && onEdition.id
                                    ? <EditNote
                                        addTag={addTag}
                                        automaticSave={automaticSave}
                                        changeRoute={changeRoute}
                                        collection={collections.collections.filter(e => e.id === notes.note.collectionId)[0]}
                                        collections={collections.collections}
                                        deleteTag={deleteTag}
                                        duplicate={duplicateNote}
                                        editCollection={editNoteCollection}
                                        handleChange={handleChange}
                                        handleStateChange={handleStateChange}
                                        largeWidth={largeWidth}
                                        note={notes.note}
                                        mainDashboardNotes={mainDashboardNotes}
                                        notes={
                                            filter !== false
                                            ? inputValue.length >= 3 ? filteredFilter : filter
                                            : pathname === '/archive'
                                            ? inputValue.length >= 3 ? filteredArchiveNotes : archivedNotes
                                            : pathname === '/trash'
                                            ? inputValue.length >= 3 ? filteredTrashNotes : trashNotes
                                            : inputValue.length >= 3 ? filteredMainNotes : mainDashboardNotes
                                        }
                                        onEdition={onEdition}
                                        openColModal={openColModal}
                                        openTagModal={openTagModal}
                                        pathname={pathname}
                                        setOpenColModal={setOpenColModal}
                                        setOpenDialog={setOpenDialog}
                                        setOpenTagModal={setOpenTagModal}
                                        tags={tags.tags}
                                    />
                                    : <Notes
                                        collections={collections.collections}
                                        darkMode={users.darkMode}
                                        editNote={editNote}
                                        inputValue={inputValue}
                                        largeWidth={largeWidth}
                                        newNote={newNote}
                                        notes={
                                            filter !== false
                                            ? inputValue.length >= 3 ? filteredFilter : filter
                                            : pathname === '/archive'
                                            ? inputValue.length >= 3 ? filteredArchiveNotes : archivedNotes
                                            : pathname === '/trash'
                                            ? inputValue.length >= 3 ? filteredTrashNotes : trashNotes
                                            : inputValue.length >= 3 ? filteredMainNotes : mainDashboardNotes
                                        }
                                        onEdition={onEdition}
                                        pathname={pathname}
                                        restartFilter={restartFilter}
                                        selectedFilter={selectedFilter}
                                    />
                                }
                            </div>
                            {largeWidth &&
                                <div className="col-md-9 bs-gutter full-height">
                                    <EditNote
                                        addTag={addTag}
                                        allNotes={notes.notes}
                                        automaticSave={automaticSave}
                                        changeRoute={changeRoute}
                                        collection={collections.collections.filter(e => e.id === notes.note.collectionId)[0]}
                                        collections={collections.collections}
                                        deleteTag={deleteTag}
                                        duplicate={duplicateNote}
                                        editCollection={editNoteCollection}
                                        handleChange={handleChange}
                                        handleStateChange={handleStateChange}
                                        largeWidth={largeWidth}
                                        newNote={newNote}
                                        note={notes.note}
                                        notes={
                                            filter !== false
                                            ? inputValue.length >= 3 ? filteredFilter : filter
                                            : pathname === '/archive'
                                            ? inputValue.length >= 3 ? filteredArchiveNotes : archivedNotes
                                            : pathname === '/trash'
                                            ? inputValue.length >= 3 ? filteredTrashNotes : trashNotes
                                            : inputValue.length >= 3 ? filteredMainNotes : mainDashboardNotes
                                        }
                                        onEdition={onEdition}
                                        openColModal={openColModal}
                                        openTagModal={openTagModal}
                                        pathname={pathname}
                                        setOpenColModal={setOpenColModal}
                                        setOpenDialog={setOpenDialog}
                                        setOpenTagModal={setOpenTagModal}
                                        tags={tags.tags}
                                    />
                                </div>
                                /* : <div className="all-center">
                                {openNote && 
                                    <Modal 
                                        className="modal-note"
                                        open={openNote}
                                    >
                                        <EditNote
                                            addTag={addTag}
                                            automaticSave={automaticSave}
                                            changeRoute={changeRoute}
                                            collection={collections.collections.filter(e => e.id === notes.note.collectionId)[0]}
                                            collections={collections.collections}
                                            deleteTag={deleteTag}
                                            duplicate={duplicateNote}
                                            editCollection={editNoteCollection}
                                            handleChange={handleChange}
                                            handleStateChange={handleStateChange}
                                            note={notes.note}
                                            onEdition={onEdition}
                                            pathname={pathname}
                                            setOpenDialog={setOpenDialog}
                                            tags={tags.tags}
                                        />
                                    </Modal>
                                }
                                </div> */
                            }

                        </div>
                    </div>
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
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={snackbar.open}
                        autoHideDuration={5000}
                        onClose={closeSnackbar}
                        message={snackbar.message}
                        action={
                        <>
                            {snackbar.undo && snackbar.message !== 'Acción desecha'
                                ? <Button color="inherit" size="small" onClick={() => {
                                    handleStateChange(pathname === '/home' ? 'main-dashboard' : pathname.slice(1), 'Acción desecha')}}
                                >
                                    Deshacer
                                </Button>
                                : null
                            }
                            <IconButton size="small" color="inherit" onClick={closeSnackbar}>
                            <HighlightOffOutlinedIcon fontSize="small" />
                            </IconButton>
                        </>
                        }
                    />
        </div>
    )
}

export default SettingsCollections