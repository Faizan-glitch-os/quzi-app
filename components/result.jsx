import quizCompleteImg from "../src/assets/quiz-complete.png";

import QUESTIONS from "../src/questions";

export default function Result({ answersList }) {
  const skippedAnswers = answersList.filter((answer) => answer === null);
  const correctAnswers = answersList.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );
  const skippedPercent = Math.round(
    (skippedAnswers.length / answersList.length) * 100
  );
  const correctPercent = Math.round(
    (correctAnswers.length / answersList.length) * 100
  );
  const wrongPercent = 100 - skippedPercent - correctPercent;

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="trophy image" />
      <h2>Quiz Completed</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedPercent}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctPercent}%</span>
          <span className="text">correctly answered</span>
        </p>
        <p>
          <span className="number">{wrongPercent}%</span>
          <span className="text">incorrectly answered</span>
        </p>
      </div>
      <ol>
        {answersList.map((answer, index) => {
          let cssClass = "user-answer";

          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
