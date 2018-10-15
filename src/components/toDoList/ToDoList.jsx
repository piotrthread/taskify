//--------------Build
import React from 'react';
import { Link } from 'react-router-dom';
//-------------Components
import Task from '../../components/task/Task.jsx';
import Loader from '../../components/loader/Loader.jsx';
import AddTask from '../../components/addtask/AddTask.jsx';
//-------------Style
import css from './ToDoList.scss'; 

class ToDoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loading: true,
            addClass: false
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
                    this.setState({ data, loading: false });
                }
            });
        });
    }  
        
    removeData = (id) => {
            
        fetch(`https://coderslabproject.firebaseio.com/tasks/${id}.json`,
            {
                method: "DELETE"
            });
    }  

    linkToAddTask = () => {
        this.props.history.push("/addTask");
    }
    
    render(){
        return <React.Fragment>
                    {this.state.loading 
                        ? <Loader /> 
                        :<div className="toDoList-main">
                            <ul className="list">
                                {this.state.data.filter(Boolean).map((element) => {//filtruje zeby nie dodawac nulla
                                    return <li key={element.id}>
                                                <Task taskTitle={element.title} id={element.id} remove={this.removeData} />
                                            </li>;
                                })}
                            </ul>
                            <div className="menuWrapper">
                                <div className="addBtn" onClick={this.linkToAddTask}></div>
                                <img src="./images/bin.svg" className="binIcon" onClick={this.loadData}/>
                            </div>
                            </div>}
               </React.Fragment>;
    }
}

export default ToDoList;