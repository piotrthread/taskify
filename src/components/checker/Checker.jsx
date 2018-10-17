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

    componentDidMount(){
        this.setState({checked: this.props.done});
    }

    render(){
        return <React.Fragment>
            <div className="checker" onClick={this.checkTask}>
                <img src="./images/checked.svg" className={this.state.checked ? "iconChecked" : "iconUnchecked"}/>
            </div>
                </React.Fragment>;
    }
}

export default Checker;