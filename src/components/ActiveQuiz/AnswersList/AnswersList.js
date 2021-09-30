import React from "react"
import './AnswersList.css'
import AnswersItem from "./AnswersItem/AnswersItem"

const AnswersList = props => (
    <ul className='AnswersList'>
        { props.answers.map((answer, index) => {
            return (
                <AnswersItem 
                key={index}
                answer={answer}
                />
            )
        })}
    </ul>
)

export default AnswersList
