import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Text, Button, Flex, Container } from "@chakra-ui/react";

import { questionsService } from "services";
import Stepper from "components/pure/stepper";

const MAX_QUESTIONS = 3; // must be a prop

const Questions = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState(null);
  const [questionsResponsed, setQuestionsResponsed] = useState([]);

  const handleResponse = (event) => {
    const response = event.target.value;

    const currResponses = questionsResponsed;

    if (response !== "skip") {
      currResponses.push({
        question: question,
        response: response === "true",
      });

      setQuestionsResponsed(currResponses);
    }

    if (currResponses.length === MAX_QUESTIONS) {
      return navigate("/quiz/results");
    }

    const questionsIds = currResponses.map((response) => {
      return response.question.$id;
    });

    getRandomQuestion(questionsIds);
  };

  const getRandomQuestion = (questionsIds = []) => {
    setIsLoading(true);

    questionsService
      .getRandomQuestion(questionsIds)
      .then(setQuestion)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getRandomQuestion();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!question) return <p>No questions</p>;

  return (
    <Container maxWidth="container.sm">
      <Stepper step={questionsResponsed.length} max={MAX_QUESTIONS} mb={6} />

      <Text fontWeight="semibold" fontSize="xl" my={4}>
        {question.Description}
      </Text>

      <Flex flexDir="column" align="center" gap={2}>
        <Button width="80px" value="yes" onClick={handleResponse}>
          Yes
        </Button>
        <Button width="80px" value="no" onClick={handleResponse}>
          No
        </Button>
        <Button width="80px" value="skip" onClick={handleResponse}>
          Skip
        </Button>
      </Flex>
    </Container>
  );
};

export default Questions;
