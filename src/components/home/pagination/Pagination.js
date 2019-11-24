import React, { useState, useEffect } from 'react'
import { IconButton, Button } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

//redux
import { connect } from 'react-redux'
import {getAllQuestions} from '../../../redux/actions/AllQuestions'


import './Pagination.css'

export const Pagination=(props)=>{
    const [pages,setPages] = useState(1);

    useEffect(()=>{
        setPages(props.currentPage);
    })

    const handlePagination=(page)=>{
        props.getAllQuestions(page-1,1)
        setPages(page)
    }
    
    return(
        <div className="paginationButtonSet">
            <IconButton onClick={()=>{handlePagination(pages-1)}} disabled={pages===1?true:false}>
                <NavigateBeforeIcon></NavigateBeforeIcon>
            </IconButton>
                <h3>{pages}</h3>
            <IconButton onClick={()=>{handlePagination(pages+1)}} disabled={pages===props.totalPages?true:false}>
                <NavigateNextIcon></NavigateNextIcon>
            </IconButton>
        </div>
    )
}

// export default Pagination;
const mapStateToProps = state => {
    return { 
      colorState:state.colorState,
      totalPages:state.totalPages.pages,
      currentPage:state.currentPage.currentPage,
     };
  };
  
  export default connect(
    mapStateToProps,
    { getAllQuestions }
  )(Pagination)
