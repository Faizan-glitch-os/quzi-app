import QuizLogoImg from "../src/assets/quiz-logo.png";

export default function Header() {
  return (
    <header>
      <img src={QuizLogoImg} alt="logo of quiz app" />
      <h1>React Quiz</h1>
    </header>
  );
}
