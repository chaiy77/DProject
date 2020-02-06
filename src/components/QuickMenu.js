import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import * as R from 'ramda';

// import { QSearchCustomer } from 'containers/Quickmenus';

import {
  Flex,
  Text,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'common/components/base';

const menuText = R.path(['name']);
const menuContent = R.path(['component']);
// const expansionPanelStyle = css`
//   &.Mui-expanded {
//     margin: 0;
//   }
// `;

const expansionSumStyle = css`
  background-color: lightgray;
  &.MuiExpansionPanelSummary-root {
    height: 56px;
  }
  &.Mui-expanded {
    min-height: 56px;
  }
`;

const QuickMenu = ({ menuList }) => {
  const [expanded, setExpanded] = React.useState('');

  const handleMenuClick = menu => (event, newExpanded) => {
    setExpanded(newExpanded ? menu : false);
  };

  return (
    <Flex flexDirection="column" width={1} bg="#0e1726">
      {menuList.map((menu, idx) => (
        <ExpansionPanel
          key={menuText(menu)}
          expanded={expanded === idx}
          onChange={handleMenuClick(idx)}
        >
          <ExpansionPanelSummary css={expansionSumStyle}>
            <Text>{menuText(menu)}</Text>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>{menuContent(menu)}</ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
      ;
    </Flex>
  );
};
QuickMenu.propTypes = {
  menuList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      component: PropTypes.element,
      key: PropTypes.string,
    })
  ),
};

QuickMenu.defaultProps = {
  menuList: [],
};

export default QuickMenu;
