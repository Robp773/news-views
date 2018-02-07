import React from 'react';
import './ColumnHeader.css';
export default function ColumnHeader(props){
    return (
        <div className='header'>
            <h2>{props.site}</h2>
            <img  alt='wordCloud' className='wordCloud' src={props.imgUrl}/>
        </div>
    )
}