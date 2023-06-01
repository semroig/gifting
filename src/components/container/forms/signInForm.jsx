import { Formik, Field, ErrorMessage } from "formik";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  useToast
} from "@chakra-ui/react";
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { accountsService } from "services";


const SignInForm = () => {

    const navigate = useNavigate();
    const toast = useToast()

    const [isLoading, setIsLoading] = useState(true);

    const loginSchema = Yup.object().shape(
        {
            email: Yup.string()
                    .email('Invalid email format')
                    .required('Email is required'),
            password: Yup.string()
                    .required('Password is required')
        }
    );

    return (
        <Box bg="white" p={6} rounded="md" w={64}>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    rememberMe: false
                }}
                onSubmit={(values) => {
                    setIsLoading(true)

                    accountsService.createAccount(values)
                        .then(() => {
                            console.info
                            navigate("/quiz", { replace: true });
                        })
                        .catch((error) => {
                            console.log(error);
                            toast({
                                position: 'top',
                                title: 'Error creating your account.',
                                description: "Description heree.",
                                status: 'error',
                                duration: 4000,
                                isClosable: true,
                            })
                        })
                        .finally(() => {
                            setIsLoading(false)
                        })


                    // Call createEmailSession service
                    // Redirect to Home
                }}
                validationSchema={ loginSchema }
            >
                {({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4} align="flex-start">
                            <FormControl>
                                <FormLabel htmlFor="email">Email Address</FormLabel>
                                <Field
                                as={Input}
                                id="email"
                                name="email"
                                type="email"
                                variant="filled"
                                />
                                <ErrorMessage name="email" />
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
                                validate={(value) => {
                                    let error;

                                    if (value.length < 6) {
                                    error = "Password must contain at least 6 characters";
                                    }

                                    return error;
                                }}
                                />
                                <ErrorMessage name="password" />
                                <FormErrorMessage>{errors.password}</FormErrorMessage>
                            </FormControl>
                            <Field
                                as={Checkbox}
                                id="rememberMe"
                                name="rememberMe"
                                colorScheme="purple"
                            >
                                Remember me?
                            </Field>
                            <Button w="full" type="submit" mt="auto">
                                Sign in
                            </Button>
                        </VStack>
                    </form>
                )}
            </Formik>
        </Box>
    );
}

export default SignInForm;