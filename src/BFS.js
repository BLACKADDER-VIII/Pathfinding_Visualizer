import highlight_path from "./highlight_path";
export default function bfs(grid1,start, order_arr){
    let curr = [];
    let t_found = false;
    const grid = JSON.parse(JSON.stringify(grid1));
    function get_neighbors(grid,node){
        let neighbors = Array();
        if(node[0] < 19 && !grid[node[0]+1][node[1]].block && !grid[node[0]+1][node[1]].visited){
            neighbors.push([node[0]+1,node[1]]);
            grid[node[0]+1][node[1]].parent = node;
        }
        if(node[0] > 0 && !grid[node[0]-1][node[1]].block && !grid[node[0]-1][node[1]].visited){
            neighbors.push([node[0]-1,node[1]]);
            grid[node[0]-1][node[1]].parent = node;
        }

        if( node[1] >0 && !grid[node[0]][node[1]-1].block && !grid[node[0]][node[1]-1].visited){
            neighbors.push([node[0],node[1]-1]);
            grid[node[0]][node[1]-1].parent = node;
        }
        if( node[1] < 39 && !grid[node[0]][node[1]+1].block && !grid[node[0]][node[1]+1].visited){
            neighbors.push([node[0],node[1]+1]);
            grid[node[0]][node[1]+1].parent = node;
        }
        return neighbors;
    }
    let q = Array();
    grid[start[0]][start[1]].visited = true;
    get_neighbors(grid,start).map(e=>{q.push(e)});
    while(q.length > 0){
        curr = q.shift();
        order_arr.push(curr);
        if(grid[curr[0]][curr[1]].visited)
            continue;
        if(grid[curr[0]][curr[1]].target){
            t_found = true;
            break;}
        get_neighbors(grid,curr).map(e=>{q.push(e)});
        grid[curr[0]][curr[1]].visited = true;
    }
    let path = [];
    if(t_found)
        path = highlight_path(grid, curr);
    return path;
}
