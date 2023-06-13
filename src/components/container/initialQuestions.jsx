import { Formik, Field } from "formik";
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Container,
  Heading,
  Text,
} from "@chakra-ui/react";
import * as Yup from "yup";
import PropTypes from "prop-types";

const InitialQuestions = ({ next }) => {
  const quizDataSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    age: Yup.string(),
    gender: Yup.string().required("Gender is required"),
  });

  return (
    <div>
      <Container mt={20} mb={10} maxW="lg">
        <Heading size="md" color="text">
          Before we start, please complete this information about your friend
        </Heading>
        <Text color="text" fontSize="md">
          It will help us in thinking better results for gifting ideas!
        </Text>
      </Container>

      <Container maxW="2xs">
        <Formik
          initialValues={{
            name: "",
            age: "",
            gender: "",
          }}
          onSubmit={(values) => {
            // Call function on father component
            next(values);
          }}
          validationSchema={quizDataSchema}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack>
                <FormControl
                  isInvalid={!!errors.name && touched.name}
                  isRequired
                >
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    type="text"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.age && touched.age}>
                  <FormLabel htmlFor="age">Age</FormLabel>
                  <Field
                    as={Input}
                    id="age"
                    name="age"
                    type="number"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.age}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.gender && touched.gender}
                  isRequired
                >
                  <FormLabel htmlFor="gender">Gender</FormLabel>
                  <Field
                    as={Input}
                    id="gender"
                    name="gender"
                    type="text"
                    variant="filled"
                  ></Field>
                  <FormErrorMessage>{errors.gender}</FormErrorMessage>
                </FormControl>
                <Button w="full" type="submit" mt="auto" variant="secondary">
                  Start the quiz
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

InitialQuestions.propTypes = {
  next: PropTypes.func.isRequired,
};

export default InitialQuestions;
