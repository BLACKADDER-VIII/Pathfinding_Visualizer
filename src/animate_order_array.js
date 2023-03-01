

export default function animate(vis_ord,path, func, grid){
    for(let i = 0;i<vis_ord.length;i++){
            grid[vis_ord[i][0]][vis_ord[i][1]].visited = true;
    }
    for(let i = 0;i<path.length;i++){
            grid[path[i][0]][path[i][1]].in_path = true;
    }
    func();
}