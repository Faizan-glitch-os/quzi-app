import { act, useState } from "react";
import quizCompleteImg from "../src/assets/quiz-complete.png";

import QUESTION from "../src/questions";

export default function Quiz() {
  const [selectedAnswer, setSelectedAnswer] = useState([]);

  const activeQuestionIndex = selectedAnswer.length;
  const quizComplete = selectedAnswer.length === QUESTION.length;

  if (quizComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="trophy image" />
        <h2>quiz completed</h2>
      </div>
    );
  }

  const shuffledAnswers = QUESTION[activeQuestionIndex].answers;
  shuffledAnswers.sort(() => Math.random() - 0.5);

  function handleSelectedAnswer(selectedAnswer) {
    setSelectedAnswer((previousAnswers) => {
      return [...previousAnswers, selectedAnswer];
    });
  }

  return (
    <div id="quiz">
      <div id="questions">
        <h2>{QUESTION[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            return (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectedAnswer(answer)}>
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
