import React from 'react';
import css from './GroupSelector.scss';

class GroupSelector extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected:"home"
        };
    }
    //handle group choosing in add task
    selectOption = (e,text) => {
        this.setState({selected: text}, () => {
            this.props.group(e,text);
        });
    }

    render(){
        return <React.Fragment>
            <div className="selector">
                <div className={this.state.selected == "home" ? "iconSelected" : "icon"} data-text="home" onClick={(e,text) =>this.selectOption(e,"home")}>
                    <img src="./images/home.svg" className="home"/>
                </div>
                <div className={this.state.selected == "personal" ? "iconSelected" : "icon"} data-text="personal" onClick={(e,text) =>this.selectOption(e,"personal")}>
                    <img src="./images/personal.svg" className="personal"/>
                </div>
                <div className={this.state.selected == "work" ? "iconSelected" : "icon"} data-text="work" onClick={(e,text) =>this.selectOption(e,"work")}>
                    <img src="./images/work.svg" className="work"/>
                </div>
            </div>
        </React.Fragment>;
    }
}

export default GroupSelector;