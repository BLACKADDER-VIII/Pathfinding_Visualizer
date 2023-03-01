import React, {Component, useEffect} from "react";
import Node1 from './node'
import { useState} from "react";
import bfs from "./BFS";
class Grid extends Component{
    constructor(props) {
        super(props);
        this.grid = props.grid;
        this.state = {trigger: false};
        this.start = [10, 8];
        this.order_arr = new Array();
        this.path = [];
    }
    animate(){
        for (let i = 0; i < this.order_arr.length; i++) {
        setTimeout(()=> {
                this.grid[this.order_arr[i][0]][this.order_arr[i][1]].visited = true;
                this.setState({trigger: !this.state.trigger});
            },10*i);
        }
        setTimeout(()=>{
            this.draw_path();
        },10*this.order_arr.length);
    }
    draw_path(){
        for(let i = 0; i <this.path.length; i++) {
            setTimeout(() => {
                    this.grid[this.path[i][0]][this.path[i][1]].in_path = true;
                    this.setState({trigger: !this.state.trigger});
            }, 100 * i);
        }
    }
    render() {
        return (
            <>
                <div className="Grid">
                    {this.grid.map(e => e.map(f => <Node1 info={f}/>))}
                    {this.grid[10][8].start = true}
                    {this.grid[10][32].target = true}
                    <button onClickCapture={() => {
                        this.path = bfs(this.grid, this.start, this.order_arr);
                        this.animate();
                        //this.draw_path();
                    }}>BFS
                    </button>
                    <button onClickCapture={() => this.grid.map(e => e.map(f => console.log(f)))}>Show</button>
                </div>
            </>
        );
    }
}
export default Grid;