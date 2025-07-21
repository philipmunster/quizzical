import he from "he"
import { useState } from 'react'
import { clsx } from 'clsx'

export default function Question(props) {

    const decodedQuestion = he.decode(props.question)

    const allAnswers = props.incorrectAnswers.toSpliced(props.correctAnswerIndex, 0, props.correctAnswer)
    const answerElements = allAnswers.map((answer, index) => {
        const buttonClass = clsx({
            'option-choosen': (props.choosenAnswerIndex === index && props.isCorrect === null),
            'correct-answer': (props.correctAnswerIndex === index && props.isCorrect !== null),
            'wrong-answer': (props.choosenAnswerIndex === index && props.isCorrect === false)
        })
        return (
            <button 
                key={index} 
                id={index} 
                className={buttonClass} 
                onClick={props.handleAnswerChoosen}
                disabled={props.isCorrect !== null && true}
            >
                {he.decode(answer)}
            </button>
        )
    })

    return (
        <div className="question">        
            <h3>{decodedQuestion}</h3>
            <div className="choices" id={props.id}>
                {answerElements}
            </div>
        </div>
    )
}