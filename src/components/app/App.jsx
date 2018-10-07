import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import css from './App.scss';
import Taskify from '../../components/taskify/Taskify.jsx';

class App extends React.Component{
    render(){
        return <React.Fragment>
            <Taskify />
        </React.Fragment>;
    }
}

export default App;