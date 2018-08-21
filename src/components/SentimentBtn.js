import React from 'react'
import './SentimentBtn.css'
import { updateOpinion } from '../actions'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class SentimentBtn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loadingOpinion: false,
      buttonHidden: false
    }
  }
  getSentiment (e) {
    this.setState({loadingOpinion: true})
    fetch(`https://api.dandelion.eu/datatxt/sent/v1/?token=ad1374871af846789221035b037ed543&url=${this.props.url}`)
      .then((result) => {
        return result.json()
      })
      .then((json) => {
        this.props.dispatch(updateOpinion(this.props.index, json.sentiment.type, this.props.sourceNum))
        this.setState({loadingOpinion: false, buttonHidden: true})
      })
  }

  render () {
    let colorClass
    let opinion
    if (this.state.loadingOpinion) {
      return (<div className='loading'>
                <div className='loading-bar'></div>
                <div className='loading-bar'></div>
                <div className='loading-bar'></div>
                <div className='loading-bar'></div>
              </div>)
    }
    else if (this.state.loadingOpinion === false & this.state.buttonHidden) {
      if (this.props.opinion === 'negative') {
        colorClass = 'red'
        opinion = 'Negative'
      }
      else if (this.props.opinion === 'neutral') {
        colorClass = 'orange'
        opinion = 'Neutral'
      }else {
        colorClass = 'green'
        opinion = 'Positive'
      }
      return (
        <h4 className={`opinion ${colorClass}`}>{opinion} Sentiment</h4>
      )
    }else {
      return (
        <div className='sentimentParent'>
          <button onClick={(e) => {
                             this.getSentiment(e)}} className='hideShow sentimentBtn'>
            <FontAwesomeIcon icon='calculator' />
          </button>
        </div>
      )
    }
  }
}

export default connect()(SentimentBtn)
