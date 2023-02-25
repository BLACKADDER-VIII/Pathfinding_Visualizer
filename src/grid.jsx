import React, {Component} from "react";
import node_info from './node_info'

import Node1 from './node'
class Grid extends Component{
    constructor() {
        super();
        this.grid = new Array(10);
        for (let i = 0; i < 20; i++) {
            this.grid[i] = new Array(10);
            for (let j = 0; j < 40; j++) {
                this.grid[i][j]= new node_info(false,false,false,false);
            }
        }
    }
    render() {
        return (
            <div className="Grid">
                {this.grid.map(e => e.map(f=><Node1 info={f} />))}
                {this.grid[10][8].start = true}
                {this.grid[10][32].target = true}
            </div>
        );
    }
}
export default Grid;