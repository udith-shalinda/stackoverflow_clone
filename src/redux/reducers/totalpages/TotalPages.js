const totalPages = (state = {pages:0},action)=>{
    switch(action.type){
        case 'GET_TOTAL_PAGES':
            return{
                pages:action.pages
            }  
        default:
            return state;
    }
}

export default totalPages