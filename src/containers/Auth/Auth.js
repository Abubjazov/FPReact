import React from 'react'
import './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'

class Auth extends React.Component {
    loginHandler = () => {

    }

    registrationHandler = () => {
        
    }

    submitHandler = (event) => {
        event.preventDefault()
    }

    render() { 
        return (
        <div className='Auth'>
            <div>
                <h1>Авторизация</h1>

                <form className='AuthForm' onSubmit={this.submitHandler}>
                    
                    <Input 
                    label="Email"
                    />
                    <Input 
                    label="Пароль"
                    />

                    <Button 
                    type='success_btn' 
                    onClick={this.loginHandler}
                    >
                    Войти
                    </Button>
                    
                    <Button
                    type='primary_btn' 
                    onClick={this.registrationHandler}
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

