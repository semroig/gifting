import { useFormik } from "formik";
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
  Select,
} from "@chakra-ui/react";
import * as Yup from "yup";
import PropTypes from "prop-types";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  age: Yup.number(),
  gender: Yup.string().required("Gender is required"),
});

const initialValues = {
  name: "",
  age: 0,
  gender: "",
};

const InitialQuestions = ({ next }) => {
  const handleSubmit = () => {
    next(formik.values);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <Container mt={20} mb={10} maxW="lg">
        <Heading size="md" color="text">
          Please complete this info about your friend
        </Heading>
        <Text color="text" fontSize="md">
          This helps us with thinking better results for gifting ideas!
        </Text>
      </Container>

      <Container maxW="2xs">
        <form onSubmit={handleSubmit}>
          <VStack>
            <FormControl
              isInvalid={!!formik.errors.name && formik.touched.name}
              isRequired
            >
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                name="name"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
              />
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.age && formik.touched.age}>
              <FormLabel htmlFor="age">Age</FormLabel>
              <Input
                id="age"
                name="age"
                type="number"
                variant="filled"
                onChange={formik.handleChange}
              />
              <FormErrorMessage>{formik.errors.age}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!formik.errors.gender && formik.touched.gender}
              isRequired
            >
              <FormLabel htmlFor="gender">Gender</FormLabel>
              <Select
                placeholder="Select an option"
                name="gender"
                id="gender"
                variant="filled"
                onChange={formik.handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>

              <FormErrorMessage>{formik.errors.gender}</FormErrorMessage>
            </FormControl>

            <div>
              <Button w="full" type="submit" mt={5} variant="secondary">
                Start the quiz
              </Button>
            </div>
          </VStack>
        </form>
      </Container>
    </div>
  );
};

InitialQuestions.propTypes = {
  next: PropTypes.func.isRequired,
};

export default InitialQuestions;
