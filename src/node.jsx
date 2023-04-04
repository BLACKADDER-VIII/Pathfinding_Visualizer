import React, {Component, useState, useEffect, useRef} from "react";

const Node1 = (props)=>{
    const [block, set_block] = useState(props.info.block);
    const [start, set_start] = useState(props.info.start);
    const [target, set_target] = useState(props.info.target);
    const [visited, set_visited] = useState(props.info.visited);
    const [in_path, set_in_path] = useState(props.info.in_path);
    const ref_start = useRef(start);
    ref_start.current = start;
    const ref_target = useRef(target);
    ref_target.current = target;

    function bg_set(){
        if(ref_start.current)
            return "red";
        if(target)
            return "yellow";
        if(block)
            return "black";
        if(in_path)
            return "lime";
        return visited? "cyan":"white";
    }
    function handle_mouse_down(){
        props.set_mouse_down(true);
        if(start){
            props.set_grabbed_start(true);
        }
        else if(target){
            props.set_grabbed_target(true);
        }
        else
            set_block( (start || target)? false: !block);
    }
    function handle_mouse_over(){
        if(props.ref_mouse_down.current) {
            if (props.ref_grabbed_start.current) {
                set_start(true);
                set_block(false);
                props.par_set_start(props.info.coord);
                props.base_start[0] = props.info.coord[0];
                props.base_start[1] = props.info.coord[1];
            }
            else if(props.ref_grabbed_target.current){
                set_target(true);
                set_block(false);
                props.par_set_target(props.info.coord);
                props.base_target[0] = props.info.coord[0];
                props.base_target[1] = props.info.coord[1];
            }
            else
                set_block((start || target) ? false : !block);
            props.render();
        }
    }
    function handle_mouse_up(){
        props.set_mouse_down(false);
        props.set_grabbed_start(false);
        props.set_grabbed_target(false);
        props.render();
    }

    useEffect(()=>{set_visited(props.info.visited);},[props.info.visited]);
    useEffect(()=>set_in_path(props.info.in_path), [props.info.in_path]);
    useEffect(()=>{set_start(props.info.start);},[(props.info.start != start)]);
    useEffect(()=>{set_target(props.info.target);},[(props.info.target != target)]);
    useEffect(()=>{set_block(props.info.block)},[props.info.clear]);
    useEffect(()=>{props.info.block = block}, [block]);
    useEffect(()=>{props.info.start = ref_start.current}, [ref_start.current]);
    useEffect(()=>{props.info.target=ref_target.current}, [ref_target.current]);
        return(
            <button className={'Node1'} disabled={props.disabled} style={{backgroundColor: bg_set(), padding: 6, borderWidth: 0.1,borderColor:"black", margin: 0, height: 30 }} onMouseDown={()=>handle_mouse_down()} onMouseOver={()=>handle_mouse_over()} onMouseUp={()=>handle_mouse_up()} onDoubleClick={()=>console.log(props.info)}></button>
        );
}

export default Node1;