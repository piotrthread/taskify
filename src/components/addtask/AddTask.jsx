//-------------Build
import React from 'react';
import { Link } from 'react-router-dom';
//------------Style
import css from './AddTask.scss';

class AddTask extends React.Component{
    constructor(props){
        super(props);
        this.state={
            taskTitle:"",
            addClass: false
        };
    }

    handleTitle = (e) => {
        this.setState({taskTitle: e.target.value});
    }

    addTask = () => {
        fetch(`https://coderslabproject.firebaseio.com/tasks.json`,
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        title: this.state.taskTitle, 
                    }
                )
            })
        .then(() => {
            this.props.history.push("/");
        });
    }

    linkToRoot = () =>{
            this.props.history.push("/");
    }
    
    render(){
        return <React.Fragment>
                    <div className="addTask">
                    <div className="close" onClick={this.linkToRoot}></div>
                        <form>
                            <input type="text" placeholder="Your task here..." onChange={this.handleTitle}/>
                        </form>
                        <div className="addBtn" onClick={this.addTask}></div>
                    </div>
                </React.Fragment>;
    }
}

export default AddTask;