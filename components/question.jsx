import Answer from "./answer";
import ProgressBar from "./progress_bar";

export default function Question({
  onSkipAnswer,
  questions,
  answers,
  answerSelected,
  selected,
  onSelectAnswer,
}) {
  return (
    <div id="questions">
      <ProgressBar timeout={10000} onTimeout={onSkipAnswer} />
      <h2>{questions}</h2>
      <Answer
        answers={answers}
        answerSelected={answerSelected}
        selected={selected}
        onSelectAnswer={onSelectAnswer}
      />
    </div>
  );
}
