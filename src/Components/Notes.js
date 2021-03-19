import React from 'react'
import moment from 'moment'
import momenttz from 'moment-timezone'
import { Chip, IconButton } from '@material-ui/core'
import NoteCard from './NoteCard'
import AddIcon from '@material-ui/icons/Add';

const Notes = ({
    collections,
    darkMode,
    editNote,
    inputValue,
    largeWidth,
    newNote, 
    notes, 
    onEdition, 
    pathname,
    restartFilter,
    selectedFilter
}) => {

    const register = []

    return (
        <div className= {largeWidth ? "blue-aside notes-cont" : "notes-cont"} id={darkMode && 'dark-border'}>
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
                {selectedFilter.name !== "" &&
                    <div className="row d-flex align-items-center mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <b classNbame="m-0">{`${selectedFilter.type} seleccionada:`}</b>
                            <Chip label={selectedFilter.name} onDelete={restartFilter} color="primary" className="filter-selected" deleteIconSmall/>
                        </div>
                    </div>

                }
                <div id={"notes-cont-3"} className={notes.length === 0 && "all-center"}>
                    {notes.length !== 0
                        ? notes && notes.map((note, index) => {
                            const updated = moment(note.updatedAt.slice(0, 10), "YYYY-MM-DD").fromNow().split(' ')
                            console.log(updated)
                            return (
                                <>
                                    {(updated[1] === 'hour' || updated[1] === 'hours') && !register.includes('today') && (
                                        register.push('today'),
                                        <>
                                            <b>Actualizadas hoy</b>
                                            <hr className="mt-0"/>
                                        </>
                                    )}
                                    {updated[1] === 'day' && !register.includes('yesterday') && (
                                        register.push('yesterday'),
                                        <>
                                            <b>Ayer</b>
                                            <hr className="mt-0"/>
                                        </>
                                    )}
                                    {updated[1] === 'days' && !register.includes('days') && (
                                        register.push('days'),
                                        <>
                                            <b>Dos días o mas</b>
                                            <hr className="mt-0"/>
                                        </>
                                    )}
                                    {updated[1] === 'days' && parseInt(updated[0]) >= 7 && !register.includes('week') && (
                                        register.push('week'),
                                        <>
                                            <b>Una semana o mas</b>
                                            <hr className="mt-0"/>
                                        </>
                                    )}
                                    {(updated[1] === 'month' || updated[1] === 'months') && !register.includes('month') && (
                                        register.push('month'),
                                        <>
                                            <b>Un mes o mas</b>
                                            <hr className="mt-0"/>
                                        </>
                                    )}
                                    {(updated[1] === 'year' || updated[1] === 'years') && !register.includes('year') && (
                                        register.push('year'),
                                        <>
                                            <b>Un año o mas</b>
                                            <hr className="mt-0"/>
                                        </>
                                    )}
                                    <NoteCard
                                        editNote={editNote}
                                        collection={collections.filter(e => e.id === note.collectionId)[0]}
                                        content={note.id === onEdition.id ? onEdition.content : note.content}
                                        date={note.updatedAt && moment(note.updatedAt.slice(0, 10), "YYYY-MM-DD").format("DD/MM/YY")}
                                        darkMode={darkMode}
                                        hour={note.updatedAt && momenttz(note.updatedAt).tz('America/Montevideo').format("HH:mm")}
                                        id={note.id}
                                        key={index}
                                        title={note.id === onEdition.id ? onEdition.title : note.title}
                                    />
                                </>
                            )
                        })
                        : <div>
                            {
                                inputValue.length > 3 
                                ? <>
                                    <img 
                                        draggable={false} 
                                        src="https://img.icons8.com/cute-clipart/150/000000/nothing-found.png" 
                                        alt="not-found" 
                                        style={{marginBottom: '10%'}}
                                    />
                                    <p className="all-center"><b>No hay coincidencias</b></p>
                                </>
                                : <>
                                    <img 
                                        draggable={false} 
                                        src="https://img.icons8.com/cute-clipart/150/000000/error.png" 
                                        alt="not-found" 
                                        style={{marginBottom: '10%'}}
                                    />
                                    <p className="all-center"><b>No hay notas</b></p>
                                </>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Notes
