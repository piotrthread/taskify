//--------------Build
import React from 'react';
//-------------Components
import Task from '../../components/task/Task.jsx';
import Loader from '../../components/loader/Loader.jsx';
import Filter from '../../components/filter/Filter.jsx';
//-------------Style
import css from './List.scss'; 


class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loading: false,
            toRemove:[],
            filteredBy:"",
            filtered:false
        };
    }

    componentDidMount() {
        this.loadData();
      }

    getEmptyText = () => {
        switch(this.state.filteredBy){
            case "": return "Tasks? You did them all...";
            case "home": return "Home sweet home. Enjoy it.";
            case "personal": return "You reached Your goals ?";
            case "work": return "Work done? So go home...";
        }
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
                        .then(() => {if(this.state.toRemove.length == 0){this.loadData();}})
                        .then(() => {
                            this.setState({filtered: false, filteredBy: ""});
                        });

                });
            }); 
        }
    }  

    filterData = (e,group) => {
        if(group == ""){
            this.setState({filtered: false, filteredBy: ""});
        }else{
            this.setState({loading: true},() => {
                fetch(`https://coderslabproject.firebaseio.com/tasks.json?orderBy="group"&equalTo="${group}"`,
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
                        this.setState({ data, loading: false, filtered: true, filteredBy: group });
                            
                    }
                });              
            });
        }   
    }

    linkToAddTask = () => {
        this.props.history.push("/addTask");
    }
    
    render(){
        let emptyMessage = this.getEmptyText();
        return <React.Fragment> 
                        <div className="toDoList-main">
                        {this.state.loading 
                        ? <Loader />
                        :   <React.Fragment>{   this.state.data.length > 0
                                ?<ul className="list">
                                {this.state.data.filter(Boolean).map((element) => {
                                    return <li key={element.id}>
                                                <Task taskTitle={element.title} group={element.group} id={element.id} check={this.checkData} done={element.done}/>
                                            </li>;
                                })}
                            </ul> 
                            : <div className="emptyMessage"><h1>{emptyMessage}</h1></div>}</React.Fragment>}
                            <div className="menuWrapper">
                                <Filter filter={this.filterData} isFiltered={this.state.filtered} filteredBy={this.state.filteredBy} load={this.loadData}/>
                                <div className="addBtn" onClick={this.linkToAddTask}></div>
                                <img src="./images/bin.svg" className="binIcon" onClick={this.deleteCheckedData}/>
                            </div>
                        </div>
               </React.Fragment>;
    }
}

export default List;