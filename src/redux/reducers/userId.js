const userId = (state = {text:''},action)=>{
    switch(action.type){
        case 'SET_USER':
            return{
                text:action.text
            }   
        default:
            return state;
    }
}

export default userId