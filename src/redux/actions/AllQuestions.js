import axios from 'axios';

export const getAllQuestions = (currentPage,pageSize) =>  async dispatch=>{
    try{
        const allQuestions = await axios.get('http://localhost:8102/api/question/getAllQuestions/'+currentPage+'/'+pageSize);
            console.log(allQuestions.data);
        dispatch({
            type:'GET_ALL_QUESTIONS',
            questions:allQuestions.data.questionPreviewResponseList 
        })
        dispatch({
            type:'GET_TOTAL_PAGES',
            pages:allQuestions.data.totalPages
        })
        dispatch({
            type:'GET_CURRENT_PAGE',
            currentPage:currentPage+1
        })
        return allQuestions.data.questionPreviewResponseList;
    }catch(err){
        return err.message;
    }
    
};
