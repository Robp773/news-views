import React from 'react';
import './NetworkButtons.css';
import {changeVis} from '../actions';
import {connect} from 'react-redux';
export class NetworkButtons extends React.Component{
    constructor(props){
        super(props);
    }
    changeVis(site){
        this.props.dispatch(changeVis(site))
    }

    render(){
        return(
            <div className='networkBtns'>
                <button onClick={()=>{this.changeVis('msnbc')}}>MSNBC</button>
                <button onClick={()=>{this.changeVis('cnn')}}>CNN</button>
                <button onClick={()=>{this.changeVis('fox')}}>FOX</button>
            </div>
        )
    }
}

export default connect()(NetworkButtons);