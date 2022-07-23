import React,{useState} from "react";
import "./Node.css";

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Node1=(props)=>{ 
    const classes= props.isStart
        ?"node-start"
        :props.isEnd
        ?"node-end"
        :props.isWall
        ?"node-wall"
        :"";

    return ( 
        (
            props.isStart
            ?<button
                    className={`node ${classes}`}
                    id={`node-${props.row}-${props.col}`}
                    onMouseOver={(x,y)=>props.OnEnter(props.row,props.col)}
                    onMouseDown={(x,y)=>props.OnDown(props.row,props.col)}
                    onMouseUp={()=>props.OnUp()}>
                <div className="ele"><PlayCircleOutlineIcon fontSize="small"/></div>    
            </button>

        : props.isEnd
        ?<button
                className={`node ${classes}`}
                id={`node-${props.row}-${props.col}`}
                onMouseOver={(x,y)=>props.OnEnter(props.row,props.col)}
                onMouseDown={(x,y)=>props.OnDown(props.row,props.col)}
                onMouseUp={()=>props.OnUp()}>
            <div className="ele"><CheckCircleOutlineIcon fontSize="small"/></div>    
        </button>

        :
        <button
                className={`node ${classes}`}
                id={`node-${props.row}-${props.col}`}
                onMouseOver={(x,y)=>props.OnEnter(props.row,props.col)}
                onMouseDown={(x,y)=>props.OnDown(props.row,props.col)}
                onMouseUp={()=>props.OnUp()}    
        />
        )
    );
};
export default Node1;