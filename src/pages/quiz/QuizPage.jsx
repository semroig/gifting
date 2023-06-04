import { Flex } from "@chakra-ui/react";
import Questions from "components/container/questions";

const QuizPage = () => {
  return (
    <Flex height="100%" alignItems="center" pb={20}>
      <Questions></Questions>
    </Flex>
  );
};

export default QuizPage;
