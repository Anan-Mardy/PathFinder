import React from "react";
function Astar(startNode,endNode){
    let openSet=[];
    let closedSet=[];
    let path=[];

    let visitedNodes=[];  //animation code;


    openSet.push(startNode);


    while(openSet.length>0){
        let leastIndex=0;

        for(let i=0;i<openSet.length;i++){
            if(openSet[i].f<openSet[leastIndex].f){
                leastIndex=i;
            }
        }

        let current= openSet[leastIndex];
        visitedNodes.push(current);  //animation code;

        if(current===endNode){

            let temp=current;
            path.push(temp.previous);
            while(temp.previous){
                path.push(temp);
                temp=temp.previous;
            }
            // noLoop();
            // console.log("Done!"); 

            return {path,visitedNodes}  //also in animation part with some change
        }

        openSet=openSet.filter(elt => elt !==current);

        closedSet.push(current);

        let neighbours=current.neighbours;

                for(let i=0;i<neighbours.length;i++){
                    let neighbour= neighbours[i];

                    if(!closedSet.includes(neighbour) && !neighbour.isWall){
                        // let tempG=current.g +1;
                        let tempG=current.g + heruistic(neighbour,endNode);
                        let newPath=false;

                        if(openSet.includes(neighbour)){
                            if(tempG< neighbour.g){
                                neighbour.g=tempG;
                                newPath=true;
                            }
                        } 

                        else{
                        neighbour.g=tempG;
                        newPath=true;
                        openSet.push(neighbour);
                        }


                        if(newPath){
                            neighbour.h= heruistic(neighbour,endNode);
                            neighbour.f=neighbour.g+neighbour.h;
                            neighbour.previous= current;
                        }
                    }
                }

    }

    return {path, visitedNodes, error:"No path Found"};  //Also in animation part with some change.
}

// const dist=(a,b,c,d)=>{
//     return Math.abs(a*a-b*b)+Math.abs(c*c-d*d)
// }

function heruistic(a,b){
    let d= Math.abs(a.x-b.x) + Math.abs(a.y-b.y);
    // let d=dist(a.x,b.x,a.y,b.y);      
    //The above one is good when diagonally neihbor exist;
    return d;
}

export default Astar;