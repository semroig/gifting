import { Formik, Field } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { accountsService } from "services";

const SignUpForm = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);

  // Yup validations:
  // we need to add more (amount of chars in password...)
  const signUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Password confirmation is required"),
  });

  return (
    <Box bg="white" p={6} rounded="md" w={64}>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmation: "",
        }}
        onSubmit={(values) => {
          setIsLoading(true);

          accountsService
            .createAccount(values)
            .then((resp) => {
              // Save session id on session storage
              sessionStorage.setItem("name", resp.name);
              sessionStorage.setItem("sessionId", resp.$id);

              navigate("/quiz", { replace: true });
            })
            .catch((error) => {
              // Show user a toast for invalid request
              toast({
                position: "top",
                title: "Error creating your account.",
                description: error.message,
                status: "error",
                duration: 4000,
                isClosable: true,
              });
            })
            .finally(() => {
              setIsLoading(false);
            });
        }}
        validationSchema={signUpSchema}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl isInvalid={!!errors.name && touched.name} isRequired>
                <FormLabel htmlFor="name">First name</FormLabel>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  type="text"
                  variant="filled"
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.email && touched.email}
                isRequired
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  variant="filled"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.password && touched.password}
                isRequired
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                  variant="filled"
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.confirmation && touched.confirmation}
                isRequired
              >
                <FormLabel htmlFor="confirmation">Repeat password</FormLabel>
                <Field
                  as={Input}
                  id="confirmation"
                  name="confirmation"
                  type="password"
                  variant="filled"
                />
                <FormErrorMessage>{errors.confirmation}</FormErrorMessage>
              </FormControl>
              <Button w="full" type="submit" mt="auto" variant="primary">
                Sign up
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default SignUpForm;
