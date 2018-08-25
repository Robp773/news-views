import React from 'react'
import './ColumnHeader.css'
import WordCloud from 'react-d3-cloud'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class ColumnHeader extends React.Component {

  shouldComponentUpdate (nextProps) {
    if (this.props.mainWords === nextProps.mainWords) {
      return false
    }else {
      return true
    }
  }

  render () {
    const data = this.props.mainWords
    const fontSizeMapper = word => word.value * 15
    const rotate = word => 0
    let wordCluster = <WordCloud
                        width={300}
                        height={200}
                        padding={0}
                        data={data}
                        fontSizeMapper={fontSizeMapper}
                        rotate={rotate} />
    let noResults
    if (this.props.noResults) {
      noResults = <h2 className='noResults'>No Results</h2>
    }
    return (
      <div className='header'>
        <h2 className='newsHeaderTitle'>{this.props.site}</h2>
        {noResults}
        {wordCluster}
      </div>
    )}

}
