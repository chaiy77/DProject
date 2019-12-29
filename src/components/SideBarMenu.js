import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import * as R from 'ramda';
import { Flex, List, ListItem, ListItemText } from 'common/components/base';
import { locationRootPath } from 'common/utils/location';

const navPath = R.path(['path']);
const navName = R.path(['name']);

const SideBarMenu = ({ navs, navSpacing, navigate, location }) => {
  const isLocationRootPath = R.compose(
    R.equals,
    locationRootPath
  )(location);
  return (
    <Flex width="100%" height="100%" bg="#0e1726" justifyContent="center">
      <Flex
        css={css`
          width: 100%;
          padding: 0;
          background: green;
        `}
      >
        <List
          css={css`
            width: 100%;
            padding: 1em 1.5em;
          `}
        >
          {navs.map((nav, idx) => (
            <ListItem button onClick={() => navigate(navPath(nav))}>
              <ListItemText primary={navName(nav)} />
            </ListItem>
          ))}
        </List>
      </Flex>
    </Flex>
  );
};

SideBarMenu.propTypes = {
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

SideBarMenu.defaultProps = {
  navs: [],
  navSpacing: '5px',
  navigate: () => {},
  location: { pathname: '' },
  contentWidth: '50px',
};

export default SideBarMenu;
