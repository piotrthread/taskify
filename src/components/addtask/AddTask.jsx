//-------------Build
import React from 'react';
//------------Components
import GroupSelector from '../../components/groupselector/GroupSelector.jsx';
//------------Style
import css from './AddTask.scss';

class AddTask extends React.Component{
    constructor(props){
        super(props);
        this.state={
            taskTitle: "",
            taskGroup: "home",
            valid: true
        };
    }
    //handle title input
    handleTitle = (e) => { 
            this.setState({taskTitle: e.target.value});
    }
    //handle group input
    chooseGroup = (e,text) => {
        this.setState({taskGroup: text});
    }
    //post task to database
    addTask = () => {
        if(this.state.taskTitle.length >= 5 && this.state.taskTitle.length <= 70){
            fetch(`https://coderslabproject.firebaseio.com/tasks.json`,
                {
                    method: "POST",
                    body: JSON.stringify(
                        {
                            title: this.state.taskTitle,
                            group: this.state.taskGroup, 
                            done: false
                        }
                    )
                })
            .then(() => {
                this.props.history.push("/");
            });
        }else{
            this.setState({valid: false});
        }
    }
    //go back to root
    linkToRoot = () =>{
            this.props.history.push("/");
    }

    componentDidMount(){
        this.inputTask.focus(); 
     }
    
    render(){
        return <React.Fragment>
            <div className="addTask">
            <div className="close" onClick={this.linkToRoot}></div>
            <p className={this.state.valid ? "validationAlert" : "validationAlertVisible"}>Task title must be at least 5 <br/>and no more that 70 characters long !</p>
                <form className="taskTitle">
                    <input type="text" placeholder="Your task here..." onChange={this.handleTitle} ref={(input) => { this.inputTask = input; }}/>
                </form>
                <div className="actions">
                    <div className="groupIcons">
                    <GroupSelector group={(e,text) => this.chooseGroup(e,text)}/>
                    </div>
                    <div className="addBtn" onClick={this.addTask}></div>
                </div>
            </div>
        </React.Fragment>;
    }
}

export default AddTask;