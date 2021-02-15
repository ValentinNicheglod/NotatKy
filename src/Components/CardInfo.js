import React from 'react'
import { Icon } from 'semantic-ui-react'

import "./css/Card.css"

const CardInfo = ({color, description, image, title}) => {
    return (
        <div className= "card card-info" style={{backgroundColor: color}}>
            <img src={image} alt="icon" className="card-img-top" height="300"/>
            <div className= "card-body">
                <h3 className= "card-title">
                    {title}
                </h3>
                <hr/>
                <p className= "card-text">
                    {description}
                </p>
                <h3 className= "card-title">
                    Empieza &nbsp;&nbsp;
                    <Icon name= "long arrow alternate right"/>   
                </h3>
            </div>
        </div>
    )
}

export default CardInfo
