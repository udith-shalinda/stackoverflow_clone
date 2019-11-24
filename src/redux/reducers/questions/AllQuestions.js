const questionState = (state = {questions:null},action)=>{
    switch(action.type){
        case 'GET_ALL_QUESTIONS':
            return{
                questions:action.questions
            }
        case 'UPDATE_ONE_QUESTION':
                return Object.assign({}, state, {
                    questions: state.questions.map((question, index) => {
                      if (index === action.payload.index) {
                        return Object.assign({}, question, {
                          ...action.payload.question
                        })
                      }
                      return question
                    })
                  }) 
        default:
            return state;
    }
}

export default questionState