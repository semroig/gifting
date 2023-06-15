import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Questions from "components/container/questions";
import InitialQuestions from "components/container/initialQuestions";

import { quizesService } from "services";
import { realtimeService } from "services";
import { productService } from "services";

import { Client, Databases, Account, ID } from "appwrite";
import { appwriteConfig } from "config";

import ResultsPage from "pages/results/ResultsPage";

const QuizPage = () => {
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState();

  // This function is the nexus between first and second part of quiz
  const next = (data) => {
    setInitialData(data);
  };

  const handleFinishQuiz = async (reponses, yesCat, noCat) => {
    quizesService
      .create(initialData, reponses, yesCat, noCat)
      .then(console.info)
      .catch(console.error);
  };

  useEffect(() => {
    const client = new Client();

    client
      .setEndpoint(appwriteConfig.ENDPOINT)
      .setProject(appwriteConfig.PROJECT_ID);

    const unsubscribe = client.subscribe("documents", (response) => {
      console.log("response realtime");
      console.log(response);

      if (response.payload.Results.length) {
        navigate("/quiz/" + response.payload.$id, { replace: true });
      }
    });
  }, []);

  return (
    <div>
      {initialData ? (
        <Questions maxQuestion={2} onFinish={handleFinishQuiz}></Questions>
      ) : (
        <InitialQuestions next={next}></InitialQuestions>
      )}
    </div>
  );
};

export default QuizPage;
