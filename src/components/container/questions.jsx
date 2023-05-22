import { React, useState, useEffect } from 'react';
import { Client, Databases, ID } from 'appwrite';


const Questions = () => {

    const client = new Client();
    const databases = new Databases(client);

    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('646be96ac195499e31c0');

    // Con esto se pueden crear registros!
    const promise = databases.createDocument(
        '646beb350730365f9314', '646beb48cf58113e0f44', ID.unique(), {
            Description: "prueba"
        }
    );

    promise.then(function (response) {
        console.log(response); // Success
        // setQuestions(response.documents);
    }, function (error) {
        console.log(error); // Failure
    });

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
            cosas
        </div>
    );
}

export default Questions;