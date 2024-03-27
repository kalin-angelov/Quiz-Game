import styles from '../Quiz/Quiz.module.css';

import useSound from 'use-sound';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Card } from '../Card/Card';
import { CardTrue } from '../CardTrue/CardTrue';
import { CardFalse } from '../CardFalse/CardFalse';
import { removeUser } from '../../service/userService';


export const Quiz = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const questions = location.state.questions;
    const user = location.state.user;

    const [showCard, setShowCard] = useState(false);
    const [isTrueCard, setIsTrueCard] = useState(false);
    const [isFalseCard, setIsFalseCard] = useState(false);
    const [questionCounter, setQuestionCounter] = useState(0);
    const [points, setPoints] = useState(0);
    const [givenAnswers, setGivenAnswers] = useState([]);
    
    const [victorySound] = useSound('/sounds/Correct-sound.mp3');
    const [defeatSound] = useSound('/sounds/Wrong-sound.mp3');
    const [waitingSound] = useSound('/sounds/Waiting-sound.wav')

    let result = {
        question: questions[questionCounter].question,
        img: questions[questionCounter].img,
        answerA: questions[questionCounter].answerOne,
        answerB: questions[questionCounter].answerTwo,
        answerC: questions[questionCounter].answerThree,
        answerD: questions[questionCounter].answerFour,
        correctAnswer: questions[questionCounter].correctAnswer,
    };

    const questionAndPointControl = (questions) => {
        if (questions.length - 1 === questionCounter) {
            setQuestionCounter(questions.length - 1);
        } else {
            setQuestionCounter(questionCounter => ++questionCounter);
        }
    };

    const onClickResult = (event) => {
        event.preventDefault();
        setQuestionCounter(0);
        navigate('/result', {
            state:
            {
                user,
                points,
                questions,
                givenAnswers
            }
        });
    };

    const onClickIsTrue = (event) => {
        const answer = event.target.name;
        result = {...result, givenAnswer: answer};

        setShowCard(true);
        waitingSound();
        setTimeout(() => {
            setShowCard(false);
            victorySound();
            setIsTrueCard(true);
            setPoints(points => points + 10);
            setGivenAnswers(givenAnswer => [...givenAnswer, result]);
        }, 2000);

        setTimeout(() => {
            setIsTrueCard(false);
            questionAndPointControl(questions);
        }, 4500);

    };

    const onClickIsFalse = (event) => {
        const answer = event.target.name;
        result = {...result, givenAnswer: answer};

        setShowCard(true);
        waitingSound();
        setTimeout(() => {
            setShowCard(false);
            defeatSound();
            setIsFalseCard(true);
            setGivenAnswers(givenAnswer => [...givenAnswer, result]);
        }, 2000);

        setTimeout(() => {
            setIsFalseCard(false);
            questionAndPointControl(questions);
        }, 4500);
    };

    const onCLickQuit = async (event) => {
        event.preventDefault();

        try {
            await removeUser(user._id);

            navigate('/');
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <>
            {showCard && <Card />}
            {isTrueCard && <CardTrue />}
            {isFalseCard && <CardFalse />}

            <div className={styles.quiz}>
                <div className={styles.headlineAndPoints}>
                    {questions.length - 1 !== questionCounter && <p> {user.username}: {points}/{questions.length - 1}0</p>}
                    {isTrueCard && <p>+10</p>}
                </div>
                 
                <div className={styles.question}>
                    <p>{questions[questionCounter].question}</p>
                    <img src={questions[questionCounter].img} alt="someImg" />
                    {questions.length - 1 !== questionCounter ?
                        <div className={styles.answers}>
                            {questions[questionCounter].one === true ?
                                <button onClick={onClickIsTrue} name={questions[questionCounter].answerOne}>
                                    {questions[questionCounter].answerOne}
                                </button>
                                :
                                <button onClick={onClickIsFalse} name={questions[questionCounter].answerOne}>
                                    {questions[questionCounter].answerOne}
                                </button>
                            }

                            {questions[questionCounter].two === true ?
                                <button onClick={onClickIsTrue} name={questions[questionCounter].answerTwo}>
                                    {questions[questionCounter].answerTwo}
                                </button>
                                :
                                <button onClick={onClickIsFalse} name={questions[questionCounter].answerTwo}>
                                    {questions[questionCounter].answerTwo}
                                </button>
                            }

                            {questions[questionCounter].three === true ?
                                <button onClick={onClickIsTrue} name={questions[questionCounter].answerThree}>
                                    {questions[questionCounter].answerThree}
                                </button>
                                :
                                <button onClick={onClickIsFalse} name={questions[questionCounter].answerThree}>
                                    {questions[questionCounter].answerThree}
                                </button>
                            }

                            {questions[questionCounter].four === true ?
                                <button onClick={onClickIsTrue} name={questions[questionCounter].answerFour}>
                                    {questions[questionCounter].answerFour}
                                </button>
                                :
                                <button onClick={onClickIsFalse} name={questions[questionCounter].answerFour}>
                                    {questions[questionCounter].answerFour}
                                </button>
                            }
                        </div>
                        :
                        <div className={styles.result}>
                            <p> {user.username}: {points}/{questions.length - 1}0</p>
                            <button onClick={onClickResult} name={questions[questionCounter].answerOne}>
                                {questions[questionCounter].answerOne}
                            </button>
                        </div>
                    }
                </div>
                
                <button className={styles.quit} onClick={onCLickQuit}><i className="fa-solid fa-circle-xmark"></i></button>
            </div>
        </>
    );
};