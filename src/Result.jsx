export default function Result(props) {
    return (
        <div className='result'>
            <p>You scored {props.correctAnswersCount}/5 correct answers</p>
            <button onClick={props.playAgain}>Play again</button>
        </div>
    )
}