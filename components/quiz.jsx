import { useCallback, useState } from "react";
import quizCompleteImg from "../src/assets/quiz-complete.png";

import QUESTION from "../src/questions";
import ProgressBar from "./progress_bar";
import Answer from "./answer";

export default function Quiz() {
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  const activeQuestionIndex =
    selectedState === "" ? selectedAnswer.length : selectedAnswer.length - 1;
  const quizComplete = selectedAnswer.length === QUESTION.length;

  if (quizComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="trophy image" />
        <h2>quiz completed</h2>
      </div>
    );
  }

  const handleSelectedAnswer = useCallback(
    function handleSelectedAnswer(selectedAnswer) {
      setSelectedState("answered");

      setSelectedAnswer((previousAnswers) => {
        return [...previousAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTION[activeQuestionIndex].answers[0]) {
          setSelectedState("correct");
        } else {
          setSelectedState("wrong");
        }

        setTimeout(() => {
          setSelectedState("");
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
        <Answer
          answers={QUESTION[activeQuestionIndex].answers}
          answerSelected={selectedAnswer[activeQuestionIndex] - 1}
          selected={selectedState}
          onSelectAnswer={handleSelectedAnswer}
        />
      </div>
    </div>
  );
}
