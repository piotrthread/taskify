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
            this.setState({addClass: !this.state.addClass}, () => {
                setTimeout(()=>{
                    this.props.history.push("/");
                },300);
            });
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
                        <img src="./images/add.svg" className={this.state.addClass ? "addBtnActive" : "addBtn"} onClick={this.addTask}></img>
                    </div>
                </React.Fragment>;
    }
}

export default AddTask;