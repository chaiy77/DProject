import React from 'react';
import PropTypes from 'prop-types';

import { Text, Flex, Button } from 'common/components/base';

const ProductDetail = ({ label, closeMe }) => {
  return (
    <Flex width={1} backgroundColor="gray" paddingY="1em">
      <Text> Detail of Product </Text>
      <Button onClick={() => closeMe(label)}> close </Button>
    </Flex>
  );
};

ProductDetail.propTypes = {
  label: PropTypes.string.isRequired,
  closeMe: PropTypes.func,
};

ProductDetail.defaultProps = {
  closeMe: () => {},
};

export default ProductDetail;
