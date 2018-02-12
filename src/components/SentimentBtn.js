import React from 'react';
import './SentimentBtn.css';
import {updateOpinion} from '../actions';
import {connect} from 'react-redux';

export class SentimentBtn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingOpinion: false
        }   
    }

    getSentiment(){
        this.setState({loadingOpinion: true})
        let sentiment;
        fetch(`https://api.dandelion.eu/datatxt/sent/v1/?token=ad1374871af846789221035b037ed543&url=${this.props.url}`)
        .then((result)=>{
            return result.json()
        })
        .then((json)=>{
        this.props.dispatch(updateOpinion(this.props.index, json.sentiment.type, this.props.site))
    })

    }

    render(){

        return(
                <div>
                    <h4 className='opinionResult'>{this.props.opinion}</h4>
                    <button onClick={()=>{this.getSentiment()}} className='hideShow sentimentBtn'>Sentiment</button>
                </div>
        )

        }
    }


    export default connect()(SentimentBtn)