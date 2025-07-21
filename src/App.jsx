import { useState, useEffect } from 'react'
import StartScreen from './StartScreen'
import Question from './Question.jsx'
import blueBlob from './assets/blue-blob.png'
import yellowBlob from './assets/yellow-blob.png'
import Result from './Result.jsx'

function App() {
  //state values
  const [renderQuiz, setRenderQuiz] = useState(false)
  const [questions, setQuestions] = useState([])

  // derived values
  const allQuestionsAnswered = questions.length > 0 && questions.every(question => (question.questionAnswered === true))
  const correctAnswersCount = questions.filter(question => question.isCorrect).length
  const revealSummary = questions.length > 0 && questions.every(question => (question.isCorrect !== null))

  function toggleQuiz() {
    setRenderQuiz(prev => !prev)
  }

  useEffect(() => {
    if (renderQuiz) { // only fetch if quiz should render
      fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
        .then( res => {
          if (!res.ok) {
            throw Error("Something went wrong")
          } else {
            return res.json()
          }
        })
        .then( data => {
          setQuestions(data.results.map(question => {
            return {
              ...question,
              'correctAnswerIndex': Math.floor(Math.random() * 4),
              'choosenAnswerIndex': null,
              'questionAnswered': false,
              'isCorrect': null
            }
          }))
        })
        .catch( err => console.log(err))
    }
  },[renderQuiz])

  // create the question components one at a time
  const questionsElements = questions.map((question, index) => {
    return (
      <Question 
        key={question.question}
        id={"question-"+index}
        question={question.question}
        incorrectAnswers={question.incorrect_answers}
        correctAnswer={question.correct_answer}
        correctAnswerIndex={question.correctAnswerIndex}
        choosenAnswerIndex={question.choosenAnswerIndex}
        questionAnswered={question.questionAnswered}
        handleAnswerChoosen={handleAnswerChoosen}
        isCorrect={question.isCorrect}
      />
    )
  })

  function handleAnswerChoosen(e) {
    const questionIndex = Number(e.target.parentElement.id.split("-")[1])
    const answerIndex = Number(e.target.id)
    setQuestions(prev => prev.map((prevQuestion, index) => {
      if (index === questionIndex) {
        return {
          ...prevQuestion,
          'choosenAnswerIndex': answerIndex,
          'questionAnswered': true
        }
      } else {
        return prevQuestion
      }
    }))
  }

  function handleCheckAnsweres() {
    setQuestions(prev => prev.map(prevQuestion => {
      return {
        ...prevQuestion,
        'isCorrect': prevQuestion.correctAnswerIndex === prevQuestion.choosenAnswerIndex
      }
    }))
  }

  function playAgain() {
    setQuestions([])
    setRenderQuiz(false)
  }

  return (
    <main>
      <img src={blueBlob} className="blob blue-blob" alt=""></img>
      <img src={yellowBlob} className="blob yellow-blob" alt=""></img>

      {!renderQuiz && <StartScreen toggleQuiz={toggleQuiz}/>}
      {renderQuiz && 
        <section className='quiz'>
          {questionsElements}
          {(allQuestionsAnswered === true && !revealSummary) ? 
            <button onClick={handleCheckAnsweres}>Check answers</button> :
            revealSummary ? 
            <Result correctAnswersCount={correctAnswersCount} playAgain={playAgain}/> :
            null
          }

        </section>
      }
    </main>
  )
}

export default App


// const questionIndex = e.target.parentElement.id.split("-")
//     const answerIndex = e.target.id
//     if (questions[questionIndex[1]].correctAnswerIndex === Number(answerIndex)) {
//       console.log('Correct!!!!')
//     }