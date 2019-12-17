import React from 'react';
import PropTypes from 'prop-types';

import { Text, Flex, Button } from 'common/components/base';

const BOLDetail = ({ label, closeMe }) => {
  return (
    <Flex width={1} backgroundColor="gray" paddingY="1em">
      <Text> Detail Bill Of Loading </Text>
      <Button onClick={() => closeMe(label)}> close </Button>
    </Flex>
  );
};

BOLDetail.propTypes = {
  label: PropTypes.string.isRequired,
  closeMe: PropTypes.func,
};

BOLDetail.defaultProps = {
  closeMe: () => {},
};

export default BOLDetail;
