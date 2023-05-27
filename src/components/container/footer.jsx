import { Container, Box, Grid, Flex, Text } from "@chakra-ui/react";
import Logo from "components/pure/logo";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <Box as="footer" pt={2}>
      <Container maxW="container.lg" pb={4} pt={2} borderTop="1px solid black">
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <Text fontSize="sm">{currentYear} Privacy - Terms</Text>

          <Flex justifyContent="center">
            <Logo />
          </Flex>
        </Grid>
      </Container>
    </Box>
  );
}
