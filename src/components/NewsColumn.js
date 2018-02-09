import React from 'react';
import './NewsColumn.css';
import ColumnHeader from './ColumnHeader';
import ColumnText from './ColumnText';
// import webhoseio from 'webhoseio';
import {populateState} from '../actions';
import {connect} from 'react-redux';
import NewsAPI  from 'newsapi';
import Freq from 'wordfrequenter';

export class NewsColumn extends React.Component{
super(props){
    constructor(props);
}
componentWillMount(){

// msnbc id: 'msnbc' name: 'MSNBC'
// fox id: "fox-news" name: "Fox News"
// cnn id: "cnn"  name: "CNN"

const newsapi = new NewsAPI('a8bbe0f664d741539f4eeb966fa99339');
let titleAndUrl = [];
let descriptionArray = []
newsapi.v2.everything({
  sources: this.props.siteUrl,
  q: 'Donald Trump',
  language: 'en',
  sortBy: 'relevancy'
}).then(response => {
  for(let i=0;i<5;i++){
    descriptionArray.push(response.articles[i].description)
    titleAndUrl.push({headlineText: response.articles[i].title, url: response.articles[i].url})
  }
let joinedDescriptions = descriptionArray.join('').split(' ');
const wordCloudArray = new Freq(joinedDescriptions)
let result = wordCloudArray.list() 
let initializedArray = []
for(let i = 0; i<result.length; i++){
    initializedArray.push({text: result[i].word, value: result[i].count})
}
//   needs filtering

// ******
// Uses webhose.io to get full text from article which enables word cloud
// text to be sent to azure text checker which finds important phrases in each article
// These important phrases can all be put together and then made into a word cloud
// Word cloud is a little more insightful this way but webhose starts charging after
// 1000 monthly requests... 3 requests each search adds up which is why this is disabled
// ******

//     let client = webhoseio.config({token: '22ddf06f-2302-49b1-b49c-62d4947e3bec'});
//     client.query('filterWebContent', 
//       {
//         q: 'thread.title:Trump', 
//         site: `${(this.props.siteUrl).toLowerCase()}`,
//         sort: 'crawled',
//         size: 3
//       })
//       .then(output => {
//           output.posts.map((post)=>{          
//             outputArray.push({headlineText: post.thread.title, url: post.url})
//           })  
this.props.dispatch(populateState((this.props.site).toLowerCase(), titleAndUrl, initializedArray))
this.forceUpdate()
    })
}
    render(){    
        // setting variable based on the store's 'mobileVis' value
        // to toggle visibility for columns between different screensizes
        let visibility;
        if(this.props.stateObj.mobileVis){
            visibility = 'visible'
        }
        else{
            // 'hidden' matches css class that changes display property to none
            visibility = 'hidden'
        }
            return(
                    <div className={`${visibility} column`}>
                        <ColumnHeader 
                        site={this.props.site} 
                        mainWords={this.props.stateObj.mainWords}
                        />
                        <ColumnText headlines={this.props.stateObj.headlines}/>
                    </div>
                )
            }
}

export default connect()(NewsColumn)