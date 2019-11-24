const currentPage = (state = {currentPage:1},action)=>{
    switch(action.type){
        case 'GET_CURRENT_PAGE':
            return{
                currentPage:action.currentPage
            }  
        default:
            return state;
    }
}

export default currentPage