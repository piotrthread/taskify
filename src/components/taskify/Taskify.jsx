import React from 'react';
import css from './Taskify.scss';
import { CSSTransitionGroup } from 'react-transition-group'
import Login from '../../components/login/Login.jsx';
import ToDoList from '../../components/toDoList/ToDoList.jsx';

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
            {this.state.loggedIn ? <ToDoList logout={this.handleLogin}/> : <Login login={this.handleLogin}/>}
            
            </div>
        </React.Fragment>;
    }
}

export default Taskify;