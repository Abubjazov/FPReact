import React from 'react'
import './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import axios from 'axios'

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

class Auth extends React.Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный Email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 8
                }
            }
        }
    }

    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCdRbDIMWfdBhiz4vDKysQA6Tr57f2DpOM', authData)

            console.log(response.data)
        } catch(error) {
            console.log(error)
        }
    }

    registrationHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCdRbDIMWfdBhiz4vDKysQA6Tr57f2DpOM', authData)

            console.log(response.data)
        } catch(error) {
            console.log(error)
        }
    }

    submitHandler = event => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }
 
    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls},
              control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(item => {
            isFormValid = formControls[item].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }



    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() { 
        return (
        <div className='Auth'>
            <div>
                <h1>Авторизация</h1>

                <form className='AuthForm' onSubmit={this.submitHandler}>
                    
                    {this.renderInputs()}

                    <Button 
                    type='success_btn' 
                    onClick={this.loginHandler}
                    disabled={!this.state.isFormValid}
                    >
                    Войти
                    </Button>
                    
                    <Button
                    type='primary_btn' 
                    onClick={this.registrationHandler}
                    disabled={!this.state.isFormValid}
                    >
                    Регистрация
                    </Button>
                </form>
            </div>
        </div>
        )
    }
}
 
export default Auth

