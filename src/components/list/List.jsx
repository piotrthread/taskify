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
            toRemove:[],
            loading: false,
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
                    this.setState({ data, loading: false, isFiltered: true});
                        
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
    
    deleteData = (e,id) => {
                        fetch(`https://coderslabproject.firebaseio.com/tasks/${id}.json`,
                        {
                            method: "DELETE"
                        })
                        .then(() => {this.loadData();})
                        .then(() => {
                            this.setState({filtered: true, filteredBy: ""});
                        });
    }  

    filterData = (e,group) => {
        if(group == ""){
            this.setState({filtered: true, filteredBy: ""}, () => {
                this.loadData();
            });
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
                        :   <React.Fragment>
                        
                        {   this.state.data.length > 0
                                ? <React.Fragment>
                                <img src="./images/scroll.svg" className="leftScroll"/>
                                <img src="./images/scroll.svg" className="rightScroll"/>   
                                <ul className="list">
                                {this.state.data.filter(Boolean).map((element) => {
                                    return <li key={element.id}>
                                                <Task taskTitle={element.title} group={element.group} id={element.id} check={this.checkData} done={element.done} delete={this.deleteData}/>
                                            </li>;
                                })}
                            </ul> </React.Fragment>
                            : <div className="emptyMessage"><h1>{emptyMessage}</h1></div>}</React.Fragment>}
                            <div className="menuWrapper">
                                <Filter filter={this.filterData} isFiltered={this.state.filtered} filteredBy={this.state.filteredBy} load={this.loadData}/>
                                <div className="addBtn" onClick={this.linkToAddTask}></div>
                            </div>
                        </div>
               </React.Fragment>;
    }
}

export default List;