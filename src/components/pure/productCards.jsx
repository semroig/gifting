import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Heading,
  Image,
  WrapItem,
  Wrap,
  Center,
} from "@chakra-ui/react";

const ProductCards = ({ productDocuments }) => {
  return (
    <Wrap spacing="20px" justify="center" mt={10} mb={5}>
      {productDocuments.map((prod) => {
        return (
          <WrapItem key={prod.$id}>
            <Card variant="outline" maxW="sm">
              <CardBody>
                <Center>
                  <Image
                    src={prod.image}
                    alt={prod.Description}
                    borderRadius="lg"
                    boxSize="350px"
                  />
                </Center>

                {/* <Heading size="md">{prod.Description}</Heading> */}
                <Heading size="md" mt={5}>
                  {prod.Description}
                </Heading>
              </CardBody>
            </Card>
          </WrapItem>
        );
      })}
    </Wrap>
  );
};

ProductCards.propTypes = {
  productDocuments: PropTypes.isRequired,
};

export default ProductCards;
