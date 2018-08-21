import React from 'react'
import './Search.css'
import { connect } from 'react-redux'
import { populateState, loading } from '../actions'
import Freq from 'wordfrequenter'
import NewsAPI from 'newsapi'
export class Search extends React.Component {
  super (props) {
    constructor(props)
  }

  testQuery (query, sortBy, pageSize, newsSourceArray, e) {
    e.preventDefault()
    if (query === '') {
      return alert('Please enter a search term.')
    }

    this.props.dispatch(loading())

    if (this.props.setInitialSearch) {
      this.props.setInitialSearch()
    }

    const newsapi = new NewsAPI('a8bbe0f664d741539f4eeb966fa99339')
    let sourceArray = ['sourceOne', 'sourceTwo', 'sourceThree']

    for (let i = 0; i < sourceArray.length; i++) {
      newsapi.v2.everything({
        sources: newsSourceArray[i],
        q: query,
        sortBy: sortBy,
        pageSize: pageSize,
        language: 'en',
      }).then(response => {
        console.log(response)

        let titleAndUrl = []
        let descriptionArray = []

        for (let i = 0; i < pageSize; i++) {
          // used for wordcloud frequency counting later- basically a large pile of words
          //  taken from headline descriptions
          descriptionArray.push(response.articles[i].description)
          // combinedHeadlines.push(response.articles[i].title)
          // gathering headlines, headline descriptions, and urls for display in news columns
          titleAndUrl.push({
            headlineText: response.articles[i].title,
            description: response.articles[i].description,
            url: response.articles[i].url
          })
        }
        // combines all descriptions for word cloud
        let joinedDescriptions = descriptionArray.join('').split(' ')
        // counts frequency of words
        const wordCloudArray = new Freq(joinedDescriptions)
        // word cloud configuration
        let result = wordCloudArray.list()
        let initializedArray = []
        for (let b = 0; b < result.length; b++) {
          initializedArray.push({
            text: result[b].word,
            value: result[b].count
          })
        }
        let wordFilter = [
          'Fox',
          'MSNBC',
          'fox',
          'cnn',
          'CNN',
          '(CNN)',
          'from',
          'with',
          'a',
          'A',
          'the',
          'who',
          'of',
          'to',
          'and',
          'in',
          'on',
          'for'
        ]
        // removing common unneeded words from wordcloud
        var filteredArray = initializedArray.filter(function (el) {
          return wordFilter.indexOf(el.text) <= -1
        })
        this.props.dispatch(   
          // sourceNum, siteSource, headlinesArray, mainWords
        populateState(sourceArray[i], newsSourceArray[i], titleAndUrl, filteredArray)
        )
        // set timeout prevents the jittery rerendering of the word cloud after a second search
        setTimeout(() => {
          this.props.dispatch(loading())
        }, 100)
      })
    }
  }
  
  render () {
    let formClass
    if (this.props.setInitialSearch) {
      formClass = 'initialForm'
    } else {
      formClass = 'searchForm'
    }
    return (
      <form className={formClass} onSubmit={e => {
                                        this.testQuery(this.textInput.value, 'publishedAt', 5, ['cnn', 'msnbc', 'fox'], e)
                                      }}>
        <input
          value='Trump'
          autoFocus
          className={this.props.size}
          ref={input => {
                 this.textInput = input
               }}
          type='text'
          placeholder='Enter your search term here...' />
        <button className={`${this.props.size}Btn`} type='submit'>
          Search
        </button>
        <h3></h3>
      </form>
    )
  }
}

export default connect()(Search)
