import React, {Component, useEffect, useRef} from "react";
import Node1 from './node'
import { useState} from "react";
import bfs from "./BFS";
import dfs from "./DFS"
import dijkstra from "./Dijkstra";
import Select from 'react-select'

const Grid = (props)=>{
        const [disabled, set_disabled] = useState(false);
        const ref_disabled = useRef(disabled);
        ref_disabled.current = disabled;
        const [has_visualized, set_has_visualized] = useState(false);
        const ref_has_visualized = useRef(has_visualized);
        ref_has_visualized.current = has_visualized;
        const algo_enum = {BFS:0, DFS:1, Dijkstra:2};
        const grid = props.grid;
        const [trigger, set_trigger] = useState(false);
        const [algo, set_algo] = useState(algo_enum.DFS);
        const [timer, set_timer] = useState(4);
        const [timer_label, set_timer_label] = useState('Very Fast');
        const ref = useRef(trigger);
        ref.current = trigger;
        const [mouse_down, set_mouse_down] = useState(false);
        const ref_mouse_down = useRef(mouse_down);
        ref_mouse_down.current = mouse_down;
        const [grabbed_start, set_grabbed_start] = useState(false);
        const ref_grabbed_start = useRef(grabbed_start);
        ref_grabbed_start.current = grabbed_start;
        const [grabbed_target, set_grabbed_target] = useState(false);
        const ref_grabbed_target = useRef(grabbed_target);
        ref_grabbed_target.current = grabbed_target;
        const [start, set_start] = useState(props.start);
        const ref_start = useRef(start);
        ref_start.current = start;
        const [target, set_target] = useState(props.target);
        const ref_target = useRef(target);
        ref_target.current = target;
        let order_arr = [];
        let path = [];
        const alg_options = [{ value: algo_enum.BFS, label: 'BFS'}, { value: algo_enum.DFS, label: 'DFS'}, {value: algo_enum.Dijkstra, label: 'Dijkstra'}];
        const speed_options = [{value: 0, label: 'Instant'}, {value: 4, label: 'Very Fast'}, {value: 7, label: 'Fast'}, {value: 12, label: 'Moderate'}, {value: 20, label: 'Slow'}, {value: 30, label: 'Very Slow'}];
        function animate(){
        for (let i = 0; i < order_arr.length; i++) {
            setTimeout(()=> {
                grid[order_arr[i][0]][order_arr[i][1]].visited = true;
                set_trigger(!ref.current);
            },timer*i);

        }
        setTimeout(()=> {
            for (let i = 0; i < path.length; i++) {
                setTimeout(() => {
                    grid[path[i][0]][path[i][1]].in_path = true;
                    set_trigger(!ref.current);
                }, timer * i);
            }
        },timer*order_arr.length);
        setTimeout(()=> {
            set_disabled(false);
        },timer*order_arr.length+timer*path.length);
    }
    function instant_animate(){
        if(!has_visualized)
            return;
        reset_grid();
        switch(algo){
            case algo_enum.BFS: {
                path = bfs(grid, start, order_arr);
                break;
            }
            case algo_enum.DFS: {
                path = dfs(grid, start, order_arr);
                break;
            }
            case algo_enum.Dijkstra: {
                path = dijkstra(grid, start, order_arr);
                break;
            }
            default:
                console.log(algo);
        }
        for (let i = 0; i < order_arr.length; i++) {
                grid[order_arr[i][0]][order_arr[i][1]].visited = true;
                set_trigger(!ref.current);
        }
            for (let i = 0; i < path.length; i++) {
                    grid[path[i][0]][path[i][1]].in_path = true;
                    set_trigger(!ref.current);
            }
        }
    function reset_grid(){
        //set_has_visualized(false);
        grid.map(e=>e.map(f=>{f.visited = false; f.in_path=false; f.dist=Infinity; f.completed = false;set_trigger(!trigger);}));
    }
    function clear_grid(){
        set_has_visualized(false);
        grid.map(e=>e.map(f=>{f.block = false;f.visited = false; f.in_path = false; f.clear = !f.clear; f.completed = false; f.dist = Infinity;set_trigger(!trigger);}))
    }

    const visualize_handler = ()=>{
        set_disabled(true);
        set_has_visualized(true);
        reset_grid();
        switch(algo){
            case algo_enum.BFS: {
                path = bfs(grid, start, order_arr);
                break;
            }
            case algo_enum.DFS: {
                path = dfs(grid, start, order_arr);
                break;
            }
            case algo_enum.Dijkstra: {
                path = dijkstra(grid, start, order_arr);
                break;
            }
            default:
                console.log(algo);
        }
        animate();
    }
        return (
            <>
                <div className="Control_Bar">
                    <label style={{width: 200, fontSize: 18, color: 'darkcyan',}}>Algorithm
                        <Select classNamePrefix={"sl_alg"} styles={{control: (df)=>({...df, backgroundColor: 'cyan', margin: 5}), option:(df)=>({...df, backgroundColor: 'cyan'})}} value={{value: algo, label: alg_options[algo].label}} options={alg_options} onChange={(event)=>set_algo(JSON.parse(event.value))}/>
                    </label>
                    <button className={'Vis_btn'} disabled={ref_disabled.current} onClickCapture={()=>visualize_handler()}>Visualize</button>
                    <button className={'clr_btn'} disabled={ref_disabled.current} onClickCapture={()=>clear_grid()}>Clear</button>
                    <label>
                        Speed
                        <Select classNamePrefix={'sl_spd'} styles={{control: (df)=>({...df, backgroundColor: 'cyan', margin: 5}), option:(df)=>({...df, backgroundColor: 'cyan'})}} value={{value: timer, label: timer_label}} options={speed_options} onChange={(event)=>{set_timer(JSON.parse(event.value));set_timer_label(event.label)}}/>
                    </label>
                </div>
                <div className="Grid" >
                    {grid.map(e => e.map(f => <Node1 disabled={ref_disabled.current} info={f} set_mouse_down={set_mouse_down} ref_mouse_down={ref_mouse_down} set_grabbed_start={set_grabbed_start} set_grabbed_target = {set_grabbed_target} ref_grabbed_start={ref_grabbed_start} ref_grabbed_target={ref_grabbed_target} par_set_start={set_start} par_set_target={set_target} base_start={props.start} base_target={props.target} render={instant_animate}/>))}
                    {grid.map(e=>e.map(f=>{f.start=false; f.target=false;}))}
                    {grid[target[0]][target[1]].target = true}
                    {grid[start[0]][start[1]].start = true}
                    <button onClickCapture={() => grid.map(e => e.map(f => console.log(f)))}>Show</button>
                    <button onClickCapture={()=>reset_grid()}>Reset</button>
                </div>
            </>
        );
}
export default Grid;