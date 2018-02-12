import './Main.css';
import React from 'react';
import NewsColumn from './NewsColumn';
import Search from './Search';
import NetworkButtons from './NetworkButtons';
import {connect} from 'react-redux';

export class Main extends React.Component{
super(props){
    constructor(props);
}
componentWillMount(){

}
render(){
        return (
            <div className='main'>
            <h1>News Views</h1>
                <Search fullState={this.props.fullState}/>
                <NetworkButtons/>
                <div className='columnParent'>
                    <NewsColumn site='MSNBC' siteUrl='msnbc' stateObj={this.props.msnbc}/>
                    <NewsColumn site='CNN'  siteUrl='cnn'stateObj={this.props.cnn} />
                    <NewsColumn site='FOX'  siteUrl='fox-news' stateObj={this.props.fox} />
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
