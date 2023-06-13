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

const HomePage = () => {
  useEffect(() => {
    quizesService.getAllQuizes().then(console.info).catch(console.error);
  }, []);

  return (
    <Container my={20} maxW="container.lg">
      <Heading size="xl" color="text">
        Hi John
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
              <Button variant="primary" size="lg" mt={5}>
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

      <Button variant="secondary" size="md" mt={5}>
        All my quizes
      </Button>
    </Container>
  );
};

export default HomePage;
