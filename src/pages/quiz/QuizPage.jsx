import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import Questions from "components/container/questions";
import InitialQuestions from "components/container/initialQuestions";

import { quizesService } from "services";
import { realtimeService } from "services";

const QuizPage = () => {
  // const navigate = useNavigate();
  const [initialData, setInitialData] = useState();
  const [unsubscribeFunction, setUnsubscribeFunction] = useState(null);

  // This function is the nexus between first and second part of quiz
  const next = (data) => {
    setInitialData(data);
  };

  const handleFinishQuiz = async (reponses, yesCat, noCat) => {
    await quizesService.create(initialData, reponses, yesCat, noCat);
    // navigate("/quiz/id");

    // // Closes the subscription.
    // unsubscribe();
  };

  useEffect(() => {
    const unsubscribe = realtimeService.updateDocuments();
    setUnsubscribeFunction(unsubscribe);
  }, []);

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
