import React from 'react';
import './ColumnText.css';
import SentimentBtn from './SentimentBtn'

export default class ColumnText extends React.Component{
   
        constructor(props){
            super(props)
    }
    
    render(){
        let result;
        let headlines = this.props.headlines;
        let headlinesArray = [];
        for(let i=0;i<headlines.length;i++){
            if(headlines[i].opinion !=  undefined){
                result = headlines[i].opinion
            }        

        headlinesArray.push(
        <div className='headline' key={`${this.props.site}${i}`}>
            <div className='linkContainer'>
                <a  className='headlineLink' href={headlines[i].url}>
                    {headlines[i].headlineText}
                    <div className='borderDiv'></div>            
                </a>
            </div>
            <SentimentBtn site = {this.props.site} index={i} url={headlines[i].url} opinion={headlines[i].opinion}/> 

            <div className='hideShow description'>{headlines[i].description}</div> 
        </div>
        )

        }
        return (
                <div>{headlinesArray}</div>
               ) 
            }
}

