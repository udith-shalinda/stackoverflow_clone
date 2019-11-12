import { combineReducers } from 'redux'
import userId from './userId'
import loginState from './login'
import profileDataState from './profile/profileData'
import colorState from './color/color'





export default combineReducers({
    userId,
    loginState,
    profileDataState,
    colorState,
  })