import React from "react";

import Node1 from './node'
function Grid(){
    var grid = new Array(10);
    for(let i = 0;i<15;i++){
        grid[i] = new Array(10);
        for(let j = 0;j<40;j++){
            grid[i][j] = [i+1,j+1];
        }
    }
    return (
        <div className="Grid">
            {grid.map(e=>e.map(f=><Node1 pos={f}/>))}
        </div>
    );
}
export default Grid;