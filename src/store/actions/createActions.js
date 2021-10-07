import axios from '../../axios/axios-quiz'
import { CREATE_QUIZ_QUESTION, CREATE_QUIZ_RESET } from './actionTypes'

export function createQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function resetQuizCreation() {
    return {
        type: CREATE_QUIZ_RESET
    }
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        await axios.post('quizes.json', getState().create.quiz)
        dispatch(resetQuizCreation())
    }
}
