import React from 'react'
import SentimentBtn from './SentimentBtn';
import './SingleHeadline.css';

export default class SingleHeadline extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            expanded: false
        }
    }

    onExpandClick(){
     this.setState({expanded: !this.state.expanded})
    }
    render(){            
        let downSymbol = <i className="fas fa-chevron-circle-down"></i>
        let upSymbol = <i className="fas fa-chevron-up"></i> 
        let headlineCSS;
        if(this.state.expanded){
            headlineCSS = 'expanded'
        }
        else if(!this.state.expanded){
            headlineCSS = 'headline';
        }
            return(
                    <div className={headlineCSS}>
                        <div className='linkContainer'>
                            <a  className='headlineLink' href={this.props.headlineUrl}>
                                {this.props.headlineText}
                                <div className='borderDiv'></div>            
                            </a>
                            <button className='mobileExpandBtn' onClick={()=>{this.onExpandClick()}}>
                            {/* not working */}
                               {this.state.expanded ? upSymbol: downSymbol }
                            </button>
                        </div>
                        <SentimentBtn site = {this.props.site} index={this.props.index} url={this.props.headlineUrl} opinion={this.props.opinion}/> 
                        <div className='hideShow description'>{this.props.description}</div> 
                    </div>
            )   
    }

}


