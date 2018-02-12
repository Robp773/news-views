import React from 'react';
import './NewsColumn.css';
import ColumnHeader from './ColumnHeader';
import ColumnText from './ColumnText';

export default class NewsColumn extends React.Component{
super(props){
    constructor(props);
}
    render(){ 
         return(
                    <div className='column'>
                        <ColumnHeader 
                        site={this.props.site} 
                        mainWords={this.props.stateObj.mainWords}
                        opinion={this.props.stateObj.opinion}
                        />
                        <ColumnText  site={this.props.site} headlines={this.props.stateObj.headlines}/>
                    </div>
                )
            }
}

