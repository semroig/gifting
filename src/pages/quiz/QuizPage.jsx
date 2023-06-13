import { Container } from "@chakra-ui/react";
import { useState } from "react";

import Questions from "components/container/questions";
import InitialQuestions from "components/container/initialQuestions";

const QuizPage = () => {
  const [initialData, setInitialData] = useState();

  // This function is the nexus between first and second part of quiz
  const next = (data) => {
    setInitialData(data);
  };

  return (
    <div>
      {initialData ? (
        <Questions initialData={initialData}></Questions>
      ) : (
        <InitialQuestions next={next}></InitialQuestions>
      )}
    </div>
  );
};

export default QuizPage;
