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
    render(){
        return (
            <div className='main'>
            <h1>News Views</h1>
                <Search/>
                <NetworkButtons/>
                <NewsColumn site='MSNBC'state={this.props.msnbc}/>
                <NewsColumn site='CNN' state={this.props.cnn} />
                <NewsColumn site='FOX' state={this.props.fox} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    fullState: state,
    msnbc: state.msnbc,
    cnn: state.cnn,
    fox: state.fox
});

export default connect(mapStateToProps)(Main);
