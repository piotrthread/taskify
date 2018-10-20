//-------------Build
import React from 'react';
import ReactDOM from 'react-dom';
//------------Components
import Taskify from '../../components/taskify/Taskify.jsx';
//------------Style
import css from './App.scss';

class App extends React.Component{
    render(){
        return <React.Fragment>
                   <Taskify />
               </React.Fragment>;
    }
}

export default App;