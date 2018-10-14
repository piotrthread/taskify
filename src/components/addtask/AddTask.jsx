import React from 'react';
import { Link } from 'react-router-dom';
import css from './AddTask.scss';

class AddTask extends React.Component{
    constructor(props){
        super(props);
        this.state={
            taskTitle:"",
            taskDesc:""
        };
    }

    handleTitle = (e) => {
        this.setState({taskTitle: e.target.value});
    }
    
    handleDesc = (e) => {
        this.setState({taskDesc: e.target.value});
    }

    addTask = () => {
        console.log(this.props);
        fetch(`https://coderslabproject.firebaseio.com/tasks.json`,{method: "POST",
        body: JSON.stringify(
            {
                title: this.state.taskTitle, 
                desc: this.state.taskDesc
            }
            
        )}).then(() => this.props.history.push("/"));
    }
    
    render(){
        return <React.Fragment>
            <div className="addTask">
                <form>
                    <input type="text" placeholder="Task title" onChange={this.handleTitle}/>
                    <textarea placeholder="Task description" onChange={this.handleDesc}/>
                </form>
                <span className="addTaskBtn" onClick={this.addTask}>ADD</span>
                <Link to="/" className="backlistLink">Back to list</Link>
            </div>
        </React.Fragment>;
    }
}

export default AddTask;