import React from 'react';
import './ColumnHeader.css';
import WordCloud from 'react-d3-cloud';

export default class ColumnHeader extends React.Component{
    render(){   
        const data = this.props.mainWords
        const fontSizeMapper = word => 20
        const rotate = word => word.value % 90

          let wordCluster = <WordCloud
          width={450}
          height={200}
            padding = {0}
            data={data}
            fontSizeMapper={fontSizeMapper}
            rotate={rotate}
          />

        return (
        <div className='header'>
            <h2>{this.props.site}</h2>
            {wordCluster}
        </div>
    ) 
    }
   
}