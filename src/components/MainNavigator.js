import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import * as R from 'ramda';

import { Flex, Text, List, ListItem, ListItemText } from 'common/components/base';
import { locationRootPath } from 'common/utils/location';

const navPath = R.path(['link']);
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
    &:hover {
      color: lightgreen
    };
    ${active && 
      css`
        color: white;
        background-color:green;
        `
    };
    ${index === 0 &&
      css`
        margin-left: 0px;
      `}
  `;

const MainNavigator = ({
  logoText,
  navs,
  navSpacing,
  navigate,
  location,
  contentWidth,
}) => {
  const isLocationRootPath = R.compose(
    R.equals,
    locationRootPath
  )(location);
  return (
    <Flex width={1} height="60px" bg="#0e1726" justifyContent="center">
      <Flex
        css={css`
          width: ${contentWidth};
          padding: 0 2em 0 2em;  
          align-items: center;
          background: lightblue;
          justify-content: space-between;
          
        `}
      >
        <Flex alignItems="center" justifyContent="center" paddingY="20px" width={1/8} height="60px">
          <Text fontSize={2} fontWeight="bold" color="white">
            {logoText}
          </Text>
        </Flex>
        <Flex width={4/8} height="60px">
          <List  css={css`
              flex: 1;
              display: flex;
              flex-direction: row;
              padding: 0;
              width: 100%;
            `
          }>
          {navs.map((nav, idx) => (
            <ListItem button 
              onClick={()=>navigate(navPath(nav))}
              css={navButtonStyle({
                active: isLocationRootPath(navPath(nav)),
              })}
            >
              <ListItemText primary={navName(nav)} />
            </ListItem>
          ))}
          </List>
        </Flex>
        <Flex alignItems="center" justifyContent="center" padding="20px" width={1/8} height="60px">
          <button  type="button">
            <Text fontSize={2} fontWeight="bold" color="white">
              Account
            </Text>
          </button>
        </Flex>
        
      </Flex>
    </Flex>
  );
};

MainNavigator.propTypes = {
  logoText: PropTypes.string,
  navs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
    })
  ),
  navSpacing: PropTypes.string,
  navigate: PropTypes.func,
  location: PropTypes.oneOfType([PropTypes.object]),
  contentWidth: PropTypes.string,
};

MainNavigator.defaultProps = {
  logoText: 'App',
  navs: [],
  navSpacing: '24px',
  navigate: () => {},
  location: { pathname: '' },
  contentWidth: '960px',
};

export default MainNavigator;
