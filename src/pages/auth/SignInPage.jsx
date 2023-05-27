import { Link } from "react-router-dom";
import { Container, Grid, GridItem, Heading, Button, Flex } from "@chakra-ui/react";

const SigInPage = () => {
  return (
    <Grid minH="100vh" templateRows="1fr">
      <Container maxW="container.lg" py={20} h="100%">
        <Grid templateColumns="repeat(2, 1fr)" gap={20} h="100%">
          <Flex flexDir="column">
            <Heading mb={10}>Sign in</Heading>

            formulario

            <Button as={Link} to="/quiz" w="100%" mt="auto">
              Sign in
            </Button>
          </Flex>

          <GridItem bg="gray.200" />
        </Grid>
      </Container>
    </Grid>
  );
};

export default SigInPage;
