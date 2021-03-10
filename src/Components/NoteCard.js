import React from 'react'

const NoteCard = ({collection, content, date, editNote, hour, id, title}) => {
    return (
        <div 
            className="card note-card"
            onClick={() => editNote(id)}
        >
            <div className="card-title">
                <h3>{title.length > 20 ? `${title.slice(0, 20)}...` : title}</h3>
            </div>
            <div className="card-text d-flex h-100">
                <p>{content.length > 100 ? `${content.slice(0, 100)}...` : content}</p>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center px-0">
                {collection && 
                    <div className="tab-indicator mx-1 px-2 all-center" style={{backgroundColor: '#645BCC'}}>
                        {collection.name}
                    </div>
                }
                <p>{date} | {hour}</p>
            </div>
        </div>
    )
}

export default NoteCard
