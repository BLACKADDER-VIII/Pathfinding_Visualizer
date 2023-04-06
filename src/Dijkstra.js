import highlight_path from "./highlight_path";
import Heap from 'heap-js';

export default function dijkstra(grid1,start, order_arr) {
    let t_found = false;
    const grid = JSON.parse(JSON.stringify(grid1));
    //Initializing all nodes to infinity
    grid.map(e=>e.map(f=>{f.dist = Infinity}));
    grid[start[0]][start[1]].dist = 0;  //Setting starting node to 0
    const custom_comp = (a,b)=>a.dist-b.dist;
    let minQ = Array();
    grid.map(e=>e.map(f=>minQ.push(f)));    //Adding all nodes to the min heap
    let curr;

    while(minQ.length){
        Heap.heapify(minQ, custom_comp);
        curr = minQ.shift();
        if(curr.dist == Infinity){
            break;
        }
        order_arr.push(curr.coord);
        if(curr.target){
            t_found = true;
            break;
        }
        //Adjusting curr's neighbors
        if(curr.coord[0] < 19) {
            if(!grid[curr.coord[0]+1][curr.coord[1]].block && grid[curr.coord[0] + 1][curr.coord[1]].dist > curr.dist + 1) {
                grid[curr.coord[0] + 1][curr.coord[1]].dist = curr.dist + 1 ;
                grid[curr.coord[0] + 1][curr.coord[1]].parent =  curr.coord;
            }
        }
        if(curr.coord[1] > 0) {
            if(!grid[curr.coord[0]][curr.coord[1]-1].block && grid[curr.coord[0]][curr.coord[1] - 1].dist > curr.dist + 1) {
                grid[curr.coord[0]][curr.coord[1] - 1].dist = curr.dist + 1;
                grid[curr.coord[0]][curr.coord[1] - 1].parent = curr.coord;
            }
        }
        if(curr.coord[0] > 0) {
            if (!grid[curr.coord[0]-1][curr.coord[1]].block && grid[curr.coord[0] - 1][curr.coord[1]].dist > curr.dist + 1) {
                grid[curr.coord[0] - 1][curr.coord[1]].dist = curr.dist + 1;
                grid[curr.coord[0] - 1][curr.coord[1]].parent = curr.coord;
            }
        }
        if(curr.coord[1] < 39) {
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