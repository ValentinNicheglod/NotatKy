import React from 'react'

const NoteCard = ({collection, content, darkMode, date, editNote, hour, id, title}) => {
    return (
        <div 
            className="card note-card" 
            id={darkMode && "dark-blue"}
            onClick={() => editNote(id)}
        >
            <div className="card-title">
                <h3>{title.length > 20 ? `${title.slice(0, 20)}...` : title}</h3>
            </div>
            <div className="card-text d-flex h-100">
                <p>{content.length > 100 ? `${content.slice(0, 100)}...` : content}</p>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center px-0" id={darkMode && "dark-blue"}>
                <div className="w-50">
                {collection && 
                    <span style={{backgroundColor: '#2185D0', borderRadius: 10}} className="uk-label">{collection.name}</span>
                }
                </div>
                <div className="w-50 d-flex justify-content-end">
                    <p>{date} | {hour}</p>
                </div>
                
            </div>
        </div>
    )
}

export default NoteCard
