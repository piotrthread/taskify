import React from 'react';
import css from './Loader.scss';

class Loader extends React.Component{
    render(){
        return <React.Fragment>
            <div className="loader">
            <svg viewBox="0 0 200 200">
            <defs>
                <linearGradient id="gradient">
                <stop offset="25%" stopColor="#ffffff" />
                <stop offset="70%" stopColor={"rgba(255,255,255,0)"} />
                </linearGradient>
            </defs>
        <path className="loaderCircle" d=" M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0 " />
    </svg>
            </div>
        </React.Fragment>;
    }
}

export default Loader;