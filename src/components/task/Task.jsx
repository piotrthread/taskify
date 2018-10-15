import React from 'react';
import css from './Task.scss';
import Checker from '../../components/checker/Checker.jsx';

class Task extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            done:false
        };
    }

    doneTask = () => {
        this.setState({done: true}, () => {
            this.props.remove(this.props.id);
        });
    }

    render(){
        return <React.Fragment>
            <div className="task">
                <h1 className={this.state.done ? "done" : "toBeDone"}>{this.props.taskTitle}</h1>
                <Checker check={this.doneTask}/>
            </div>
        </React.Fragment>;
    }
}

export default Task;