import PropTypes from "prop-types";
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
  WrapItem,
  Wrap,
  CardFooter,
} from "@chakra-ui/react";

const OldQuizCards = ({ oldQuizes }) => {
  return (
    <Wrap spacing="30px" justify="center" mt={10} mb={5}>
      {oldQuizes.map((oldQuiz) => {
        return (
          <WrapItem key={oldQuiz.$id}>
            <Card variant="outline" px="3">
              <CardHeader>
                <Heading size="sm"> Quiz for:</Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="4xl">{oldQuiz.Name}</Text>
              </CardBody>
              <CardFooter>
                <Button variant="secondary">View results</Button>
              </CardFooter>
            </Card>
          </WrapItem>
        );
      })}
    </Wrap>
  );
};

OldQuizCards.propTypes = {
  oldQuizes: PropTypes.isRequired,
};

export default OldQuizCards;
