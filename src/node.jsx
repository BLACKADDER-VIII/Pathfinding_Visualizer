import React, {Component, useState} from "react";

class Node1 extends Component{
    constructor(props){
        super(props);
        this.state = {block: props.info.block, start: props.info.start, target: props.info.target, visited: props.info.visited, dist: -1};
    }
    bg_set(){
        if(this.state.start)
            return "red";
        if(this.state.target)
            return "yellow";
        return this.state.block? "green":"blue";
    }
    render(){
        return(
            <button style={{backgroundColor: this.bg_set(), padding: 6, borderWidth: 0.1,borderColor:"black", margin: 0, height: 30}} onMouseOver={()=>this.setState({block: (this.state.start || this.state.target)? false: !this.state.block})} onClick={()=>this.setState({target: !this.state.target, start: false, block: false})} onDoubleClick={()=>this.setState({start: !this.state.start, target: false, block: false})}></button>
        );
    }
}

export default Node1;