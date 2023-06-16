import PropTypes from "prop-types";
import { Card, CardBody, Image, WrapItem, Wrap, Text } from "@chakra-ui/react";

const ProductCards = ({ productDocuments }) => {
  return (
    <Wrap spacing="20px" justify="center" mt={10} mb={5}>
      {productDocuments.map((prod) => {
        return (
          <WrapItem key={prod.$id}>
            <Card maxW="240px" variant="filled">
              <CardBody>
                <Image
                  src={prod.image}
                  alt={prod.Description}
                  borderRadius="lg"
                  boxSize="200px"
                />
                <Text size="md" mt={5}>
                  {prod.Description}
                </Text>
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
