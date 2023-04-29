import React, {Component, useEffect, useRef} from "react";
import Node1 from './node'
import { useState} from "react";
import bfs from "./BFS";
import dfs from "./DFS"
import dijkstra from "./Dijkstra";

const Grid = (props)=>{
        const [disabled, set_disabled] = useState(false);
        const ref_disabled = useRef(disabled);
        ref_disabled.current = disabled;
        const [has_visualized, set_has_visualized] = useState(false);
        const ref_has_visualized = useRef(has_visualized);
        ref_has_visualized.current = has_visualized;
        const algo_enum = {BFS:1, DFS:2, Dijkstra:3};
        const grid = props.grid;
        const [trigger, set_trigger] = useState(false);
        const [algo, set_algo] = useState(algo_enum.DFS);
        const [timer, set_timer] = useState(15);
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
                    <label>
                        Algorithms
                        <select value={algo} onChange={(event)=>set_algo(JSON.parse(event.target.value))}>
                            <option value={algo_enum.BFS}>BFS</option>
                            <option value={algo_enum.DFS}>DFS</option>
                            <option value={algo_enum.Dijkstra}>Dijkstra</option>
                        </select>
                    </label>
                    <button disabled={ref_disabled.current} style={{backgroundColor: "darkcyan",height: 50, width: 100}} onClickCapture={()=>visualize_handler()}>Visualize</button>
                    <button disabled={ref_disabled.current} style={{backgroundColor: "turquoise", height: 40, width: 80}} onClickCapture={()=>clear_grid()}>Clear</button>
                    <label>
                        Speed
                        <select value={timer} onChange={(event)=>set_timer(JSON.parse(event.target.value))}>
                            <option value={0}>Instant</option>
                            <option value={4}>Very fast</option>
                            <option value={7}>Fast</option>
                            <option value={15}>Moderate</option>
                            <option value={20}>Slow</option>
                            <option value={30}>Very slow</option>
                        </select>
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