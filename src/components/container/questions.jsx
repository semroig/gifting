import { React, useState, useEffect } from 'react';
import { Client, Databases, ID } from 'appwrite';


const Questions = () => {

    const [questionRecords, setQuestionRecords] = useState([]);
    const [count, setCount] = useState(0)

    const client = new Client();
    const databases = new Databases(client);

    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('646be96ac195499e31c0');

    // On component mount (an ONLY once), I retrieve all the questions available
    useEffect(() => {

        // Get the array of questions
        const promise = databases.listDocuments('646beb350730365f9314', '646e0add6b18024c13be');

        // Store the array on the questionRecords State
        promise.then(function (response) {
            console.log(response); // Success
            setQuestionRecords(response.documents);
        }, function (error) {
            console.log(error); // Failure
        });

    }, []);

    // const [questions, setQuestions] = useState([]);

    // useEffect(() => {
    //     const promise = client.subscribe(['collections.questions.documents'], (data) => {
                
    //     });

    //     promise.then(function (response) {
    //         console.log(response); // Success
    //         setQuestions(response.documents);
    //     }, function (error) {
    //         console.log(error); // Failure
    //     });

    //   }, [questions]);

    return (
        <div>
            <h3>Question number {count}</h3>

            {/* <p>{ questionRecords }</p> */}

            {questionRecords.map(pregunta => (
                <div key={ pregunta['$id'] }>
                    <p>{ pregunta['Description'] }</p>
                </div>
            ))}

            <button onClick={() => setCount((count) => count + 1)}>
                Next quesion
            </button>
        </div>
    );
}

export default Questions;