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
        let colorClass;
        let opinion;
            if(this.state.loadingOpinion){
                console.log('loading true')
                return(<div class="loading">
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
              </div>)
            }
            else if(this.state.loadingOpinion === false & this.state.buttonHidden){
                if(this.props.opinion === 'negative'){
                    colorClass = 'red';
                    opinion = 'Negative';
                }
                else if(this.props.opinion === 'neutral'){
                    colorClass = 'orange';
                    opinion = 'Neutral';

                }
                else {
                    colorClass = 'green';
                    opinion = 'Positive';
                }
                return (
                    <h4 className={`${colorClass} opinionResult`}>{opinion}</h4>
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