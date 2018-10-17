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
        this.setState({done: !this.state.done}, () => {
            this.props.check(this.props.id);
        });
    }
    componentDidMount(){
        this.setState({done: this.props.done});
    }

    render(){
        return <React.Fragment>
            <div className="task">
                <h1 className={(this.state.done) ? "done" : "toBeDone"}>{this.props.taskTitle}</h1>
                <Checker check={this.doneTask} done={this.props.done}/>
            </div>
        </React.Fragment>;
    }
}

export default Task;