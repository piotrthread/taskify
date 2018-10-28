import React from 'react';
import css from './Welcome.scss';

class Welcome extends React.Component{
    render(){
        return <React.Fragment>
            <div className="welcomeWrapper">
            {/* <img className="logo" src="./images/logo.svg"/> */}
            <h1>@taskify</h1>
            <p className="appdesc">Welcome to Taskify,<br/>Your personal task menager.</p>
            </div>
        </React.Fragment>;
    }
}

export default Welcome;