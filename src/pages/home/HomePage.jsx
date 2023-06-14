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
  Center,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { quizesService } from "services";
import OldQuizCard from "components/pure/oldQuizCard";

const HomePage = () => {
  const [oldQuizes, setOldQuizes] = useState([]);
  const name = sessionStorage.getItem("name");

  useEffect(() => {
    quizesService.getAllQuizes().then(setOldQuizes).catch(console.error);
  }, []);

  return (
    <Container my={20} maxW="container.lg">
      <Heading size="xl" color="text">
        Hi {name}
      </Heading>
      <Card size="md" bg="secondary" p={10} mt={10}>
        <Stack direction="row" spacing="100px">
          <Box>
            <CardHeader>
              <Heading size="2xl" color="text">
                Start a new quiz?
              </Heading>
            </CardHeader>
            <CardBody>
              <Text color="text" fontSize="xl">
                Go ahead! You can do as much as you want for free
              </Text>
              <Button
                variant="primary"
                size="lg"
                mt={5}
                as={Link}
                to="/quiz/questions"
              >
                New quiz →
              </Button>
            </CardBody>
          </Box>
          <Image
            src="src/assets/globo.png"
            alt="Dan Abramov"
            boxSize="220px"
            objectFit="cover"
          />
        </Stack>
      </Card>
      <Heading size="lg" color="text" mt={10}>
        Your last quizes
      </Heading>

      {oldQuizes.length > 0 ? (
        <OldQuizCard oldQuizes={oldQuizes.slice(0, 4)}></OldQuizCard>
      ) : (
        <p>No old quizes available</p>
      )}

      <Center>
        <Button variant="primary" size="lg" mt={5} as={Link} to="/quiz/history">
          All my quizes
        </Button>
      </Center>
    </Container>
  );
};

export default HomePage;
