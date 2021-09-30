import React from "react"
import './AnswersItem.css'

const AnswersItem = props => {
    return (
        <li className='AnswersItem'>
            { props.answer.text }
        </li>
    )
}

export default AnswersItem
