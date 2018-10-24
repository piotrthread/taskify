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

    deleteTask = (e,id) => {
        this.props.delete(e,this.props.id);
    }

    componentDidMount(){
        this.setState({done: this.props.done});
    }

    render(){
        return <React.Fragment>
            <div className="task">
                <div className="taskIcon">
                    <img src={"./images/"+ this.props.group +".svg"} />
                </div>
                <h1 className={(this.state.done) ? "done" : "toBeDone"}>{this.props.taskTitle}</h1>
                <div className={this.state.done ? "binVisible" : "bin"}><img src="./images/bin.svg" className="binIcon" onClick={this.deleteTask}/></div>
                <Checker check={this.doneTask} done={this.props.done}/>
            </div>
        </React.Fragment>;
    }
}

export default Task;