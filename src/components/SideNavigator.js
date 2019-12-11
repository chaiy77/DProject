import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import * as R from 'ramda';

import { Flex, Text } from 'common/components/base';
import { locationRootPath } from 'common/utils/location';

const navPath = R.path(['path']);
const navName = R.path(['name']);

const navButtonStyle = ({ active = false, index = 0, navSpacing = '0px' }) =>
  css`
    font: inherit;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 14px;
    width: 90%;
    color: #677387;
    background-color:red;
    border: none;
    cursor: pointer;
    outline: none;
    margin-top: ${navSpacing};
    &:hover{
        color: lightgreen
    }
    ${active &&
      css`
        color: white;
      `};
  `;

const SideNavigator = ({
  navs,
  navSpacing,
  navigate,
  location,
 
}) => {
  const isLocationRootPath = R.compose(
    R.equals,
    locationRootPath
  )(location);
  return (
    <Flex width="100%" height="100%"  bg="#0e1726" justifyContent="center">
      <Flex
        css={css`
          width: 100%;
          padding: 0;
          background: green;
        `}
      >
        {/* <Flex alignItems="center" justifyContent="center" paddingY="20px">
          <Text fontSize={2} fontWeight="bold" color="white">
            {logoText}
          </Text>
        </Flex> */}
        <ul
          css={css`
            flex: 1;
            display: inline-block;
            flex-direction: column;
            text-align: center;
            align-items: center;
            list-style: none;
            padding: 0;
            margin: 2em auto;
            width:100%;
          `}
        >
          {navs.map((nav, idx) => (
            <li key={navName(nav)} width="100%">
              <button
                type="button"
                onClick={() => navigate(navPath(nav))}
                css={navButtonStyle({
                  navSpacing,
                  index: idx,
                  active: isLocationRootPath(navPath(nav)),
                })}
              >
                <Text fontWeight="bold">{navName(nav)}</Text>
              </button>
            </li>
          ))}
        </ul>
        
      </Flex>
    </Flex>
  );
};

SideNavigator.propTypes = {
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

SideNavigator.defaultProps = {
  navs: [],
  navSpacing: '5px',
  navigate: () => {},
  location: { pathname: '' },
  contentWidth: '50px',
};

export default SideNavigator;
