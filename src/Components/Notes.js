import React from 'react'
import NoteCard from './NoteCard'

const notes = [
    {
    title: "HEY", 
    content: "This is a note bitch", 
    date: "23/11/20",
    tags: ['Tareas', 'Matematicas'],
    collections: ['Universidad']
    },
    {
        title: "HEY", 
        content: "This is a note bitch", 
        date: "23/11/20",
        tags: ['Tareas', 'Matematicas'],
        collections: ['Universidad']
    },
    {
        title: "HEY", 
        content: "This is a note bitch", 
        date: "23/11/20",
        tags: ['Tareas', 'Matematicas'],
        collections: ['Universidad']
    },
]

const Notes = () => {
    return (
        <>
            <div className= "col-md-3 blue-aside" id="notes-cont">
                <div className="row">
                    {
                        notes.map(note => (
                            <NoteCard
                                title={note.title}
                                content={note.content}
                                date={note.date}
                                tags={note.tags}
                                collections={note.collections}
                            />
                        ))
                    }
                </div>

            </div>
            <div className="col-md-9">
                    <h1>UNDER CONSTRUCTION</h1>
            </div>
        </>
    )
}

export default Notes
