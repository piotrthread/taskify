import React from 'react';
import css from './Date.scss';
//return current weekday name
const getWeekDay = () => {
let dayNumber = new Date().getDay();
    switch (dayNumber) {
        case 1 : return "Monday";
        case 2 : return "Tuesday";
        case 3 : return "Wednesday";
        case 4 : return "Thursday";
        case 5 : return "Friday";
        case 6 : return "Saturday";
        case 0 : return "Sunday";
    }
}
//return current time in HH:MM format
const getTime = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if(hours < 10){ hours = "0" + hours}
    if(minutes < 10){ minutes = "0" + minutes}
    return `${hours}:${minutes}`;
}
//return current day number in NN'th format
const getDayNum = () => {
    let dayNum = new Date().getDate();
    if(dayNum == 1 || dayNum == 21 || dayNum == 31) {return dayNum + "st";}
    if(dayNum == 2 || dayNum == 22) {return dayNum + "nd";}
    if(dayNum == 3 || dayNum == 23) {return dayNum + "rd";}
    else {return dayNum + "th"}
}
//return current month name
const getMonth = () => {
    let month = new Date().getMonth();
    switch (month) {
        case 0 : return "January";
        case 1 : return "February";
        case 2 : return "March";
        case 3 : return "April";
        case 4 : return "May";
        case 5 : return "June";
        case 6 : return "July";
        case 7 : return "August";
        case 8 : return "September";
        case 9 : return "October";
        case 10 : return "November";
        case 11 : return "December";
    }
}

class CurrDate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currTime: "",
            currDay: "",
            currDayNum: "",
            currMonth: ""
        };
    }
    componentDidMount(){
        this.setState({
            currTime: getTime(),
            currDay: getWeekDay(),
            currDayNum: getDayNum(),
            currMonth: getMonth()
        }, () => {
            this.interval = setInterval(() => {
                this.setState({currTime: getTime()});
            },1000);
        });
        //-------------------
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render(){
        return <React.Fragment>
            <div className="dateWrapper">
            <p className="month">{this.state.currMonth}</p>
            <h1 className="dayNum">
                <p>
                    {this.state.currDayNum.slice(0, this.state.currDayNum.length - 2)}<span>
                    {this.state.currDayNum.slice(this.state.currDayNum.length - 2)}</span>
                </p>
            </h1>
            <h2 className="weekDay">{this.state.currDay}</h2>
            <p className="time">{this.state.currTime}</p>
            </div>
        </React.Fragment>;
    }
}

export default CurrDate;