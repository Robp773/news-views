import './Main.css';
import React from 'react';
import NewsColumn from './NewsColumn';
import Search from './Search';
import NetworkButtons from './NetworkButtons';
import {connect} from 'react-redux';

export class Main extends React.Component{
constructor(props){
    super(props); 
    // tracks whether the first search has been made to make the search input change
    // position and get smaller to make room for rest of interface.
    this.state = {initialSearch: false}
    this.initialSearch = this.initialSearch.bind(this)
} 

initialSearch(){
    this.setState({initialSearch: true})
}

render(){
    // first search
    // console.log(this.props.fullState)

    if(this.props.fullState.loading){
        return (
                    <div className="overlay-loader">
                        <div className="loader">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
        )
    }
    if(!this.state.initialSearch){
        return (
                <div className='main '>
                    <h1>News Views</h1>
                    <Search setInitialSearch={this.initialSearch} size='initialSize' fullState={this.props.fullState}/>
                </div>)
    }
    // following searches
        return (
            <div className='main'>
                <h1>News Views</h1>
                <Search setInitialSearch={false} size='searchedSize' fullState={this.props.fullState}/>
                <NetworkButtons/>
                <div className='columnParent'>
                    <NewsColumn loading={this.props.fullState.loading} site='MSNBC' siteUrl='msnbc' stateObj={this.props.msnbc}/>
                    <NewsColumn loading={this.props.fullState.loading} site='CNN' siteUrl='cnn'stateObj={this.props.cnn} />
                    <NewsColumn loading={this.props.fullState.loading} site='FOX' siteUrl='fox-news' stateObj={this.props.fox} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    fullState: state,
    msnbc: state.msnbc,
    cnn: state.cnn,
    fox: state.fox,
});

export default connect(mapStateToProps)(Main);
