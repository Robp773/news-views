import './Main.css';
import React from 'react';
import NewsColumn from './NewsColumn';
import Search from './Search';
import NetworkButtons from './NetworkButtons';
import {connect} from 'react-redux';
import {populateState} from '../actions';
import webhoseio from 'webhoseio';

export class Main extends React.Component{
super(props){
    constructor(props);
}
render(){
        return (
            <div className='main'>
            <h1>News Views</h1>
                <Search/>
                <NetworkButtons/>
                <NewsColumn site='MSNBC' searchTerm={this.props.searchTerm} siteUrl='msnbc' stateObj={this.props.msnbc}/>
                <NewsColumn site='CNN' searchTerm={this.props.searchTerm} siteUrl='cnn'stateObj={this.props.cnn} />
                <NewsColumn site='FOX' searchTerm={this.props.searchTerm} siteUrl='fox-news' stateObj={this.props.fox} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    fullState: state,
    msnbc: state.msnbc,
    cnn: state.cnn,
    fox: state.fox,
    searchTerm: state.searchTerm
});

export default connect(mapStateToProps)(Main);
