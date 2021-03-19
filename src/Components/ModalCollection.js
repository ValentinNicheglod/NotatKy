//import React from 'react'

const ModalCollection = () => {
    return (
        {/* <div className="modal-col">
            <h2 id="simple-modal-title">
                {note.collectionId ? "Editar colección" : "Añadir colección"}
            </h2>
            <hr/>
            <div className="tag-cont">
                {collections.length > 0
                    ? collections && collections.map((col, index) => (
                        <>
                            <div key={index} className="d-flex justify-content-between align-items-center px-2">
                                <p className="d-inline m-0">
                                    <CollectionsBookmarkOutlinedIcon/>
                                    &nbsp;&nbsp;&nbsp;{col.name}
                                </p>
                                {col.id === note.collectionId
                                    ? <Chip 
                                        deleteIcon={<HighlightOffOutlinedIcon style={{color: '#2185D0'}}/>}
                                        label="Seleccionada" 
                                        onDelete={() => {
                                            editCollection(null)
                                            setOpenColModal(false)
                                        }}
                                        size="small"
                                        variant="outlined" 
                                        color="primary" 
                                    />
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
                    : <div className="all-center row w-100 m-0">
                        <div className="all-center">
                            <img src="https://img.icons8.com/cute-clipart/150/000000/important-property.png" alt=""/>
                        </div>
                        
                        <p className="all-center mt-4"><b>Aun no tienes colecciones</b></p>
                    </div>
                }
            </div>
            <>
                {collections.length > 0
                    ? <div className="w-100 my-3">
                        <button 
                            className="btn btn-add-col p-0"
                            onClick={() => changeRoute('/collections tags')}
                        >
                            <p>
                                <AddIcon/>
                                &nbsp;&nbsp;Crear nueva colección
                            </p>
                        </button>
                    </div>
                    : <div className="w-100 my-3 all-center">
                        <button 
                            className="btn btn-success"
                            onClick={() => changeRoute('/collections tags')}
                        >
                            <p>
                                <AddIcon/>
                                &nbsp;&nbsp;Crear nueva colección
                            </p>
                        </button>
                    </div>
                }
            </>
        </div> */}
    )
}

export default ModalCollection
