import './Main.css'
import React from 'react'
import NewsColumn from './NewsColumn'
import Search from './Search'
import { connect } from 'react-redux'

export class Main extends React.Component {
  constructor (props) {
    super(props)
    // tracks whether the first search has been made to make the search input change
    // position and get smaller to make room for rest of interface.
    this.state = { initialSearch: false,
    sourcesArray: []}
    this.initialSearch = this.initialSearch.bind(this)
  }
  componentWillMount () {
    fetch('https://newsapi.org/v2/sources?apiKey=a8bbe0f664d741539f4eeb966fa99339')
      .then((res) => {
        res.json()
          .then((result) => {
            this.setState({sourcesArray: result.sources})
          })
      })
  }
  initialSearch () {
    this.setState({ initialSearch: true })
  }

  render () {
    if (!this.state.initialSearch) {
      return (
        <div className='initialView'>
          <h1>News Views</h1>
          <Search
            sources={this.state.sourcesArray}
            setInitialSearch={this.initialSearch}
            size='initialSize'
            fullState={this.props.fullState} />
        </div>
      )
    }else {
      // following searches
      return (
        <div className='main'>
          <Search
            sources={this.state.sourcesArray}
            setInitialSearch={false}
            size='searchedSize'
            fullState={this.props.fullState} />
          <div className='columnParent'>
            <NewsColumn
              sourceNum='sourceOne'
              loading={this.props.fullState.loading}
              site={this.props.fullState['sourceOne'].site}
              siteUrl={this.props.fullState['sourceOne'].site}
              stateObj={this.props.fullState['sourceOne']} />
            <NewsColumn
              sourceNum='sourceTwo'
              loading={this.props.fullState.loading}
              site={this.props.fullState['sourceTwo'].site}
              siteUrl={this.props.fullState['sourceTwo'].site}
              stateObj={this.props.fullState['sourceTwo']} />
            <NewsColumn
              sourceNum='sourceThree'
              loading={this.props.fullState.loading}
              site={this.props.fullState['sourceThree'].site}
              siteUrl={this.props.fullState['sourceThree'].site}
              stateObj={this.props.fullState['sourceThree']} />
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  fullState: state
})

export default connect(mapStateToProps)(Main)
