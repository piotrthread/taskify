import React from 'react';
import css from './Checker.scss';

class Checker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            checked: false
        };
    }
    //handle check input
    checkTask = () => {
        this.props.check();
        this.setState({checked: !this.state.checked});
    }

    componentDidMount(){
        this.setState({checked: this.props.done});
    }

    render(){
        return <React.Fragment>
            <div className="checker" onClick={this.checkTask}>
                <img src="./images/checked.svg" className={this.state.checked ? "iconChecked" : "iconUnchecked"}/>
                <div className="checkerBg"></div>
            </div>
        </React.Fragment>;
    }
}

export default Checker;