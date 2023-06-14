import { useState, useEffect } from "react";

import { Text, Button, Container, Stack } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { questionsService } from "services";
import Stepper from "components/pure/stepper";

const Questions = ({ maxQuestion, onFinish }) => {
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

    if (currResponses.length === maxQuestion) {
      onFinish(questionsResponsed);
      return;
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
    <Container mt={20} maxWidth="container.sm">
      <Stepper step={questionsResponsed.length} max={maxQuestion} mb={6} />

      <Text fontWeight="semibold" fontSize="xl" my={4}>
        {question.Description}
      </Text>

      <Container>
        <Stack direction="row" align="stretch">
          <Button
            width="80px"
            value="yes"
            onClick={handleResponse}
            variant="secondary"
          >
            Yes
          </Button>
          <Button
            width="80px"
            value="no"
            onClick={handleResponse}
            variant="secondary"
          >
            No
          </Button>
          <Button
            width="80px"
            value="skip"
            onClick={handleResponse}
            variant="secondary"
          >
            Skip
          </Button>
        </Stack>
      </Container>
    </Container>
  );
};

Questions.propTypes = {
  maxQuestion: PropTypes.number.isRequired,
  onFinish: PropTypes.func.isRequired,
};

export default Questions;
