import React from 'react'
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const Votes=()=>{
    return(
        <div >
            <IconButton>
                <ThumbUpIcon></ThumbUpIcon>
            </IconButton>
            <p>0</p>
            <IconButton>
                <ThumbDownIcon></ThumbDownIcon>
            </IconButton>
        </div>
    )
}

export default Votes