import React from 'react'
import './Search.css'
import { connect } from 'react-redux'
import { populateState, loading, editOpen } from '../actions'
import Freq from 'wordfrequenter'
import NewsAPI from 'newsapi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EditModal from './EditModal.js'
export class Search extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      searchNames: ['CNN', 'MSNBC', 'FOX'],
      searchParams: {sortBy: 'publishedAt', resultsLimit: 5, sourcesArray: ['cnn', 'msnbc', 'fox-news']}
    }
    this.setSearchParams = this.setSearchParams.bind(this)
  }

  editClick (e) {
    e.preventDefault()
    this.props.dispatch(editOpen())
  }

  setSearchParams (params, searchNames) {
    this.setState({searchParams: params, searchNames: searchNames})
    this.props.dispatch(editOpen())
  }

  searchQuery (query, e) {
    e.preventDefault()
    if (query === '') {
      return alert('Please enter a search term.')
    }

    this.props.dispatch(loading())

    const newsapi = new NewsAPI('a8bbe0f664d741539f4eeb966fa99339')
    let sourceArray = ['sourceOne', 'sourceTwo', 'sourceThree']
    let paramsObj = this.state.searchParams
    for (let i = 0; i < sourceArray.length; i++) {
      newsapi.v2.everything({
        sources: paramsObj.sourcesArray[i],
        q: query,
        sortBy: paramsObj.sortBy,
        pageSize: paramsObj.resultsLimit,
        language: 'en'
      }).then(response => {

        let titleAndUrl = []
        let descriptionArray = []

        for (let i = 0; i < paramsObj.resultsLimit; i++) {
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
        console.log(sourceArray[i], this.state.searchNames[i])
        // paramsObj.sourcesArray[i]
        this.props.dispatch(
          populateState(sourceArray[i], this.state.searchNames[i], titleAndUrl, filteredArray)
        )

        this.props.dispatch(loading())
        if (this.props.setInitialSearch) {
          this.props.setInitialSearch()
        }
      })
    }
  }

  render () {
    let formClass, editModal, loadingClass, cogClass
    if (this.props.setInitialSearch) {
      formClass = 'initialForm'
      cogClass = 'initialCog'
    } else {
      formClass = 'searchForm'
      cogClass = 'searchCog'
    }

    if (this.props.fullState.ui.editOpen) {
      editModal = <EditModal
                    resultsLimit={this.state.searchParams.resultsLimit}
                    sourceIDs={this.state.searchParams.sourcesArray}
                    sourceNames={this.state.searchNames}
                    setSearchParams={this.setSearchParams}
                    sources={this.props.sources} />
    }

    if (this.props.fullState.loading) {
      loadingClass = 'loading'
    }else {
      loadingClass = 'notLoading'
    }

    return (       <div>
                     {editModal}
                     <form className={formClass} onSubmit={e => {
                                                             this.searchQuery(this.textInput.value, e)
                                                           }}>
                       <input
                         autoFocus
                         className={this.props.size}
                         ref={input => {
                                this.textInput = input
                              }}
                         type='text'
                         placeholder='Enter your search term here...' />
                       <button id='filterSearchBtn' onClick={(e) => {
                                                               this.editClick(e)}}>
                         <FontAwesomeIcon id='filterIcon' icon='filter' />
                       </button>
                       <button className={`${this.props.size}Btn`} type='submit'>
                         Search
                       </button>
                       <FontAwesomeIcon id={cogClass} className={loadingClass} icon='cog' />
                     </form>
                   </div>
    )
  }
}

export default connect()(Search)
