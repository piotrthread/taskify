import React from 'react';
import css from './Filter.scss';

class Filter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filter: true,
            filterBy: ""
        };
    }
    //handle filtering
    filter = (e,group) => {
        if(this.state.filter == false && this.state.filterBy !== group){
            this.setState({filter: !this.state.filter, filterBy: group},() => {
                this.props.filter(e,group);
            });
        }else if(this.state.filter == true && this.state.filterBy !== group){
            this.setState({filterBy: group},() => {
                this.props.filter(e,group);
            });
        }else if(this.state.filter == true && this.state.filterBy == ""){
            
        }else if(this.state.filter == true && this.state.filterBy !== "home"
        && this.state.filterBy !== "work"
        && this.state.filterBy !== "personal"){
            this.setState({filterBy: group},() => {
                this.props.load();
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
                    <div data-text="home" className={this.state.filter && this.state.filterBy == "home" ? "filterIconActive" : "filterIcon"} onClick={(e,group) => this.filter(e,"home")}>
                        <img src="./images/home.svg" className="home" />
                    </div>
                    <div data-text="personal" className={this.state.filter && this.state.filterBy == "personal" ? "filterIconActive" : "filterIcon"} onClick={(e,group) => this.filter(e,"personal")}>
                        <img src="./images/personal.svg" className="personal" />
                    </div>
                    <div data-text="work" className={this.state.filter && this.state.filterBy == "work" ? "filterIconActive" : "filterIcon"} onClick={(e,group) => this.filter(e,"work")}>
                        <img src="./images/work.svg" className="work" />
                    </div>
                    <div data-text="all" className={this.state.filterBy == "" ? "filterIconActive" : "filterIcon"} onClick={(e,group) => this.filter(e,"")}>
                        <img src="./images/all.svg" className="work" />
                    </div>
                </div>
            </div>
        </React.Fragment>;
    }
}

export default Filter;