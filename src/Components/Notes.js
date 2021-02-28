import { IconButton } from '@material-ui/core'
import React, { useState } from 'react'
import NoteCard from './NoteCard'
import AddIcon from '@material-ui/icons/Add';

const notes = [
    {
    title: "Heyyyyyyyyyyyyyyyyyyyyy", 
    content: "This is a note bitch", 
    date: "23/11/20",
    tags: ['Tareas', 'Matematicas'],
    collections: ['Universidad'],
    hour: '23:28'
    },
    {
        title: "HEY", 
        content: "This is a note bitch bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla", 
        date: "23/11/20",
        tags: ['Tareas', 'Matematicas'],
        collections: ['Universidad'],
        hour: '23:28'
    },
    {
        title: "HEY", 
        content: "This is a note bitch", 
        date: "23/11/20",
        tags: ['Tareas', 'Per'],
        collections: ['Universidad'],
        hour: '23:28'
    },
]

const Notes = () => {

    const [selectedNote, setSelectedNote] = useState(0)

    const editNote = (index) => {
        setSelectedNote(index)
    }

    return (
        <>
            <div className= "col-md-3 blue-aside" id="notes-cont">
                <div className="row">
                    <div className="col d-flex justify-content-between align-items-center">
                        <h4 className="display-5 white">Notas...</h4>
                        <IconButton 
                            className="p-0 btn"
                            style={{width: 45, height: 45}}
                        >
                            <AddIcon className="w-75 h-75 white"/>
                        </IconButton>
                    </div>
                    
                    {
                        notes.map((note, index) => (
                            <NoteCard
                                editNote={() => editNote(index)}
                                collections={note.collections}
                                content={note.content}
                                date={note.date}
                                hour={note.hour}
                                key={index}
                                tags={note.tags}
                                title={note.title}
                            />
                        ))
                    }
                </div>

            </div>
            <div className="col-md-9" id="notes-cont-2">
                <div className="row w-100 h-95">
                    <div className="ui transparent input w-100">
                        <input 
                            className="w-100" 
                            type="text" 
                            placeholder="Título..." 
                            value={notes[selectedNote].title}
                            id="note-title"
                        />
                    </div>
                    <div className="ui transparent textarea w-100 h-95">
                        <textarea placeholder="Deja fluír tus ideas..." className="note-content w-100 h-95" style={{height: '95%'}} value={notes[selectedNote].content}></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notes
