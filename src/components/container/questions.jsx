import { useState, useEffect } from 'react';
import { Text, Button, Flex, Container, Heading } from "@chakra-ui/react";

import { questionsService } from "services";

const Questions = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [question, setQuestion] = useState(null);

    // Counter state to track question number
    const [count, setCount] = useState(1);

    const handleResponse = (event) => {
        const response = event.target.value
        console.log({response}) // do something with response
        getRandomQuestion()

        // Add +1 to counter (reflects on progress bar)
        setCount((count) => count + 1);
    }

    const getRandomQuestion = async () => {
        setIsLoading(true)

        questionsService.getRandomQuestion()
            .then(setQuestion)
            .catch(console.error)
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getRandomQuestion()
    }, [])

    if(isLoading) return <p>Loading...</p>
    if(!question) return <p>No questions</p>

    return (
        <Container maxWidth="container.sm">
            <Heading size="lg">Question number { count }</Heading>

            <Text fontWeight="semibold" fontSize="xl" my={4}>
                {question.Description}
            </Text>
            
            <Flex flexDir="column" align="center" gap={2}>
                <Button width="80px" value='yes' onClick={handleResponse}>Yes</Button>
                <Button width="80px" value="no" onClick={handleResponse}>No</Button>
                <Button width="80px" value="skip" onClick={handleResponse}>Skip</Button>
            </Flex>
        </Container>
    );
}

export default Questions;