import React from 'react';
import css from './Date.scss';

class CurrDate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currTime: ""
        };
    }
    componentDidMount(){
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if(date.getMinutes().length < 2){ minutes = "0" + date.getMinutes();}
        this.setState({currTime: `${hours}:${minutes}`}, () => {
            this.interval = setInterval(() => {
                let date = new Date();
                let hours = date.getHours();
                let minutes = date.getMinutes();
                if(date.getMinutes().length < 2){ minutes = "0" + date.getMinutes();}
                this.setState({currTime: `${hours}:${minutes}`});
            },60000);
        });
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render(){
        return <React.Fragment>
            <div className="dateWrapper">
            <h1 className="time">{this.state.currTime}</h1>
            </div>
        </React.Fragment>;
    }
}

export default CurrDate;