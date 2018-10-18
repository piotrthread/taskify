import React from 'react';
import css from './Welcome.scss';

class Welcome extends React.Component{
    render(){
        return <React.Fragment>
            <div className="welcomeWrapper">
            <h1>@taskify</h1>
            <p>Welcome to Taskify,<br/>Your personal task menager.</p>
            </div>
        </React.Fragment>;
    }
}

export default Welcome;