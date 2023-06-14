import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Checkbox,
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

const SignInForm = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Box bg="white" p={6} rounded="md" w={64}>
      <Formik
        initialValues={{
          email: "",
          password: "",
          rememberMe: false,
        }}
        onSubmit={(values) => {
          setIsLoading(true);

          accountsService
            .createEmailSession(values)
            .then((resp) => {
              // Save session id on session storage
              sessionStorage.setItem("name", resp.providerUid);
              sessionStorage.setItem("sessionId", resp.$id);

              navigate("/quiz", { replace: true });
            })
            .catch((error) => {
              // Show user a toast for invalid request
              toast({
                position: "top",
                title: "Error logging into your account.",
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
        validationSchema={loginSchema}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl
                isInvalid={!!errors.email && touched.email}
                isRequired
              >
                <FormLabel htmlFor="email">Email Address</FormLabel>
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
              <Field
                as={Checkbox}
                id="rememberMe"
                name="rememberMe"
                colorScheme="purple"
              >
                Remember me
              </Field>
              <Button w="full" type="submit" mt="auto" variant="primary">
                Sign in
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default SignInForm;
