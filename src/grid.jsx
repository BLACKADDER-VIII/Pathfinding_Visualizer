import React, {Component} from "react";
import node_info from './node_info'

import Node1 from './node'
import bfs from "./BFS";
import { useState} from "react";
import {renderIntoDocument} from "react-dom/test-utils";

const Grid = (props)=>{
        const [grid, set_grid] = useState(props.grid);
        const [trigger, set_trigger] = useState(true);
        return (
            <>
            <div className="Grid">
                {grid.map(e => e.map(f=><Node1 info={f} />))}
                {grid[10][8].start = true}
                {grid[10][32].target = true}
                <button onClickCapture={()=>{bfs(grid,[10,8]); set_trigger(!trigger)}}>BFS</button>
                <button onClickCapture={()=>grid.map(e=>e.map(f=>console.log(f)))}>Show</button>
            </div>
                </>
        );
}
export default Grid;