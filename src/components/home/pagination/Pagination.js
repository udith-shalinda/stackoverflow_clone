import React from 'react'
import { IconButton, Button } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import './Pagination.css'

export const Pagination=(props)=>{
    return(
        <div className="paginationButtonSet">
            <IconButton onClick={()=>{console.log("sfsdfsfsfsfs")}}>
                <NavigateBeforeIcon></NavigateBeforeIcon>
            </IconButton>
            <h3>{props.currentPage}</h3>
            <IconButton>
                <NavigateNextIcon></NavigateNextIcon>
            </IconButton>
        </div>
    )
}

export default Pagination;