import axios from 'axios';

export const getAllQuestions = () =>  async dispatch=>{
    try{
        const allQuestions = await axios.get('http://localhost:8102/api/question/getAllQuestions');
            console.log(allQuestions.data);
        dispatch({
            type:'GET_ALL_QUESTIONS',
            questions:allQuestions.data 
        })
        return allQuestions.data;
    }catch(err){
        return err.message;
    }
    
};
