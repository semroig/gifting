import {
  Container,
  Card,
  CardBody,
  Heading,
  Text,
  CardHeader,
  Button,
  Stack,
  Image,
  Box,
} from "@chakra-ui/react";
import { useEffect } from "react";

import { quizesService } from "services";

const HistoryPage = () => {
  useEffect(() => {
    quizesService.getAllQuizes().then(console.info).catch(console.error);
  }, []);

  return (
    <Container my={20} maxW="container.lg">
      <Heading size="lg" color="text" mt={10}>
        All your quizes
      </Heading>
    </Container>
  );
};

export default HistoryPage;
