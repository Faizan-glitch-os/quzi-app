import { useCallback, useState } from "react";
import quizCompleteImg from "../src/assets/quiz-complete.png";

import QUESTION from "../src/questions";
import Question from "./question";
import Result from "./result";

export default function Quiz() {
  const [selectedAnswer, setSelectedAnswer] = useState([]);

  const activeQuestionIndex = selectedAnswer.length;
  const quizComplete = selectedAnswer.length === QUESTION.length;

  const handleSelectedAnswer = useCallback(function handleSelectedAnswer(
    selectedAnswer
  ) {
    setSelectedAnswer((previousAnswers) => {
      return [...previousAnswers, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectedAnswer(null),
    [handleSelectedAnswer]
  );

  return quizComplete ? (
    <Result answersList={selectedAnswer} />
  ) : (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        currentQuestionIndex={activeQuestionIndex}
        onSkipAnswer={handleSkipAnswer}
        onSelectAnswer={handleSelectedAnswer}
      />
    </div>
  );
}
