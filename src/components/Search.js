import React from 'react';
import './Search.css';
import {connect} from 'react-redux';
import {populateState, loading, emptyColumn} from '../actions';
import NewsAPI  from 'newsapi';
import Freq from 'wordfrequenter';
import https from 'https'

export class Search extends React.Component{
super(props){
    constructor(props);
}

searchSent(query){
    if(query === ''){
       return alert('no')
    }
    this.props.dispatch(loading())
    if(this.props.setInitialSearch){
        this.props.setInitialSearch()
    }
// Search the three news networks for headlines on the searched term
const newsapi = new NewsAPI('a8bbe0f664d741539f4eeb966fa99339');
let sourceArray = ['msnbc', 'cnn', 'fox-news']
let siteArray = ['msnbc', 'cnn', 'fox']
// loop through this entire sequence once for each news source
for(let j=0; j<sourceArray.length; j++){
    let combinedHeadlines = []
    let titleAndUrl = [];
    let descriptionArray = []
    newsapi.v2.everything({
        sources: sourceArray[j],
        q: query,
        language: 'en',
        sortBy: 'date'
      })
      .then(response => {  
          console.log(sourceArray[j])
          console.log(response)  
      
            // make an array of all the descriptions
        // make an array of objects with the title and url of the article
        // also make an array of the entire text of all articles to be used for the word cloud
let length
    if(response.articles.length >=5){
    length = 5
}
else if(response.articles.length <5){
    length =  response.articles.length
}
        for(let i=0;i<length;i++){
          descriptionArray.push(response.articles[i].description)
          titleAndUrl.push({headlineText: response.articles[i].title, description: response.articles[i].description, url: response.articles[i].url})
          combinedHeadlines.push(response.articles[i].title)
        }

      let joinedDescriptions = descriptionArray.join('').split(' ');
      const wordCloudArray = new Freq(joinedDescriptions)
      let result = wordCloudArray.list() 
      let initializedArray = [];
      for(let b= 0; b<result.length; b++){
          initializedArray.push({text: result[b].word, value: result[b].count})
      }
      let wordFilter = ['Fox','MSNBC', 'fox', 'cnn', 'CNN', '(CNN)', 'from', 'with', 'a', 'A', 'the', 'who', 'of', 'to', 'and', 'in', 'on', 'for']
      var filteredArray = initializedArray.filter(function (el) {
          return wordFilter.indexOf(el.text) <= -1; 
        });
        this.props.dispatch(populateState(siteArray[j], titleAndUrl, filteredArray)) 
        // set timeout prevents the jittery rerendering of the word cloud after a second search
        setTimeout(()=>{this.props.dispatch(loading())}, 100);
       
       
    

      })  

}

}

render(){
    let formClass;
    if(this.props.setInitialSearch){
         formClass = 'initialForm';
    }
    else{
        formClass = 'searchForm';
    }
    return(
        <form className={formClass} onSubmit={(e)=>{e.preventDefault(), this.searchSent(this.textInput.value)}}>
            <input className={this.props.size} ref={(input)=>{this.textInput = input}} type='text' placeholder='Enter your search term here...'/>
            <button type='submit'>Search</button>
        </form>
    )
}
}

export default connect()(Search)