import React from 'react';
import css from './Taskify.scss';
import { CSSTransitionGroup } from 'react-transition-group';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
  } from 'react-router-dom';
import AddTask from '../../components/addtask/AddTask.jsx';
import Login from '../../components/login/Login.jsx';
import ToDoList from '../../components/todolist/ToDoList.jsx';

class Taskify extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false
        };
    }

    handleLogin = () => {
        this.setState({loggedIn: !this.state.loggedIn});
    }

    render(){
        return <React.Fragment>
            <div className="taskify-main-container">
            {this.state.loggedIn ? 
            <HashRouter>
             <div>
               <Route exact path='/' component={ToDoList} />
               <Route exact path='/addTask' component={AddTask} />
             </div>
           </HashRouter>
           : <Login login={this.handleLogin}/>}
            </div>
        </React.Fragment>;
    }
}

export default Taskify;