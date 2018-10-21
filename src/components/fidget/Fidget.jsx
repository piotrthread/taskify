import React from 'react';
import css from './Fidget.scss';
const elements = new Array(400).fill(null);

class Fidget extends React.Component{
    componentDidMount(){
        $(".element").bind("webkitAnimationEnd mozAnimationEnd animationend", function(){
            $(this).removeClass("elementHover");  
          });
    
        $(".element").hover(function(){
            $(this).addClass("elementHover");        
          });
    }

    render(){
        return <React.Fragment>
            <div className="fidgetWrapper">
                {elements.map((element,index) => {
                    return <div className="element" key={index}></div>;
                })}
            </div>
        </React.Fragment>;
    }
}

export default Fidget;