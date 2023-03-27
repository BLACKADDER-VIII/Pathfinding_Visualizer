import './App.css';
import Grid from './grid_func'
import Node1 from './node'
import bfs from "./BFS";
import node_info from "./node_info";
import {useRef, useState} from "react";
function App() {
    let grid = new Array(20);
    for (let i = 0; i < 20; i++) {
        grid[i] = new Array(40);
        for (let j = 0; j < 40; j++) {
            grid[i][j]= new node_info(i,j);
        }
    }
    const start = [10,8];
    const target = [10, 32];
  return (
      <>
          <div>
              <h1 style={{textAlign: "center", backgroundColor: "cyan"}}>Pathfinding Visualizer</h1>
          </div>

      <div className={"container"}>
        <Grid grid={grid} start={start} target = {target}/>
      </div>
      </>
  );
}

export default App;
