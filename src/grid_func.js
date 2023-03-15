import React, {Component, useEffect, useRef} from "react";
import Node1 from './node'
import { useState} from "react";
import bfs from "./BFS";
import dfs from "./DFS"

const Grid = (props)=>{
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
        const [start, set_start] = useState(props.start);
        const ref_start = useRef(start);
        ref_start.current = start;
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
    }
    function instant_animate(){
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
        grid.map(e=>e.map(f=>{f.visited = false; f.in_path=false; f.dist=Infinity; f.completed = false;set_trigger(!trigger);}));
    }
    function clear_grid(){
        grid.map(e=>e.map(f=>{f.block = false;f.visited = false; f.in_path = false; f.clear = !f.clear; f.completed = false; f.dist = Infinity;set_trigger(!trigger);}))
    }
    const visualize_handler = ()=>{
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
                    <button style={{backgroundColor: "darkcyan",height: 50, width: 100}} onClickCapture={()=>visualize_handler()}>Visualize</button>
                    <button style={{backgroundColor: "turquoise", height: 40, width: 80}} onClickCapture={()=>clear_grid()}>Clear</button>
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
                <div className="Grid">
                    {grid.map(e => e.map(f => <Node1 info={f} set_mouse_down={set_mouse_down} ref_mouse_down={ref_mouse_down} set_grabbed_start={set_grabbed_start} ref_grabbed_start={ref_grabbed_start} par_set_start={set_start} base_start={props.start} render={instant_animate}/>))}
                    {grid[10][32].target = true}
                    {grid.map(e=>e.map(f=>{f.start=false}))}
                    {grid[start[0]][start[1]].start = true}
                    <button onClickCapture={() => grid.map(e => e.map(f => console.log(f)))}>Show</button>
                    <button onClickCapture={()=>reset_grid()}>Reset</button>
                </div>
            </>
        );
}
export default Grid;