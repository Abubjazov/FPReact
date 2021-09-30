import React from "react"
import './ActiveQuiz.css'
import AnswersList from "./AnswersList/AnswersList"

const ActiveQuiz = props => (
    <div className='ActiveQuiz'>
        <p className='Question'>
            <span>
                <strong>{props.questionNumber}.</strong>&nbsp;{props.question}
            </span>
            <small>{props.questionNumber} из {props.quizLength}</small>
        </p>

        <AnswersList 
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
        />
    </div>
)

export default ActiveQuiz
