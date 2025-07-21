import blueBlob from './assets/blue-blob.png'
import yellowBlob from './assets/yellow-blob.png'

export default function StartScreen(props) {
    return (
        <section className="start-screen">
            <h1>A super fun quiz</h1>
            <p>Made by Philip Münster-Hansen</p>
            <button onClick={props.toggleQuiz}>Start quiz</button>
        </section>
    )
}