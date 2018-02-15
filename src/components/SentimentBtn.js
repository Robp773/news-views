import React from 'react';
import './SentimentBtn.css';
import {updateOpinion} from '../actions';
import {connect} from 'react-redux';

export class SentimentBtn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingOpinion: false,
            buttonHidden: false
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
            this.setState({loadingOpinion: false, buttonHidden: true})
})
    }

    render(){
            if(this.state.loadingOpinion){
                console.log('loading true')
                return(<h4 className='loadingH4'>LOADING...</h4>)
            }
            else if(this.state.loadingOpinion === false & this.state.buttonHidden){
                console.log('yas')
                return (
                    <h4 className='opinionResult'>{this.props.opinion}</h4>
                )
            }
            else{
                return(
                        <div>
                            <h4 className='opinionResult'>{this.props.opinion}</h4>
                            <button onClick={()=>{this.getSentiment()}} className='hideShow sentimentBtn'>Calculate Opinion</button>
                        </div>
                    )
                }    
            }
         }


    export default connect()(SentimentBtn)