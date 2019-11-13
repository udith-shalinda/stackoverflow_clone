import { combineReducers } from 'redux'
import userId from './user/userId'
import profileDataState from './profile/profileData'
import colorState from './color/color'
import userToken from './user/usertoken'





export default combineReducers({
    userId,
    userToken,
    profileDataState,
    colorState,
  })