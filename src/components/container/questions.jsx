import { useState, useEffect } from 'react';
import { questionsService } from "services";

const Questions = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [question, setQuestion] = useState(null);

    const handleResponse = (event) => {
        const response = event.target.value
        console.log({response}) // do something with response
        getRandomQuestion()
    }

    const getRandomQuestion = async () => {
        setIsLoading(true)

        questionsService.getRandomQuestion()
            .then(setQuestion)
            .catch(console.error)
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        getRandomQuestion()
    }, [])

    if(isLoading) return <p>Loading...</p>
    if(!question) return <p>No questions</p>

    return (
        <div>
            <p> {question.Description} </p>
            
            <div>
                <button value='yes' onClick={handleResponse}>Yes</button>
                <button value="no" onClick={handleResponse}>No</button>
                <button value="maybe" onClick={handleResponse}>Maybe</button>
            </div>
        </div>
    );
}

export default Questions;