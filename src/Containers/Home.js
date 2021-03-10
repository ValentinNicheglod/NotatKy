import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import Archive from '../Components/Archive';
import HomeSideBar from '../Components/HomeSideBar';
import NavBarHome from '../Components/NavBarHome';
import Notes from '../Components/Notes';
import Trash from '../Components/Trash';

import { getAllCollections } from '../Redux/Actions/Collections'
import { addNoteTag, deleteNoteTag, getAllNotes, getOneNote, createNote, updateNoteState, deleteNote, updateNote } from '../Redux/Actions/Notes'
import { getAllTags } from '../Redux/Actions/Tags'
import { getOneUser } from '../Redux/Actions/Users' 


import "../Components/css/Notes.css"

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
    const [loading, setLoading] = useState(false)
    const [filterTag, setFilterTag] = useState(false)
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        dispatch(getAllCollections(1))
        dispatch(getAllTags(1))
        dispatch(getOneUser(1))
        dispatch(getAllNotes(1))
        //notes.notes[0] && setOnEdition(notes.notes[0])
        if (!notes.note.id && onEdition.id){
            dispatch(getOneNote(onEdition.id))
        }
        return () => {
            console.log('cleanup')
        }
    }, [])

    useEffect(() => {
        console.log(loading)
    }, [loading])

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

    const addTag = (noteId, tagId) => {
        dispatch(addNoteTag(noteId, tagId))
    }

    const automaticSave = () => {
        setCounter(counter + 1)
        if (counter >= 10) {
            setLoading(true)
            setCounter(0)
            dispatch(updateNote(onEdition))
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }
    }

    const deleteTag = (noteId, tagId) => {
        dispatch(deleteNoteTag(noteId, tagId))
    }
    
    const newNote = () => {
        dispatch(createNote({
            title: '',
            content: ''
        }, 1))
        setTimeout(() => {
            dispatch(getAllNotes(1))
            setOnEdition(notes.note)
        }, 500) 
    }

    const duplicateNote = () => {
        onEdition.id && dispatch(createNote(onEdition, 1))
    }

    const editNoteCollection = (id) => {
        console.log(id)
        dispatch(updateNote({
            ...notes.note,
            collectionId: id
        }))
    }

    const editNote = (id) => {
        const noteById = notes.notes.filter(note => note.id === id)
        setOnEdition(noteById[0])
        dispatch(getOneNote(id))
    }

    const filterTags = (id) => {
        const filteredNotes = mainDashboardNotes.filter((note) => note.tags.some((tag) => tag.id === id));
        setFilterTag(filteredNotes)
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
    };

    const handleStateChange = (type) => {
        dispatch(updateNoteState({
            ...notes.note,
            state: type
        }))
        setOnEdition({
            title: '',
            content: ''
        })
    }

    const saveNote = () => {
        dispatch(updateNote(onEdition))
    }

    const changeRoute = (url) => {
		history.push(url)
        setFilterTag(false)
        setOnEdition({
            title: '',
            content: ''
        })
	}

    return (
        <div className= "row full-height">
                    <div className= "col-md-2 login-bg full-height" id="home-side-bar">
                        <HomeSideBar
                            changeRoute={changeRoute}
                            filterTags={filterTags}
                            tags={tags.tags}
                            collections={collections.collections}
                        /> 
                    </div>
                    <div className= "col-md-10 row full-height mr-0" id="notes-cont-4">
                        <NavBarHome
                            loading={loading}
                            saveNote={saveNote}
                            user={users.user}
                            onEdition={onEdition}
                        />
                        <Notes
                            addTag={addTag}
                            automaticSave={automaticSave}
                            collection={collections.collections.filter(e => e.id === notes.note.collectionId)[0]}
                            collections={collections.collections}
                            deleteTag={deleteTag}
                            duplicate={duplicateNote}
                            editNote={editNote}
                            editCollection={editNoteCollection}
                            handleDelete={handleDelete}
                            handleChange={handleChange}
                            handleStateChange={handleStateChange}
                            newNote={newNote}
                            note={notes.note}
                            notes={
                                pathname === '/archive'
                                ? archivedNotes
                                : pathname === '/trash'
                                ? trashNotes
                                : filterTag !== false
                                ? filterTag
                                : mainDashboardNotes
                            }
                            onEdition={onEdition}
                            pathname={pathname}
                            tags={tags.tags}
                        />
                    </div>
        </div>
    )
}

export default SettingsCollections