import { grey, indigo } from '@material-ui/core/colors';

let colors = [{
    theamColor:grey[900],
    theamFontColor:grey[50],
    bodyBackgroundColor:grey[800],
    contentBackgroundColor:grey[900],
},{
    theamColor:indigo[900],
    theamFontColor:grey[900],
    bodyBackgroundColor:grey[50],
    contentBackgroundColor:grey[50],
}]

const initialState = {
  colorCount:0,
  colors:colors,
}

export const colorState = (state = initialState,action)=>{
    switch(action.type){
        case 'CHANGE_THEAM':
            return{
                colorCount:action.colorCount,
                colors:colors
            } 
        default:
            return state;
    }
}

export default colorState;

