import React from 'react';
import './ColumnText.css';
import SingleHeadline from './SingleHeadline';

export default class ColumnText extends React.Component{
    render(){
        let headlines = this.props.headlines;
        let headlinesArray = [];
        for(let i=0;i<headlines.length;i++){
        
        headlinesArray.push(
        <SingleHeadline 
            key={`${this.props.site}${i}`} 
            site={this.props.site}
            headlineText={headlines[i].headlineText}
            headlineUrl={headlines[i].url}
            opinion={headlines[i].opinion}
            description={headlines[i].description}
            index={i}
        />
        )}
        return (
                <div>{headlinesArray}
                </div>
               ) 
            }
}

