// Chakra + formik??
// Chakra + formik??
import { Formik, Field, ErrorMessage } from "formik";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack
} from "@chakra-ui/react";
import * as Yup from 'yup';

// Need to use this on the onsubmit event
// import { Link } from "react-router-dom";

const SignUpForm = () => {

    const signUpSchema = Yup.object().shape(
        {
            email: Yup.string()
                    .email('Invalid email format')
                    .required('Email is required'),
            password: Yup.string()
                    .required('Password is required'),
            confirmation: Yup.string()
                    .oneOf(
                        [Yup.ref("password")],
                        "Passwords must match"
                    ).required('Password confirmation is required')
        }
    );

    return (
        <Box bg="white" p={6} rounded="md" w={64}>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    confirmation: ""
                }}
                onSubmit={(values) => {
                    alert(JSON.stringify(values, null, 2));

                    // Redirect to Home
                }}
                validationSchema={ signUpSchema }
            >
                {({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4} align="flex-start">
                            <FormControl isInvalid={!!errors.email && touched.email}>
                                <FormLabel htmlFor="email">Email Address</FormLabel>
                                <Field
                                    as={Input}
                                    id="email"
                                    name="email"
                                    type="email"
                                    variant="filled"
                                />
                                {/* <ErrorMessage name="email" /> */}
                                <FormErrorMessage>{errors.email}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.password && touched.password}>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <Field
                                    as={Input}
                                    id="password"
                                    name="password"
                                    type="password"
                                    variant="filled"
                                />
                                {/* <ErrorMessage name="password" /> */}
                                <FormErrorMessage>{errors.password}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.confirmation && touched.confirmation}>
                                <FormLabel htmlFor="confirmation">Repeat password</FormLabel>
                                <Field
                                    as={Input}
                                    id="confirmation"
                                    name="confirmation"
                                    type="password"
                                    variant="filled"
                                />
                                {/* <ErrorMessage name="confirmation" /> */}
                                <FormErrorMessage>{errors.confirmation}</FormErrorMessage>
                            </FormControl>
                            <Button w="full" type="submit" mt="auto">
                                Sign up
                            </Button>
                        </VStack>
                    </form>
                )}
            </Formik>
        </Box>
    );
}

export default SignUpForm;