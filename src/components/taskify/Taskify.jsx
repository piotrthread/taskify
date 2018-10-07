import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import css from './Taskify.scss';

class Taskify extends React.Component{
    render(){
        return <React.Fragment>
            <div className="taskify-main-container">
            <h1>@taskify</h1>
            </div>
        </React.Fragment>;
    }
}

export default Taskify;