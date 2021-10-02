import React from 'react'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import { createControl } from '../../form/formFramework'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import './QuizCreator.css'

function createOptionControl(number) {
    return createControl({
        label: `Ответ ${number}`,
        errorMessage: 'Поле "Ответ" не может быть пустым',
        id: number
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Поле "Вопрос" не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

class QuizCreator extends React.Component {

    state = {
        quiz: [],
        formControls: createFormControls()
    }

    submitHandler = event => event.preventDefault()

    addQuestionHandler = () => {

    }

    createQuizHandler = () => {

    }

    changeHandler = (value, controlName) => {

    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Auxiliary key={controlName + index}>
                    <Input 
                        key={index}
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />

                    { index === 0 ? <hr /> : null }
                </Auxiliary>            
            )
        })
    }

    render() { 
        return (
        <div className='QuizCreator'>
            <div>
                <h1>Создайте свой тест</h1>

                <form onSubmit={this.submitHandler}>
                    {this.renderControls()}

                    <select></select>

                    <Button
                        type='primary_btn'
                        onClick={this.addQuestionHandler}
                    >
                        Добавить вопрос
                    </Button>

                    <Button
                        type='success_btn'
                        onClick={this.createQuizHandler}
                    >
                        Сохранить тест
                    </Button>
                </form>
            </div>
        </div>
        )
    }
}
 
export default QuizCreator
