import { useState, useEffect } from 'react';
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
        <div>
            <h2>Question number { count }</h2>

            <p> {question.Description} </p>
            
            <div>
                <button value='yes' onClick={handleResponse}>Yes</button>
                <button value="no" onClick={handleResponse}>No</button>
                <button value="skip" onClick={handleResponse}>Skip</button>
            </div>
        </div>
    );
}

export default Questions;