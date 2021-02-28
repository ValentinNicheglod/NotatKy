import React from 'react'

const NoteCard = ({content, date, editNote, hour, key, tags, title}) => {
    return (
        <div 
            className="card note-card"
            onClick={() => editNote(key)}
        >
            <div className="card-title">
                <h3>{title.length > 20 ? `${title.slice(0, 20)}...` : title}</h3>
            </div>
            <div className="card-text d-flex h-100">
                <p>{content.length > 100 ? `${content.slice(0, 100)}...` : content}</p>
            </div>
            <div className="card-footer d-flex justify-content-end align-items-end px-0">
                <p>{date} | {hour}</p>
            </div>
        </div>
    )
}

export default NoteCard
