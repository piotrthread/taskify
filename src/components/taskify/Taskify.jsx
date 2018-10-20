//-----------Build
import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
//------------Components
import AddTask from '../../components/addtask/AddTask.jsx';
import Login from '../../components/login/Login.jsx';
import List from '../../components/list/List.jsx';
import CurrDate from '../../components/date/Date.jsx';
import Welcome from '../../components/welcome/Welcome.jsx';
//-----------Style
import css from './Taskify.scss';
import { CSSTransitionGroup } from 'react-transition-group';

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
                    {this.state.loggedIn 
                        ? <React.Fragment>
                            <div className="taskify-main-container">
                                <HashRouter>
                                    <div>
                                        <Route exact path='/' component={List} />
                                        <Route exact path='/addTask' component={AddTask} />
                                    </div>
                                </HashRouter>
                                <div className="widget1"><Welcome /></div>
                                <div className="widget2"></div>
                                <div className="widget3"><CurrDate /></div>
                                <div className="widget4"></div>
                            </div>
                        </React.Fragment>
                        : <Login login={this.handleLogin}/>}
                </React.Fragment>;
    }
}

export default Taskify;