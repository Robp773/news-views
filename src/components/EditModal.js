import React from 'react'
import './EditModal.css'
import NewsAPI from 'newsapi'
import { connect } from 'react-redux'
import { editOpen } from '../actions'

export class EditModal extends React.Component {
  constructor () {
    super()
    this.state = {
      searchResults: [],
      focusedSource: this.textInput1
    }
  }
  sourceSearch (e, input, inputNum) {
    e.preventDefault()
    let searchableID =
    input[`textInput${inputNum}`].attributes.searchid.textContent
    let inputVal = this[`textInput${inputNum}`].value
    let result = this.props.sources.filter(el => {
      return el.name.toUpperCase().includes(inputVal.toUpperCase())
    })
    this.setState({ searchResults: result })
  }

  handleSourceSelect (e, btnName, searchID) {
    e.preventDefault()
    // set form value to equal selection
    this[this.state.focusedSource].value = btnName
    // set the searchid prop to be the searchable string id for use in later GET requests
    this[this.state.focusedSource].attributes.searchid.value = searchID
  }
  handleSubmit (e) {
    e.preventDefault()
    let sources = [
      this.textInput1.attributes.searchid.value,
      this.textInput2.attributes.searchid.value,
      this.textInput3.attributes.searchid.value
    ]
    let sourceNames = [
      this.textInput1.value,
      this.textInput2.value,
      this.textInput3.value
    ]
    this.props.setSearchParams(
      {
        sortBy: this.selectInput.value,
        resultsLimit: this.resultsInput.value,
        sourcesArray: sources
      },
      sourceNames
    )
  }

  render () {
    console.log(this.props.resultsLimit)
    let resultsArray = this.state.searchResults.map(item => {
      return (
        <button onClick={e => {
                   this.handleSourceSelect(e, item.name, item.id)
                 }} className='singleSourceResult' key={item.name}>
          {item.name}
        </button>
      )
    })
    return (
      <div id='modalBG'>
        <form id='editForm' onSubmit={e => {
                                        this.handleSubmit(e)
                                      }}>
          <div className='formSection'>
            <div className='fieldParent'>
              <label>
                Source 1:
              </label>
              <input
                className='filterInput'
                key={1}
                searchid={this.props.sourceIDs[0]}
                defaultValue={this.props.sourceNames[0]}
                ref={input => {
                       this.textInput1 = input
                     }}
                type='text'
                onFocus={e => {
                           e.preventDefault()
                           this.setState({ focusedSource: 'textInput1' })
                         }}
                onChange={e => {
                            this.sourceSearch(e, this, 1)
                          }} />
            </div>
            <div className='fieldParent'>
              <label>
                Source 2:
              </label>
              <input
                className='filterInput'
                key={2}
                searchid={this.props.sourceIDs[1]}
                defaultValue={this.props.sourceNames[1]}
                ref={input => {
                       this.textInput2 = input
                     }}
                type='text'
                onClick={e => {
                           e.preventDefault()
                           this.setState({ focusedSource: 'textInput2' })
                         }}
                onChange={e => {
                            this.sourceSearch(e, this, 2)
                          }} />
            </div>
            <div className='fieldParent'>
              <label>
                Source 3:
              </label>
              <input
                className='filterInput'
                key={3}
                searchid={this.props.sourceIDs[2]}
                defaultValue={this.props.sourceNames[2]}
                ref={input => {
                       this.textInput3 = input
                     }}
                type='text'
                onClick={e => {
                           e.preventDefault()
                           this.setState({ focusedSource: 'textInput3' })
                         }}
                onChange={e => {
                            this.sourceSearch(e, this, 3)
                          }} />
            </div>
          </div>
          <div className='formSection sort'>
            <label>
              Sort By:
            </label>
            <select className='filterInput' ref={input => {
                           this.selectInput = input
                         }}>
              <option defaultValue='publishedAt'>
                Newest
              </option>
              <option value='relevancy'>
                Relevancy
              </option>
              <option value='popularity'>
                Popularity
              </option>
            </select>
          </div>
          <div className='formSection'>
            <label>
              Results:
            </label>
            <input
              className='filterInput'
              ref={input => {
                     this.resultsInput = input
                   }}
              type='number'
              defaultValue={this.props.resultsLimit} />
          </div>
          <button id='updateBtn' type='submit'>
            Update
          </button>
          <div id='resultsParent'>
            {resultsArray}
          </div>
          <button id='exitBtn' onClick={e => {
                                          this.props.dispatch(editOpen())
                                        }}>
            X
          </button>
        </form>
      </div>
    )
  }
}
export default connect()(EditModal)
