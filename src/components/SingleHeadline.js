import React from 'react'
import SentimentBtn from './SentimentBtn'
import './SingleHeadline.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class SingleHeadline extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  onExpandClick () {
    this.setState({expanded: !this.state.expanded})
  }

  render () {
    let headlineCSS, mobileVis, mobileBtn
    if (this.state.expanded) {
      headlineCSS = 'expanded'
      mobileVis = 'mobileShowBtns'
      mobileBtn = <FontAwesomeIcon icon='chevron-circle-up' />
    }
    else if (!this.state.expanded) {
      headlineCSS = 'headline'
      mobileVis = 'mobileHideBtns'
      mobileBtn = <FontAwesomeIcon icon='chevron-circle-down' />
    }
    return (
      <div className={headlineCSS}>
        <div className='linkContainer'>
          <h4 className='headlineLink'>{this.props.headlineText} <div className='borderDiv'></div></h4>
          <button className='mobileExpandBtn' onClick={() => {
                                                         this.onExpandClick()}}>
            {mobileBtn}
          </button>
          <div className={mobileVis}>
            <a href={this.props.headlineUrl} target='#' className={`hideShow headlineLinkBtn`}>
              <FontAwesomeIcon icon='link' />
            </a>
            <SentimentBtn
              site={this.props.site}
              index={this.props.index}
              url={this.props.headlineUrl}
              opinion={this.props.opinion} />
          </div>
        </div>
        <div className='hideShow description'>
          {this.props.description}
        </div>
      </div>
    )
  }

}
