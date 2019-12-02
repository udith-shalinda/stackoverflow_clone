export const addCommentQuestion= async(question,config,comment,id)=>{
    if(question){
        const res = await Axios.post('http://localhost:8102/api/question/delete/'+id,comment,config);
        console.log(res.data);
    }else{
        const res = await Axios.post('http://localhost:8102/api/question/sfsf/'+id,comment,config);
        console.log(res.data);
    }
}