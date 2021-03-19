//import React from 'react'

const ModalTag = () => {
    return (
        {/* <div className="modal-col">
            <h2 id="simple-modal-title">Añadir etiquetas</h2>
            <hr/>
            <div className="tag-cont">
                {tags.length > 0
                    ? tags && tags.map((tag, index) => (
                        <>
                            <div key={index} className="d-flex justify-content-between align-items-center px-2">
                                <p className="d-inline m-0">
                                <LocalOfferIcon style={{color: tag.color}}/>
                                &nbsp;&nbsp;&nbsp;{tag.name}
                                
                                </p>
                                {
                                     note.tags && note.tags.map(tag => tag.name).includes(tag.name)
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
                    : <div className="all-center row w-100 m-0">
                        <div className="all-center">
                            <img src="https://img.icons8.com/cute-clipart/150/000000/important-property.png" alt=""/>
                        </div>
                        <p className="all-center mt-4"><b>Aun no tienes etiquetas</b></p>
                    </div>
                }
            </div>
            {tags.length > 0
                ? <div className="w-100 d-flex justify-content-between align-items-center my-3">
                    <button 
                        className="btn btn-success w-25"
                        //style={{width: '5%'}}
                        onClick={() => {
                                setOpenTagModal(false)
                            }
                        }
                    >
                        Listo
                    </button>
                    <button 
                        className="btn btn-add-col p-0"
                        onClick={() => changeRoute('/collections tags')}
                    >
                        <p>
                            <AddIcon/>
                            &nbsp;&nbsp;Crear nueva etiqueta
                        </p>
                    </button>
                </div>
                : <div className="w-100 all-center my-3">
                    <button 
                        className="btn btn-success"
                        onClick={() => changeRoute('/collections tags')}
                    >
                        <p>
                            <AddIcon/>
                            &nbsp;&nbsp;Crear nueva etiqueta
                        </p>
                    </button>
                </div>
            }
        </div> */}
    )
}

export default ModalTag
