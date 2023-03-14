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
        const ref = useRef(trigger);
        ref.current = trigger;
        const start = [10, 8];
        let order_arr = [];
        let path = [];
    function animate(){
        for (let i = 0; i < order_arr.length; i++) {
            setTimeout(()=> {
                grid[order_arr[i][0]][order_arr[i][1]].visited = true;
                set_trigger(!ref.current);
            },10*i);
        }
        setTimeout(()=> {
            for (let i = 0; i < path.length; i++) {
                setTimeout(() => {
                    grid[path[i][0]][path[i][1]].in_path = true;
                    set_trigger(!ref.current);
                }, 50 * i);
            }
        },10*order_arr.length);
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
                <div className="Control Bar">
                    <button style={{backgroundColor: "darkcyan",height: 50, width: 100}} onClickCapture={()=>visualize_handler()}>Visualize</button>
                    <label>
                        Algorithms
                        <select value={algo} onChange={(event)=>set_algo(JSON.parse(event.target.value))}>
                            <option value={algo_enum.BFS}>BFS</option>
                            <option value={algo_enum.DFS}>DFS</option>
                            <option value={algo_enum.Dijkstra}>Dijkstra</option>
                        </select>
                    </label>
                </div>
                <div className="Grid">
                    {grid.map(e => e.map(f => <Node1 info={f}/>))}
                    {grid[10][8].start = true}
                    {grid[10][32].target = true}
                    <button onClickCapture={() => grid.map(e => e.map(f => console.log(f)))}>Show</button>
                    <button onClickCapture={()=>clear_grid()}>Clear</button>
                    <button onClickCapture={()=>reset_grid()}>Reset</button>
                </div>
            </>
        );
}
export default Grid;