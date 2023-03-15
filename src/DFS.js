import highlight_path from "./highlight_path";

export default function dfs(grid1, start, order_arr){
    let curr = [];
    let t_found = false;
    let path = [];
    const grid = JSON.parse(JSON.stringify(grid1));
    curr[0] = start[0]; curr[1] = start[1];
    do
    {
        order_arr.push([curr[0], curr[1]]);
        grid[curr[0]][curr[1]].visited = true;
        if(grid[curr[0]][curr[1]].target){
            t_found = true;
            break;
        }
        if(curr[1] < 39 && !grid[curr[0]][curr[1]+1].block && !grid[curr[0]][curr[1]+1].visited){
            grid[curr[0]][curr[1]+1].parent = [curr[0],curr[1]];
            curr[1] = curr[1] + 1;
        }
        else if(curr[1]>0 && !grid[curr[0]][curr[1]-1].block && !grid[curr[0]][curr[1]-1].visited){
            grid[curr[0]][curr[1]-1].parent = [curr[0],curr[1]];
            curr[1] = curr[1] - 1;
        }
        else if(curr[0] < 19 && !grid[curr[0]+1][curr[1]].block && !grid[curr[0]+1][curr[1]].visited){
            grid[curr[0]+1][curr[1]].parent = [curr[0],curr[1]];
            curr[0] = curr[0] + 1;
        }
        else if(curr[0] > 0 && !grid[curr[0]-1][curr[1]].block && !grid[curr[0]-1][curr[1]].visited){
            grid[curr[0]-1][curr[1]].parent = [curr[0],curr[1]];
            curr[0] = curr[0] - 1;
        }
        else{
            grid[curr[0]][curr[1]].completed = true;
            if(curr[0] == start[0] && curr[1] == start[1])
                break;
            curr = JSON.parse(JSON.stringify(grid[curr[0]][curr[1]].parent));
        }
    }
    while((curr[0] != start[0] || curr[1] != start[1]) || !grid[start[0]][start[1]].completed);
    if(t_found)
        path = highlight_path(grid, curr);
    return path;
}