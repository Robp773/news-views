import React from 'react';
import './NewsColumn.css';
import ColumnHeader from './ColumnHeader';
import ColumnText from './ColumnText';

export default class NewsColumn extends React.Component{
super(props){
    constructor(props);
}
    render(){
        // setting variable based on the store's 'mobileVis' value
        // to toggle visibility for columns between different screensizes
        let visibility;
        if(this.props.state.mobileVis){
            visibility = 'visible'
        }
        else{
            // 'hidden' matches css class that changes display property to none
            visibility = 'hidden'
        }
            return(
                    <div className={`${visibility} column`}>
                        <ColumnHeader site={this.props.site} imgUrl={this.props.state.wordCloud}/>
                        <ColumnText headlines={this.props.state.headlines}/>
                    </div>
                )
            }
}