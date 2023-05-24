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

    // // Con esto se pueden crear registros!
    // const promise = databases.createDocument(
    //     '646beb350730365f9314', '646beb48cf58113e0f44', ID.unique(), {
    //         Description: "prueba"
    //     }
    // );

    // useEffect(() => {

    //     const promise = databases.listDocuments('646beb350730365f9314', '646e0add6b18024c13be');

    //     promise.then(function (response) {
    //         console.log(response); // Success
    //         setQuestionRecords(response.documents);
    //     }, function (error) {
    //         console.log(error); // Failure
    //     });

    // }, [count]);

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

            <p>{ questionRecords }</p>

            {questionRecords.map((pregunta) => (
                <p key={ pregunta['$id'] }>{ pregunta['Description'] }</p>
            ))}

            <button onClick={() => setCount((count) => count + 1)}>
                Next quesion
            </button>
        </div>
    );
}

export default Questions;