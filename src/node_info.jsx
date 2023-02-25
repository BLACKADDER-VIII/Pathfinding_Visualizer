import React from "react";
import Node1 from './node';

export default class node_info {
    constructor(start,target,block,visited){
        this.start = start;
        this.target = target;
        this.block = block;
        this.visited = visited;
    }
}