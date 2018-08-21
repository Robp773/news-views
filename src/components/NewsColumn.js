import React from 'react'
import './NewsColumn.css'
import ColumnHeader from './ColumnHeader'
import ColumnText from './ColumnText'

export default class NewsColumn extends React.Component {
  super (props) {
    constructor(props)
  }
  render () {
    if (this.props.stateObj.headlines.length === 0) {
      return (
        <div className='column'>
          <ColumnHeader noResults={true} site={this.props.site} mainWords={this.props.stateObj.mainWords} />
        </div>
      )
    }

    return (
      <div className='column'>
        <ColumnHeader site={this.props.site} mainWords={this.props.stateObj.mainWords} />
        <ColumnText sourceNum={this.props.sourceNum} site={this.props.site} headlines={this.props.stateObj.headlines} />
      </div>
    )
  }
}
