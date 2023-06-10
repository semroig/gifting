import { Formik, Field } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";

const InitialQuestions = () => {
  const quizDataSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    age: Yup.string(),
    gender: Yup.string().required("Gender is required"),
  });

  return (
    <Box bg="white">
      <Formik
        initialValues={{
          name: "",
          age: "",
          gender: "",
        }}
        onSubmit={() => {
          // TO DO
          console.log("do something");
        }}
        validationSchema={quizDataSchema}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <VStack>
              <FormControl isInvalid={!!errors.name && touched.name}>
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
              <FormControl isInvalid={!!errors.gender && touched.gender}>
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
              <Button w="full" type="submit" mt="auto">
                Start the quiz
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default InitialQuestions;
