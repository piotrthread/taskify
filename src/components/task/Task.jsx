import React from 'react';
import css from './Task.scss';

class Task extends React.Component{
    
    render(){
        return <React.Fragment>
            <div className="task">
                <h1>{this.props.taskTitle}</h1>
                <p>{this.props.taskDesc}</p>
                <button>done</button>
            </div>
        </React.Fragment>;
    }
}

export default Task;