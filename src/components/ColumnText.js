import React from 'react';
import './ColumnText';
export default class ColumnHeader extends React.Component{
    super(props){
        constructor(props);
    }
    render(){
        let headlines = this.props.headlines;
        let headlinesArray = [];
        // temporary way to give out unique keys to child 
        // elements while still using mock data   
        let key = 0;
        headlines.map((item)=>{       
        headlinesArray.push(<h3 key={(item.url + key)}><a href={item.url}>{item.headlineText}</a></h3>)
        return key++
        })
        return (
                <div>{headlinesArray}</div>
               ) 
            }
}