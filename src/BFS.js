import Grid from "./grid";


export default function bfs(grid,start){
    function get_neighbors(grid,node){
        let neighbors = Array();
        if(node[0] < 19 && !grid[node[0]+1][node[1]].block && !grid[node[0]+1][node[1]].visited)
            neighbors.push([node[0]+1,node[1]]);
        if(node[0] > 0 && !grid[node[0]-1][node[1]].block && !grid[node[0]-1][node[1]].visited)
            neighbors.push([node[0]-1,node[1]]);
        if( node[1] >0 && !grid[node[0]][node[1]-1].block && !grid[node[0]][node[1]-1].visited)
            neighbors.push([node[0],node[1]-1]);
        if( node[1] < 39 && !grid[node[0]][node[1]+1].block && !grid[node[0]][node[1]+1].visited)
            neighbors.push([node[0],node[1]+1]);
        return neighbors;
    }
    let q = Array();
    grid[start[0]][start[1]].visited = true;
    get_neighbors(grid,start).map(e=>{q.push(e)});
    while(q.length > 0){
        let curr = q.shift();
        if(grid[curr[0]][curr[1]].visited)
            continue;
        if(grid[curr[0]][curr[1]].target)
            break;
        get_neighbors(grid,curr).map(e=>{q.push(e)});
        grid[curr[0]][curr[1]].visited = true;
    }
}