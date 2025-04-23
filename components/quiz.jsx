import { act, useState } from "react";

import QUESTION from "../src/questions";

export default function Quiz() {
  const [selectedAnswer, setSelectedAnswer] = useState([]);

  const activeQuestionIndex = selectedAnswer.length;

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
          {QUESTION[activeQuestionIndex].answers.map((answer) => {
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
