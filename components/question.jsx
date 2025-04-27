import { useState } from "react";
import QUESTIONS from "../src/questions";

import Answer from "./answer";
import ProgressBar from "./progress_bar";

export default function Question({
  onSkipAnswer,
  currentQuestionIndex,
  onSelectAnswer,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }
  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectedAnswer(answer) {
    setAnswer({ selectedAnswer: answer, isCorrect: null });

    setTimeout(() => {
      setAnswer(
        {
          selectedAnswer: answer,
          isCorrect: answer === QUESTIONS[currentQuestionIndex].answers[0],
        },
        1000
      );

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    });
  }

  let selectedState = "";

  if (answer.selectedAnswer && answer.isCorrect) {
    selectedState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    selectedState = "answered";
  }

  return (
    <div id="question">
      <ProgressBar
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={selectedState}
      />
      <h2>{QUESTIONS[currentQuestionIndex].text}</h2>
      <Answer
        answers={QUESTIONS[currentQuestionIndex].answers}
        answerSelected={answer.selectedAnswer}
        selected={selectedState}
        onSelectAnswer={handleSelectedAnswer}
      />
    </div>
  );
}
