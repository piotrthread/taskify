//--------------Build
import React from 'react';
//-------------Components
import Task from '../../components/task/Task.jsx';
import Loader from '../../components/loader/Loader.jsx';
//-------------Style
import css from './AllTasks.scss'; 

class AllTasks extends React.Component{
    render(){
        let emptyMessage = this.props.getEmptyText();
        return <React.Fragment>
            {   this.props.data.length > 0
                                ?<ul className="list">
                                {this.props.data.filter(Boolean).map((element) => {
                                    return <li key={element.id}>
                                                <Task taskTitle={element.title} group={element.group} id={element.id} check={this.checkData} done={element.done}/>
                                            </li>;
                                })}
                            </ul> 
                            : <div className="emptyMessage"><h1>{emptyMessage}</h1></div>}
        </React.Fragment>;
    }
}

export default AllTasks;