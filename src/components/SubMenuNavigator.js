import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import * as R from 'ramda';

import { navigate } from '@reach/router';
import { Flex, List, ListItem, ListItemText } from 'common/components/base';
import { locationPath } from 'common/utils/location';

const navPath = R.path(['path']);
const navName = R.path(['name']);
const navButtonStyle = ({ active = false, index = 0, navSpacing = '24px' }) =>
  css`
    font: inherit;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 14px;
    color: red;
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    margin-left: ${navSpacing};
    max-width: 15em;
    &:hover {
      color: lightgreen;
    }
    ${active &&
      css`
        color: white;
        background-color: gray;
        pointer-events: none;
      `}
    ${index === 0 &&
      css`
        margin-left: 0px;
      `}
  `;
const SubMenuNavigator = ({ navs, location }) => {
  // const isLocationRootPath = R.compose(
  //   R.equals,
  //   locationRootPath
  // )(location);
  const isLocationPath = R.compose(
    R.equals,
    locationPath
  )(location);

  const handleClick = nav => {
    navigate(navPath(nav));
  };
  return (
    <Flex
      width={1}
      height="60px"
      bg="#0e1726"
      justifyContent="center"
      css={css`
        padding: 0 2em 0 2em;
        align-items: center;
        background: green;
        justify-content: space-between;
      `}
    >
      <Flex width={1} height="60px">
        <List
          css={css`
            flex: 1;
            display: flex;
            flex-direction: row;
            padding: 0 20em;
            width: 100%;
          `}
        >
          {navs.map((nav, idx) => (
            <ListItem
              key={navName(nav)}
              button
              onClick={() => handleClick(nav, idx)}
              css={navButtonStyle({
                active: isLocationPath(navPath(nav)),
              })}
            >
              <ListItemText
                primary={navName(nav)}
                css={css`
                  flex: inherit;
                  margin: 0 auto;
                `}
              />
            </ListItem>
          ))}
        </List>
      </Flex>
    </Flex>
  );
};

SubMenuNavigator.propTypes = {
  navs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
    })
  ),
  // navigate: PropTypes.func,
  location: PropTypes.oneOfType([PropTypes.object]),
};

SubMenuNavigator.defaultProps = {
  navs: [],
  // navigate: () => {},
  location: { pathname: '' },
};

export default SubMenuNavigator;
