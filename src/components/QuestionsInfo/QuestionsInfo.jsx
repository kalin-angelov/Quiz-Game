import styles from "./scss/QuestionInfo.module.css"

export const QuestionsInfo = ({
    questionAndAnswer
}) => {
    
    const correctOrNot = (answer) => {
        if (questionAndAnswer.givenAnswer === answer && questionAndAnswer.correctAnswer === "All") {
            return { background: "green" };
        } else if (answer === questionAndAnswer.correctAnswer && questionAndAnswer.givenAnswer === questionAndAnswer.correctAnswer) {
            return { background: "green" };
        } else if (answer === questionAndAnswer.correctAnswer) {
            return { background: "green" };
        } else if (answer === questionAndAnswer.givenAnswer && answer !== questionAndAnswer.correctAnswer) {
            return { background: "red" };
        } else {
            return { background: "rgb(255, 187, 0)" };
        }
    }

    return (
        <article className={styles.questionsInfo}>
            <h1 className={styles.question}>{questionAndAnswer.question}</h1>
            <figure>
                <img src={questionAndAnswer.img} alt="someImg" />
            </figure>
            <div className={styles.answers}>
                <button
                    name={questionAndAnswer.answerA}
                    style={correctOrNot(questionAndAnswer.answerA)}
                >{questionAndAnswer.answerA}</button>
                <button
                    name={questionAndAnswer.answerB}
                    style={correctOrNot(questionAndAnswer.answerB)}
                >{questionAndAnswer.answerB}</button>
                <button
                    name={questionAndAnswer.answerC}
                    style={correctOrNot(questionAndAnswer.answerC)}
                >{questionAndAnswer.answerC}</button>
                <button
                    name={questionAndAnswer.answerD}
                    style={correctOrNot(questionAndAnswer.answerD)}
                >{questionAndAnswer.answerD}</button>
            </div>
        </article>
    )
};