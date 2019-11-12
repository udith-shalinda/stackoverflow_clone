import { grey, indigo } from '@material-ui/core/colors';

const headerColors = [
    grey[900],
    indigo[900],
  ]
  const fontColor = [
    grey[50],
    grey[900]
  ]
  const bodyBackground = [
    grey[800],
    grey[50]
  ]
  const contentBackground = [
    grey[900],
    grey[50],
  ]
let colorCount =0;

let colors = [{
    theamColor:headerColors[0],
    theamFontColor:fontColor[0],
    bodyBackgroundColor:bodyBackground[0],
    contentBackgroundColor:contentBackground[0],
},{
    theamColor:headerColors[1],
    theamFontColor:fontColor[1],
    bodyBackgroundColor:bodyBackground[1],
    contentBackgroundColor:contentBackground[1],
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

