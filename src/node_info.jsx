import React from "react";
import Node1 from './node';

export default class node_info {
    constructor(i,j){
        this.start = false;
        this.target = false;
        this.block = false;
        this.visited = false;
        this.parent = [];
        this.in_path = false;
        this.clear = true;
        this.dist = Infinity;
        this.heurist = Infinity;
        this.completed = false;
        this.coord = [i,j];
    };
}