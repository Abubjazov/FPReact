import axios from '../../axios/axios-quiz'
import { AUTH_LOGOUT, AUTH_SUCCESS } from './actionTypes'

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email, 
            password, 
            isLogin,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCdRbDIMWfdBhiz4vDKysQA6Tr57f2DpOM'

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCdRbDIMWfdBhiz4vDKysQA6Tr57f2DpOM'
        }

        const response = await axios.post(url, authData),
              data = response.data,
              expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')

    return {
        type: AUTH_LOGOUT
    }
}
