import { FETCH_QUIZES_ERROR, 
         FETCH_QUIZES_START, 
         FETCH_QUIZES_SUCCESS, 
         FETCH_QUIZE_SUCCESS, 
         QUIZ_FINISH, 
         QUIZE_SET_STATE, 
         QUIZ_NEXT_QUESTION,
         QUIZ_RETRY } from "../actions/actionTypes"

const initialState = {
    quiz: null,
    quizes: [],
    loading: false,
    error: null,
    activeQuestion: 0,
    answerState: null,
    isFinished: false,
    results: {}    
}

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_START:            
            return {
                ...state, loading: true
            }

        case FETCH_QUIZES_SUCCESS:        
            return {
                ...state, loading: false, quizes: action.quizes
            }

        case FETCH_QUIZES_ERROR:            
            return {
                ...state, loading: false, error: action.error
            }

        case FETCH_QUIZE_SUCCESS:        
            return {
                ...state, loading: false, quiz: action.quiz
            }

        case QUIZE_SET_STATE:        
            return {
                ...state, answerState: action.answerState, results: action.results
            }

        case QUIZ_FINISH:        
            return {
                ...state, isFinished: true
            }

        case QUIZ_NEXT_QUESTION:        
            return {
                ...state, answerState: null, activeQuestion: action.number
            }

        case QUIZ_RETRY:        
            return {
                ...state, 
                activeQuestion: 0,
                answerState: null,
                isFinished: false,
                results: {}
            }
    
        default:
            return state
    }
}
