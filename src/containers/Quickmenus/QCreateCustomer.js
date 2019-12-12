import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Text, Flex, Box, Button } from 'common/components/base';
import { Label, Input } from 'common/components/form';

const QCreateCustomer = ({ callback }) => {
  const [inputData, setInputData] = useState(null);

  const inputOnChange = e => {
    e.preventDefault();
    console.log('inputData change', e.target.value);
    setInputData(e.target.value);
  };

  const handleClick = () => {
    console.log('handleClick', inputData);
    if (inputData) callback(inputData);
  };
  return (
    <Flex flexDirection="column" width="100%" paddingY="1em">
      <Text> Quick Create Customer </Text>
      <Label> Customer </Label>
      <Input
        placeholder="customer name"
        onChange={e => inputOnChange(e)}
      ></Input>
      <Button onClick={handleClick}> search </Button>
    </Flex>
  );
};

QCreateCustomer.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default QCreateCustomer;
