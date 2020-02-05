import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Flex, Box } from 'common/components/base';
// import CloseIcon from '@material-ui/icons/Close';
import * as R from 'ramda';

const tabLabels = R.path(['label']);
const tabPanels = R.path(['panel']);

const TabContainer = ({
  tabMembers,
  tabActiveIndex,
  setActiveTabIndex,
  // tabData,
}) => {
  const handleChange = (e, newValue) => {
    e.preventDefault();
    setActiveTabIndex(newValue);
  };

  return (
    <Flex width={1} flexDirection="column">
      <Box>
        <Tabs
          value={tabActiveIndex}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {tabMembers.map((label, idx) => (
            <Tab
              label={tabLabels(label)}
              // icon={<CloseIcon onClick={() => console.log('close')} />}
              id={idx}
            />
          ))}
        </Tabs>
      </Box>
      {tabMembers.map((panel, idx) => (
        <Box hidden={tabActiveIndex !== idx}>{tabPanels(panel)}</Box>
      ))}
    </Flex>
  );
};

TabContainer.propTypes = {
  tabMembers: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      panel: PropTypes.element,
    })
  ),
  tabActiveIndex: PropTypes.number,
  setActiveTabIndex: PropTypes.func,
  // tabData: PropTypes.array,
};

TabContainer.defaultProps = {
  tabMembers: [],
  tabActiveIndex: 0,
  setActiveTabIndex: () => {},
  // tabData: [],
};

export default TabContainer;
