import React from 'react';
import PropTypes from 'prop-types';
import { Text, Flex, Button } from 'common/components/base';

const BOLList = ({ setActiveTabIndex, createNewTab }) => {
  const setTabIndex = i => {
    console.log('setTabIndex', i);
    setActiveTabIndex(i);
  };

  const newTab = t => {
    console.log('newTab');
    createNewTab(t);
  };

  return (
    <Flex width={1} backgroundColor="gray" paddingY="1em">
      <Text> Bill of Loading List </Text>
      <Button onClick={() => setTabIndex(1)}> New BOL </Button>
      <Button onClick={() => newTab('test')}> Detail BOL </Button>
    </Flex>
  );
};

BOLList.propTypes = {
  setActiveTabIndex: PropTypes.func,
  createNewTab: PropTypes.func,
};

BOLList.defaultProps = {
  setActiveTabIndex: () => {},
  createNewTab: () => {},
};

export default BOLList;
