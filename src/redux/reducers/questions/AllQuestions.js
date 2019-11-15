const questionState = (state = {questions:null},action)=>{
    switch(action.type){
        case 'GET_ALL_QUESTIONS':
            return{
                questions:action.questions
            }  
        default:
            return state;
    }
}

export default questionState