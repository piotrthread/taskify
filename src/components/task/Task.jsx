import React from 'react';
import css from './Task.scss';

class Task extends React.Component{
    removeData = () => {
        this.props.remove(this.props.id);
    }
    
    render(){
        return <React.Fragment>
            <div className="task">
                <h1>{this.props.taskTitle}</h1>
                <img src="./images/bin.svg" className="delete" onClick={this.removeData}></img>
            </div>
        </React.Fragment>;
    }
}

export default Task;