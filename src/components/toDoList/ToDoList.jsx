//--------------Build
import React from 'react';
import { Link } from 'react-router-dom';
//-------------Components
import Task from '../../components/task/Task.jsx';
import Loader from '../../components/loader/Loader.jsx';
import AddTask from '../../components/addtask/AddTask.jsx';
import CurrDate from '../../components/date/Date.jsx';
import Welcome from '../../components/welcome/Welcome.jsx';
//-------------Style
import css from './ToDoList.scss'; 

class ToDoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loading: false,
            toRemove:[]
        };
    }

    componentDidMount() {
        this.loadData();
      }

    loadData = () => {
        this.setState({loading: true},() => {
            fetch("https://coderslabproject.firebaseio.com/tasks.json",
            {
                method: "GET"
            })
            .then(res => res.json())
            .then((data = {}) => {
                if(data === null){
                    this.setState({ data: [], loading: false });
                }else{
                    data = Object.keys(data).reduce((dataAsArray, key) => {
                        const todo = data[key];
                        todo.id = key;
                        dataAsArray.push(todo);
                        return dataAsArray;
                    }, []);
                    data.forEach((task) => {
                        if(task.done){
                            this.state.toRemove.push(task.id);
                        }
                    });
                    this.setState({ data, loading: false });
                        
                }
            });              
        });
    }  
        
    checkData = (id) => {
        if(this.state.toRemove.indexOf(id) == -1){
            
                fetch(`https://coderslabproject.firebaseio.com/tasks/${id}.json`,
            {
                method: "PATCH",
                body: JSON.stringify(
                    { 
                        done: true
                    }
                )
            }
            )
            .then(() => {this.state.toRemove.push(id);});
            
        } else{

                fetch(`https://coderslabproject.firebaseio.com/tasks/${id}.json`,
            {
                method: "PATCH",
                body: JSON.stringify(
                    { 
                        done: false
                    }
                )
            }
            )
            .then(() => {this.state.toRemove.splice(this.state.toRemove.indexOf(id),1);});
        }
    }
    
    deleteCheckedData = () => {
        if(this.state.toRemove.length >0){
            const remove = new Promise((res, rej) => {
                this.state.toRemove.map(url => {
                    
                        fetch(`https://coderslabproject.firebaseio.com/tasks/${url}.json`,
                        {
                            method: "DELETE"
                        })
                        .then(() => {
                            let tempArr = this.state.toRemove;
                            tempArr.splice(tempArr.indexOf(url),1);
                            this.setState({toRemove: [...tempArr]});
                        })
                        .then(() => {if(this.state.toRemove.length == 0){this.loadData();}});

                });
            }); 
        }
    }  

    linkToAddTask = () => {
        this.props.history.push("/addTask");
    }
    
    render(){
        return <React.Fragment>
                    {this.state.loading 
                        ? <Loader /> 
                        :<div className="toDoList-main">
                            {   this.state.data.length > 0
                                ?<ul className="list">
                                {this.state.data.filter(Boolean).map((element) => {//filtruje zeby nie dodawac nulla
                                    return <li key={element.id}>
                                                <Task taskTitle={element.title} group={element.group} id={element.id} check={this.checkData} done={element.done}/>
                                            </li>;
                                })}
                            </ul> 
                            : <div className="emptyMessage"><h1>Tasks? You did them all...</h1></div>}
                            <div className="menuWrapper">
                            <img src="./images/controls.svg" className="filterIcon" />
                                <div className="addBtn" onClick={this.linkToAddTask}></div>
                                <img src="./images/bin.svg" className="binIcon" onClick={this.deleteCheckedData}/>
                            </div>
                            <div className="widget1"><Welcome /></div>
                            <div className="widget2"></div>
                            <div className="widget3"><CurrDate /></div>
                            <div className="widget4"></div>
                        </div>}
               </React.Fragment>;
    }
}

export default ToDoList;