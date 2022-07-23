import React,{useState} from "react";
import "./Node.css";

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Node=({isStart,isEnd,row,col,isWall})=>{    


    return (
            (isStart 
            ?<div className={`node node-start`}><div className="ele"><PlayCircleOutlineIcon fontSize="small"/></div></div>
            : isEnd 
            ? <div className={`node node-end`}><div className="ele"><CheckCircleOutlineIcon fontSize="small"/></div></div>
            : isWall 
            ? <div className={`node node-wall`} id={`node-${row}-${col}` }></div>
            :<div className={`node`} id={`node-${row}-${col}`}></div>) 


        // <div className={`node ${classes}`} id={`node-${row}-${col}`}></div>
    )
};
export default Node;