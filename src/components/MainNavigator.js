import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import * as R from 'ramda';

import { Flex, Text } from 'common/components/base';
import { locationRootPath } from 'common/utils/location';

const navPath = R.path(['path']);
const navName = R.path(['name']);

const navButtonStyle = ({ active = false, index = 0, navSpacing = '24px' }) =>
  css`
    font: inherit;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 14px;
    color: #677387;
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    margin-left: ${navSpacing};
    ${active &&
      css`
        color: white;
      `};
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
          height: 60px;
        `}
      >
        <Flex alignItems="center" justifyContent="center" paddingY="20px">
          <Text fontSize={2} fontWeight="bold" color="white">
            {logoText}
          </Text>
        </Flex>
        <ul
          css={css`
            flex: 1;
            display: flex;
            flex-direction: row;
            align-items: center;
            list-style: none;
            padding: 0;
            margin-left: 80px;
          `}
        >
          {navs.map((nav, idx) => (
            <li key={navName(nav)}>
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
        <Flex alignItems="center" justifyContent="center" paddingY="20px">
          <Text fontSize={2} fontWeight="bold" color="white">
            Account
          </Text>
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
