import React from 'react';
import css from './StopWatch.scss';

const msToTime = duration => {
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

class StopWatch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            time: 0,
            button: true
        };
    }

    startCounter = (e) => {
        e.preventDefault();
        this.setState({button: false});
        this.interval = setInterval(() => {
            this.setState({time: this.state.time + 1000});
        },1000);
    }
    
    stopCounter = (e) => {
        e.preventDefault();
        this.setState({button: true});
        clearInterval(this.interval);
    }

    clearCounter = (e) => {
        e.preventDefault();
        this.setState({time: 0, button: true});
        clearInterval(this.interval);
    }

    componentWillUnmount(){

    }

    render(){
        let time = msToTime(this.state.time);
        return <React.Fragment>
            <div className="stopWatch">
                <h1>Measure Your Time.</h1>
                <p>{time}</p>
                <div className="btnContainer">
                    <div className="btn" onClick={this.state.time > 0 ? this.stopCounter : this.startCounter}>{this.state.button ? "START" : "STOP"}</div>
                    <div className="btn" onClick={this.clearCounter}>CLEAR</div>
                </div>
            </div>
        </React.Fragment>;
    }
}

export default StopWatch;