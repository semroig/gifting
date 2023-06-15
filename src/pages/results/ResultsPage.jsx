import { useState, useEffect } from "react";
import { Container, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import ProductCards from "components/pure/productCards";
import { productService } from "services";
import { quizesService } from "services";

const ResultsPage = () => {
  let { paramId } = useParams();

  const [resultDocuments, setResultDocuments] = useState([]);
  const [name, setName] = useState();

  useEffect(() => {
    quizesService
      .getAllQuizes()
      .then((quizes) => {
        let realQuiz = {};
        quizes.forEach((element) => {
          if (element.$id == paramId) {
            realQuiz = element;
            setName(element.Name);
          }
        });

        productService
          .getAllProducts()
          .then((prods) => {
            let currDocuments = [];
            prods.forEach((element) => {
              realQuiz.Results.forEach((id) => {
                if (element.$id == id) {
                  currDocuments.push(element);
                }
              });
            });

            setResultDocuments(currDocuments);
          })
          .catch(console.error);
      })
      .catch(console.error);
  }, []);

  return (
    <Container my={20} maxW="container.lg">
      <Heading size="lg" color="text" mt={10}>
        Here are 3 gifting ideas for your friend {name}:
      </Heading>

      {resultDocuments.length > 0 ? (
        <ProductCards productDocuments={resultDocuments}></ProductCards>
      ) : (
        <p>No results available</p>
      )}
    </Container>
  );
};

export default ResultsPage;
