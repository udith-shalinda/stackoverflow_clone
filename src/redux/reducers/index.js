import { combineReducers } from 'redux'
import userId from './user/userId'
import profileDataState from './profile/profileData'
import colorState from './color/color'
import userToken from './user/usertoken'
import questionState from './questions/AllQuestions'
import totalPages from './totalpages/TotalPages'
import currentPage from './totalpages/CurrentPage'



export default combineReducers({
    userId,
    userToken,
    profileDataState,
    colorState,
    questionState,
    totalPages,
    currentPage
  })