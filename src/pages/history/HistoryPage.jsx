import { Container, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { quizesService } from "services";
import OldQuizCard from "components/pure/oldQuizCard";

const HistoryPage = () => {
  const [oldQuizes, setOldQuizes] = useState([]);

  useEffect(() => {
    quizesService.getAllQuizes().then(setOldQuizes).catch(console.error);
  }, []);

  return (
    <Container my={20} maxW="container.lg">
      <Heading size="lg" color="text" mt={10}>
        All your quizes
      </Heading>

      {oldQuizes.length > 0 ? (
        <OldQuizCard oldQuizes={oldQuizes}></OldQuizCard>
      ) : (
        <p>No old quizes available</p>
      )}
    </Container>
  );
};

export default HistoryPage;
