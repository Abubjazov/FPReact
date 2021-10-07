import { combineReducers } from "redux"
import createReducer from "./createReduser"
import quizReducer from "./quizReducer"

export default combineReducers({
    quiz: quizReducer,
    create: createReducer
})
