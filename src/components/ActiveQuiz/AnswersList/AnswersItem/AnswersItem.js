import React from "react"
import './AnswersItem.css'

const AnswersItem = props => {
    return (
        <li className='AnswersItem' onClick={() => props.onAnswerClick(props.answer.id)}>
            { props.answer.text }
        </li>
    )
}

export default AnswersItem
