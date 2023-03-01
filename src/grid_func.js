import React, {Component, useEffect, useRef} from "react";
import Node1 from './node'
import { useState} from "react";
import bfs from "./BFS";
const Grid = (props)=>{
        const grid = props.grid;
        const [trigger, set_trigger] = useState(false);
        const ref = useRef(trigger);
        ref.current = trigger;
        const start = [10, 8];
        let order_arr = new Array();
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
        return (
            <>
                <div className="Grid">
                    {grid.map(e => e.map(f => <Node1 info={f}/>))}
                    {grid[10][8].start = true}
                    {grid[10][32].target = true}
                    <button onClickCapture={() => {
                        path = bfs(grid, start, order_arr);
                        animate();
                    }}>BFS
                    </button>
                    <button onClickCapture={() => grid.map(e => e.map(f => console.log(f)))}>Show</button>
                    <button onClickCapture={()=>grid.map(e=>e.map(f=>{f.block = false;f.visited = false; f.in_path = false; f.clear = !f.clear; set_trigger(!trigger);}))}>Clear</button>
                    <button onClickCapture={()=>grid.map(e=>e.map(f=>{f.visited = false; f.in_path=false; set_trigger(!trigger);}))}>Reset</button>
                </div>
            </>
        );
}
export default Grid;