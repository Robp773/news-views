import React from 'react';
import './ColumnHeader.css';
import WordCloud from 'react-d3-cloud';

export default class ColumnHeader extends React.Component{
    render(){   
        let headerImage;
        if(this.props.site === 'MSNBC'){
            headerImage = 'https://www.charismanews.com/images/stories/2016/06/MSNBC-Logo.jpg';
        }
        else if(this.props.site === 'CNN'){
            headerImage = 'http://www.stickpng.com/assets/images/5842ab75a6515b1e0ad75b0b.png';
        }
        else{
            headerImage = 'http://ncrius.org/wp-content/uploads/2017/02/FOX-NEWS-864x445.png';
        }
        const data = this.props.mainWords
        const fontSizeMapper = word => word.value * 15
       
        const rotate = word => 0

          let wordCluster = <WordCloud
            width={300}
            height={200}
            padding = {0}
            data={data}
            fontSizeMapper={fontSizeMapper}
            rotate={rotate}
          />

        return (
        <div className='header'>
            <h2>
                <img className='headerImg' src={`${headerImage}`}/>
            </h2>
            {wordCluster}
            {/* <h4>{this.props.opinion}</h4> */}
        </div>
    ) 
    }
   
}