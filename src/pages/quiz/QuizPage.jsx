import { Flex } from "@chakra-ui/react";

import Questions from "components/container/questions";
import InitialQuestions from "components/container/initialQuestions";

const QuizPage = () => {
  return (
    <Flex height="100%" alignItems="center" pb={20}>
      {/* <Questions></Questions> */}
      <InitialQuestions></InitialQuestions>
    </Flex>
  );
};

export default QuizPage;
