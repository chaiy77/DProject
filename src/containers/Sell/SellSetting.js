import React from 'react';
import { Text, Flex, Box } from 'common/components/base';

const SellSetting = () => {
  return (
    <Flex
      flexDirection="row"
      width="100%"
      height="100%"
      backgroundColor="gray"
      paddingY="1em"
    >
      <Box width={1} height="100%" minHeight="640px">
        <Text> Sell- Setting </Text>
      </Box>
    </Flex>
  );
};

export default SellSetting;
