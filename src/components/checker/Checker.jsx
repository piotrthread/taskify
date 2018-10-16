import React from 'react';
import ReactSVG from 'react-svg';
import css from './Checker.scss';

class Checker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            checked: false
        };
    }

    checkTask = () => {
        this.props.check();
        this.setState({checked: !this.state.checked});
    }

    render(){
        return <React.Fragment>
            <div className="checker" onClick={this.checkTask}>
                <img src="./images/checked.svg" className={this.state.checked || this.props.done ? "iconChecked" : "iconUnchecked"}/>
            </div>
                </React.Fragment>;
    }
}

export default Checker;