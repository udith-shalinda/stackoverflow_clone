import React from 'react'
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const Votes=(props)=>{
    return(
        <div >
            <IconButton onClick={props.upVote}>
                <ThumbUpIcon></ThumbUpIcon>
            </IconButton>
            <p>{props.votes}</p>
            <IconButton onClick={props.downVote}>
                <ThumbDownIcon></ThumbDownIcon>
            </IconButton>
        </div>
    )
}

export default Votes