import React from 'react';
import { Text, Flex, Box } from 'common/components/base';

const Reports = () => {
  return (
    <Flex
      flexDirection="row"
      width="100%"
      height="100%"
      backgroundColor="gray"
      paddingY="1em"
    >
      <Box width={1 / 6} height="100%" minHeight="640px">
        <Text> Report </Text>
      </Box>
    </Flex>
  );
};

export default Reports;
