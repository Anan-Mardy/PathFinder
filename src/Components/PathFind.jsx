import React,{useState,useEffect} from 'react';
import Node from './Node';
import "./PathFind.css";
import Astar from '../astarAlgorithm/Astar';
import Button from '@mui/material/Button';


const cols=40;
const rows=18;

const NODE_START_ROW=9;
const NODE_START_COL=3;
const NODE_END_COL=cols-3;
const NODE_END_ROW=6;

const PathFind=()=>{

    const [Grid,setGrid]=useState([]);
    const [path,setPath]=useState([]);
    const [visitedNodes, setVisitedNodes]=useState([]);

    useEffect(()=>{
        intializeGrid();
    },[]);

    //Create the Grid
    const intializeGrid=()=>{
        const grid= new Array(rows);
        for(let i=0;i<rows;i++){
            grid[i]=new Array(cols);
        }

        CreateSpot(grid);
        setGrid(grid);
        AddNeighbours(grid);
        
        console.log(Grid);


        const startNode= grid[NODE_START_ROW][NODE_START_COL];
        const endNode= grid[NODE_END_ROW][NODE_END_COL];

        startNode.isWall=false;  //code for wall
        endNode.isWall=false;  //code for wall


        let path =Astar(startNode,endNode);

        

        setPath(path.path);
        setVisitedNodes(path.visitedNodes);
        
    };

    //Create Spot
    const CreateSpot=(grid)=>{        

        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
                grid[i][j]= new Spot(i,j);
            }
        }
    };

    //Add neighbours

    const AddNeighbours=(grid)=>{
        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
                grid[i][j].addneighbours(grid);
            }
        }
    }

    function Spot(i,j){
        this.x=i;
        this.y=j;
        this.isStart= this.x===NODE_START_ROW && this.y===NODE_START_COL;
        this.isEnd= this.x===NODE_END_ROW && this.y===NODE_END_COL;

        this.g=0;
        this.f=0;
        this.h=0;

        this.neighbours=[];
        this.previous=undefined;

        this.isWall=false; //code for wall;
        if(Math.random(1)<0.1){
            this.isWall=true;
        }  //code for wall;

        this.addneighbours=function(grid){
            let i=this.x;
            let j=this.y;
            if(i>0) {this.neighbours.push(grid[i-1][j]);}
            if(i<rows-1) {this.neighbours.push(grid[i+1][j]);}
            if(j>0) {this.neighbours.push(grid[i][j-1]);}
            if(j<cols-1) {this.neighbours.push(grid[i][j+1]);}


            //  if(i>0 && j>0) {this.neighbours.push(grid[i-1][j-1]);}
            // if(i>0 && j<cols-1) {this.neighbours.push(grid[i-1][j+1]);}
            // if(i<rows-1 && j>0) {this.neighbours.push(grid[i+1][j-1]);}
            // if(i<rows-1 && j<cols-1) {this.neighbours.push(grid[i+1][j+1]);}

        };
    }

    //Grid with Node

    const gridwithNode=(
        <div className='wrapper'>
            {Grid.map((row,rowIndex)=>{
                return (
                    <div key={rowIndex} className="row-wrapper">
                    {row.map((col,colIndex)=>{
                        const {isStart,isEnd,isWall}=col;
                        return (
                            <Node key={colIndex}  isStart={isStart} isEnd ={isEnd} isWall={isWall} row={rowIndex} col={colIndex} />
                        );
                    })}
                    </div>
                );
            })}
        </div>
    );

    const visualizeShortestPath=(shortespathNodes)=>{
        for(let i=0;i<shortespathNodes.length;i++){
            setTimeout(()=>{
                const node=shortespathNodes[i];
                document.getElementById(`node-${node.x}-${node.y}`).className="node node-shortest-path";
            },10*i);
        }
    };

    const visualizepath=()=>{

        for(let i=0;i<=visitedNodes.length;i++){
            if(i===visitedNodes.length){
                setTimeout(()=>{
                    visualizeShortestPath(path);
                },20*i);
            } else{
                setTimeout(()=>{
                    const node= visitedNodes[i];
                    document.getElementById(`node-${node.x}-${node.y}`).className="node node-vis";
                },20*i);
            }
        }                
    }

    console.log(path.path);    
    

    return (
        <>
        <h1 className="hx1"> <span className='hx'>Path Visualizer</span></h1>


        <div className="main">

        <form>
            <Button onClick={visualizepath} variant="contained" className='butt'>Visualize</Button>
            
            <Button type='submit' onClick={()=>{
                // setNum(num+1);
                
            }} variant="contained" className='butt'>Reset</Button>

            </form> 
            {gridwithNode}

        </div>
            


            
        </>
    )
}

export default PathFind;
