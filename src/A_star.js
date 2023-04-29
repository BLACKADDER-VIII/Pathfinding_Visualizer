import highlight_path from "./highlight_path";
import Heap from 'heap-js';

export default function A_star(grid1,start,target, order_arr) {
    let t_found = false;
    const grid = JSON.parse(JSON.stringify(grid1));
    function heurist_calc(ns, nt){
        return Math.abs(nt[1] - ns[1]) + Math.abs(nt[0] - nt[1])
    }
    //Initializing all nodes to infinity
    grid[start[0]][start[1]].dist = 0;  //Setting starting node to 0
    grid[start[0]][start[1]].heurist = heurist_calc(start, target);
    const custom_comp = (a,b)=>a.dist-b.dist+a.heurist-b.heurist;
    let minQ = Array();
    grid.map(e=>e.map(f=>minQ.push(f)));    //Adding all nodes to the min heap
    let curr;

    while(minQ.length){
        Heap.heapify(minQ, custom_comp);
        curr = minQ.shift();
        order_arr.push(curr.coord);
        if(curr.target){
            t_found = true;
            break;
        }
        if(curr.dist == Infinity){
            break;
        }
        //Adjusting curr's neighbors
        if(curr.coord[0] < 19) {
            grid[curr.coord[0]+1][curr.coord[1]].heurist = heurist_calc([curr.coord[0]+1,curr.coord[1]], target);
            if(!grid[curr.coord[0]+1][curr.coord[1]].block && grid[curr.coord[0] + 1][curr.coord[1]].dist > curr.dist + 1) {
                grid[curr.coord[0] + 1][curr.coord[1]].dist = curr.dist + 1 ;
                grid[curr.coord[0] + 1][curr.coord[1]].parent =  curr.coord;
            }
        }
        if(curr.coord[1] > 0) {
            grid[curr.coord[0]][curr.coord[1]-1].heurist = heurist_calc([curr.coord[0], curr.coord[1]-1], target);
            if(!grid[curr.coord[0]][curr.coord[1]-1].block && grid[curr.coord[0]][curr.coord[1] - 1].dist > curr.dist + 1) {
                grid[curr.coord[0]][curr.coord[1] - 1].dist = curr.dist + 1;
                grid[curr.coord[0]][curr.coord[1] - 1].parent = curr.coord;
            }
        }
        if(curr.coord[0] > 0) {
            grid[curr.coord[0]-1][curr.coord[1]].heurist = heurist_calc([curr.coord[0]-1, curr.coord[1]], target);
            if (!grid[curr.coord[0]-1][curr.coord[1]].block && grid[curr.coord[0] - 1][curr.coord[1]].dist > curr.dist + 1) {
                grid[curr.coord[0] - 1][curr.coord[1]].dist = curr.dist + 1;
                grid[curr.coord[0] - 1][curr.coord[1]].parent = curr.coord;
            }
        }
        if(curr.coord[1] < 39) {
            grid[curr.coord[0]][curr.coord[1]+1].heurist = heurist_calc([curr.coord[0], curr.coord[1]+1], target);
            if(!grid[curr.coord[0]][curr.coord[1]+1].block && grid[curr.coord[0]][curr.coord[1] + 1].dist > curr.dist + 1) {
                grid[curr.coord[0]][curr.coord[1] + 1].dist = curr.dist + 1;
                grid[curr.coord[0]][curr.coord[1] + 1].parent = curr.coord;
            }
        }
    }
    let path = [];
    if(t_found)
        path = highlight_path(grid, curr.coord);
    return path;
}