import axios from '../../axios/axios-quiz'
import { FETCH_QUIZES_ERROR, 
         FETCH_QUIZES_START, 
         FETCH_QUIZES_SUCCESS, 
         FETCH_QUIZE_SUCCESS, 
         QUIZ_FINISH, 
         QUIZE_SET_STATE, 
         QUIZ_NEXT_QUESTION, 
         QUIZ_RETRY} from './actionTypes'

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try {
            const response = await axios.get('quizes.json'),
                  quizes = []

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №: ${index + 1}`
                })
            })

            dispatch(fetchQuizesSuccess(quizes))
        } catch(error) {
            dispatch(fetchQuizesError(error))
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        error
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try {
            const response = await axios.get(`/quizes/${quizId}.json`),
                  quiz = response.data

            dispatch(fetchQuizeSuccess(quiz))

        } catch(error) {
            dispatch(fetchQuizesError(error))
        }
    }
}

export function fetchQuizeSuccess(quiz) {
    return {
        type: FETCH_QUIZE_SUCCESS,
        quiz
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZE_SET_STATE,
        answerState, 
        results
    }
}

export function finishQuiz() {
    return {
        type: QUIZ_FINISH
    }
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}

export function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz

        if (state.answerState) {
            return
        }

        const question = state.quiz[state.activeQuestion]
        const results = state.results

        if (question.rightAnswerId === answerId) {
            if(!results[question.id]) {
                results[question.id] = 'success'
            }

            dispatch(quizSetState({[answerId]: 'success'}, results))
        } else {
            results[question.id] = 'error'
            dispatch(quizSetState({[answerId]: 'error'}, results))
        }

        const timeout = window.setTimeout(() => {
            if (isQuizFinished(state)) {
                dispatch(finishQuiz())
            } else {
                dispatch(quizNextQuestion(state.activeQuestion + 1))
            }
            
            window.clearTimeout(timeout)
        }, 1000)
    }
}
