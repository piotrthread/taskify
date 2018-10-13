import React from 'react';
import css from './ToDoList.scss';
import Task from '../../components/task/Task.jsx';
import Loader from '../../components/loader/Loader.jsx';

class ToDoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: null,
            loading: true
        };
    }

    componentDidMount() {
        this.loadData();
      }
    
      loadData = () => {
          this.setState({loading: true},() => {
        fetch("http://localhost:3000/tasks")
        .then(res => res.json())
        .then(data => {
            setTimeout(() => {this.setState({ data, loading: false })},1000);
          })});
      }

    render(){
        return <React.Fragment>
            {this.state.loading 
            ? <Loader /> 
            :<div className="toDoList-main">
            <ul className="list">
                 {this.state.data.map((element,index) => {
                    return <li key={index}><Task taskTitle={element.title} taskDesc={element.desc} /></li>;
                })}
            </ul>
            </div>}
        </React.Fragment>;
    }
}

export default ToDoList;