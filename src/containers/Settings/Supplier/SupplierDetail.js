import React from 'react';
import PropTypes from 'prop-types';

import { Text, Flex, Button } from 'common/components/base';

const SupplierDetail = ({ label, closeMe }) => {
  return (
    <Flex width={1} backgroundColor="gray" paddingY="1em">
      <Text> Detail of Supplier </Text>
      <Button onClick={() => closeMe(label)}> close </Button>
    </Flex>
  );
};

SupplierDetail.propTypes = {
  label: PropTypes.string.isRequired,
  closeMe: PropTypes.func,
};

SupplierDetail.defaultProps = {
  closeMe: () => {},
};

export default SupplierDetail;
