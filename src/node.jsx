import React, {Component, useState, useEffect} from "react";

const Node1 = ({info})=>{
    const [block, set_block] = useState(info.block);
    const [start, set_start] = useState(info.start);
    const [target, set_target] = useState(info.target);
    const [visited, set_visited] = useState(info.visited);
    const [in_path, set_in_path] = useState(info.in_path);
    function bg_set(){
        if(start)
            return "red";
        if(target)
            return "yellow";
        if(block)
            return "green";
        if(in_path)
            return "black";
        return visited? "cyan":"blue";
    }
    function handle_mouse_click(){
        set_block( (start || target)? false: !block);
    }
    useEffect(()=>{set_visited(info.visited);},[info.visited]);
    useEffect(()=>set_in_path(info.in_path), [info.in_path]);
    useEffect(()=>{set_block(info.block)},[info.clear]);
    useEffect(()=>{info.block = block}, [block]);
        return(
            <button style={{backgroundColor: bg_set(), padding: 6, borderWidth: 0.1,borderColor:"black", margin: 0, height: 30}} onMouseOver={()=>handle_mouse_click()} onDoubleClick={()=>console.log(info)}></button>
        );
}

export default Node1;