import React, {Component, useState, useEffect} from "react";

const Node1 = ({info})=>{
    const [block, set_block] = useState(info.block);
    const [start, set_start] = useState(info.start);
    const [target, set_target] = useState(info.target);
    const [visited, set_visited] = useState(info.visited);
    //this.state = {block: props.info.block, start: props.info.start, target: props.info.target, visited: props.info.visited, dist: -1};
    function bg_set(){
        if(start)
            return "red";
        if(target)
            return "yellow";
        if(visited)
            return "cyan";
        return block? "green":"blue";
    }
    function handle_mouse_click(){
        set_block( (start || target)? false: !block);
    }
    useEffect(()=>{set_visited(info.visited); console.log("Updated")},[info.visited]);
    useEffect(()=>{info.block = block}, [block]);
        return(
            <button style={{backgroundColor: bg_set(), padding: 6, borderWidth: 0.1,borderColor:"black", margin: 0, height: 30}} onClick={()=>handle_mouse_click()} onDoubleClick={()=>console.log(info)}></button>
        );
}

export default Node1;