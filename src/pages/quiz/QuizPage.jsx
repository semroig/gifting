import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import Questions from "components/container/questions";
import InitialQuestions from "components/container/initialQuestions";

import { quizesService } from "services";

const QuizPage = () => {
  // const navigate = useNavigate();
  const [initialData, setInitialData] = useState();

  // This function is the nexus between first and second part of quiz
  const next = (data) => {
    setInitialData(data);
  };

  const handleFinishQuiz = async (reponses) => {
    await quizesService.create(initialData, reponses);
    // navigate("/quiz/id");
  };

  return (
    <div>
      {initialData ? (
        <Questions maxQuestion={3} onFinish={handleFinishQuiz}></Questions>
      ) : (
        <InitialQuestions next={next}></InitialQuestions>
      )}
    </div>
  );
};

export default QuizPage;
