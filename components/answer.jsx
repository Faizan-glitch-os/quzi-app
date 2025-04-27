import { useRef } from "react";

export default function Answer({
  answers,
  answerSelected,
  selected,
  onSelectAnswer,
}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        let cssClass = "";
        const isSelected = answer === answerSelected;

        if (selected === "answered" && isSelected) {
          cssClass = "selected";
        }

        if ((selected === "correct" || selected === "wrong") && isSelected) {
          cssClass = selected;
        }
        return (
          <li key={answer} className="answer">
            <button onClick={() => onSelectAnswer(answer)} className={cssClass}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
