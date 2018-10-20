import React from 'react';
import css from './Filter.scss';

class Filter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filter: false,
            filterBy: ""
        };
    }

    filter = (e,group) => {
        if(this.state.filter == false && this.state.filterBy !== group){
            this.setState({filter: !this.state.filter, filterBy: group},() => {
                this.props.filter(e,group);
            });
        }else if(this.state.filter == true && this.state.filterBy == group){
            this.setState({filter: !this.state.filter, filterBy: ""},() => {
                this.props.filter(e,"");
                this.props.load();
            });
        }else if(this.state.filter == true && this.state.filterBy !== group){
            this.setState({filterBy: group},() => {
                this.props.filter(e,group);
            });
        }
    }

    componentDidMount(){
        this.setState({
            filter: this.props.isFiltered,
            filterBy: this.props.filteredBy
        });
    }

    render(){
        return <React.Fragment>
            <div className="filterWrapper">
                <div className="filtersContainer">
                <div className={this.state.filter && this.state.filterBy == "home" ? "filterIconActive" : "filterIcon"} onClick={(e,group) => this.filter(e,"home")}><img src="./images/home.svg" className="icon" /></div>
                <div className={this.state.filter && this.state.filterBy == "personal" ? "filterIconActive" : "filterIcon"} onClick={(e,group) => this.filter(e,"personal")}><img src="./images/personal.svg" className="icon" /></div>
                <div className={this.state.filter && this.state.filterBy == "work" ? "filterIconActive" : "filterIcon"} onClick={(e,group) => this.filter(e,"work")}><img src="./images/work.svg" className="icon" /></div>
                </div>
            </div>
        </React.Fragment>;
    }
}

export default Filter;