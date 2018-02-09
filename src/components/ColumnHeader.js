import React from 'react';
import './ColumnHeader.css';
import WordCloud from 'react-d3-cloud';

export default class ColumnHeader extends React.Component{
    render(){   
        const data = this.props.mainWords
        const fontSizeMapper = word => word.value * 15
       
        const rotate = word => 0

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