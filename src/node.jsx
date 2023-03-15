import React, {Component, useState, useEffect, useRef} from "react";

const Node1 = (props)=>{
    const [block, set_block] = useState(props.info.block);
    const [start, set_start] = useState(props.info.start);
    const [target, set_target] = useState(props.info.target);
    const [visited, set_visited] = useState(props.info.visited);
    const [in_path, set_in_path] = useState(props.info.in_path);
    const ref_start = useRef(start);
    ref_start.current = start;
    function bg_set(){
        if(ref_start.current)
            return "red";
        if(target)
            return "yellow";
        if(block)
            return "green";
        if(in_path)
            return "black";
        return visited? "cyan":"blue";
    }
    function handle_mouse_down(){
        props.set_mouse_down(true);
        if(start){
            props.set_grabbed_start(true);
        }
        else
            set_block( (start || target)? false: !block);
    }
    function handle_mouse_over(){
        if(props.ref_mouse_down.current) {
            if (props.ref_grabbed_start.current) {
                set_start(!ref_start.current);
                props.par_set_start(props.info.coord);
                props.base_start[0] = props.info.coord[0];
                props.base_start[1] = props.info.coord[1];
            }
            else
                set_block((start || target) ? false : !block);
        }
    }
    function handle_mouse_up(){
        props.set_mouse_down(false);
        props.set_grabbed_start(false);
    }

    function handle_mouse_out(){
        if(props.ref_mouse_down.current && props.ref_grabbed_start.current){
            set_start(!ref_start.current);
        }
    }
    useEffect(()=>{set_visited(props.info.visited);},[props.info.visited]);
    useEffect(()=>set_in_path(props.info.in_path), [props.info.in_path]);
    useEffect(()=>{set_block(props.info.block)},[props.info.clear]);
    useEffect(()=>{props.info.block = block}, [block]);
    useEffect(()=>{props.info.start = ref_start.current}, [ref_start.current]);
        return(
            <button style={{backgroundColor: bg_set(), padding: 6, borderWidth: 0.1,borderColor:"black", margin: 0, height: 30}} onMouseDown={()=>handle_mouse_down()} onMouseOver={()=>handle_mouse_over()} onMouseUp={()=>handle_mouse_up()} onMouseLeave={()=>handle_mouse_out()} onDoubleClick={()=>console.log(start)}></button>
        );
}

export default Node1;