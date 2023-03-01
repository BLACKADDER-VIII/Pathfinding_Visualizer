export default function highlight_path(grid, target){
    let path = [];
    let curr = grid[target[0]][target[1]];
    path.push(target);
    while(!curr.start){
        path.push(curr.parent);
        curr = grid[curr.parent[0]][curr.parent[1]];
    }
    return path;
}