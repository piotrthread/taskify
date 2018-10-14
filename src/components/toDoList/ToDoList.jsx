//--------------Build
import React from 'react';
import { Link } from 'react-router-dom';
//-------------Components
import Task from '../../components/task/Task.jsx';
import Loader from '../../components/loader/Loader.jsx';
//-------------Style
import css from './ToDoList.scss';

class ToDoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loading: true
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
                data = Object.keys(data).reduce((dataAsArray, key) => {
                    const todo = data[key];
                    todo.id = key;
                    dataAsArray.push(todo);
                    return dataAsArray;
                }, []);
                this.setState({ data, loading: false });
              })});
        }  
        
    removeData = (id) => {
            
        fetch(`https://coderslabproject.firebaseio.com/tasks/${id}.json`,
            {
                method: "DELETE"
            })
        .then(this.loadData);
    }      
    
    render(){
        return <React.Fragment>
                    {this.state.loading 
                        ? <Loader /> 
                        :<div className="toDoList-main">
                            <ul className="list">
                                {this.state.data.filter(Boolean).map((element) => {//filtruje zeby nie dodawac nulla
                                    return <li key={element.id}>
                                                <Task taskTitle={element.title} taskDesc={element.desc} id={element.id} remove={this.removeData} />
                                            </li>;
                                })}
                            </ul>
                            <Link to="/addTask">Add new Task</Link>
                        </div>}
               </React.Fragment>;
    }
}

export default ToDoList;