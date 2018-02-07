import React from 'react';
import './Search.css';

export default class Search extends React.Component{
super(props){
    constructor(props);
}

render(){
    return(
        <form className='searchForm'>
            <input type='text' placeholder='Search for a Specific Topic'/>
            <button type='submit'>Search</button>
        </form>
    )
}
}