import { useCallback, useState } from "react";
import quizCompleteImg from "../src/assets/quiz-complete.png";

import QUESTION from "../src/questions";
import ProgressBar from "./progress_bar";

export default function Quiz() {
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [selected, setSelected] = useState("");

  const activeQuestionIndex =
    selected === "" ? selectedAnswer.length : selectedAnswer.length - 1;
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

  const handleSelectedAnswer = useCallback(
    function handleSelectedAnswer(selectedAnswer) {
      setSelected("answered");

      setSelectedAnswer((previousAnswers) => {
        return [...previousAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTION[activeQuestionIndex].answers[0]) {
          setSelected("correct");
        } else {
          setSelected("wrong");
        }

        setTimeout(() => {
          setSelected("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectedAnswer(null),
    [handleSelectedAnswer]
  );

  return (
    <div id="quiz">
      <ProgressBar
        key={activeQuestionIndex}
        timeout={10000}
        onTimeout={handleSkipAnswer}
      />
      <div id="questions">
        <h2>{QUESTION[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            const cssClass = "";
            const isSelected =
              answer === selectedAnswer[selectedAnswer.length - 1];

            if (selected === "answered" && isSelected) {
              cssClass = "selected";
            }

            if (
              (selected === "correct" || selected === "wrong") &&
              isSelected
            ) {
              cssClass = selected;
            }
            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectedAnswer(answer)}
                  className={cssClass}
                >
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
