import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { actions as authActions } from '../data/reducers/auth';
import { Auth } from 'aws-amplify';

import {
  Flex,
  Text,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from 'common/components/base';
import SubMenuNavigator from './SubMenuNavigator';

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
      color: lightgreen;
    }
    ${active &&
      css`
        color: white;
        background-color: green;
      `}
    ${index === 0 &&
      css`
        margin-left: 0px;
      `}
  `;

const MainNavigator = ({
  logoText,
  navs,
  navigate,
  subNavs,
  location,
  contentWidth,
  logout,
}) => {
  const [open, setOpen] = React.useState(false);
  const [subMenu, setSubMenu] = React.useState([]);
  const [activeMenuIndex, setActiveMenu] = React.useState('');
  const isLocationRootPath = R.equals(activeMenuIndex);

  const handleClick = (nav, idx) => {
    const sub = R.filter(R.propEq('menu', navName(nav)));
    const subMenus = sub(subNavs);
    setActiveMenu(idx);
    if (subMenus.length > 0) {
      setSubMenu(sub(subNavs)[0].subMenu);
      setOpen(true);
    } else {
      setSubMenu([]);
      setOpen(false);
    }
  };

  const clickLogout = () => {
    Auth.signOut({ global: true })
      .then(() => logout())
      .catch(err => console.log(err));
  };

  return (
    <Flex
      width={1}
      eight="60px"
      bg="#0e1726"
      justifyContent="center"
      flexDirection="column"
    >
      <Flex
        css={css`
          width: ${contentWidth};
          padding: 0 2em 0 2em;
          align-items: center;
          background: lightblue;
          justify-content: space-between;
        `}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          paddingY="20px"
          width={1 / 8}
          height="60px"
        >
          <Text fontSize={2} fontWeight="bold" color="white">
            {logoText}
          </Text>
        </Flex>
        <Flex width={4 / 8} height="60px">
          <List
            css={css`
              flex: 1;
              display: flex;
              flex-direction: row;
              padding: 0;
              width: 100%;
            `}
          >
            {navs.map((nav, idx) => (
              <ListItem
                key={navName(nav)}
                button
                onClick={() => handleClick(nav, idx)}
                css={navButtonStyle({
                  active: isLocationRootPath(idx),
                })}
              >
                <ListItemText
                  primary={navName(nav)}
                  css={css`
                    flex: inherit;
                    margin: 0;
                  `}
                />
              </ListItem>
            ))}
          </List>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          padding="20px"
          width={1 / 8}
          height="60px"
        >
          <button type="button" onClick={() => clickLogout()}>
            <Text fontSize={2} fontWeight="bold" color="white">
              Logout
            </Text>
          </button>
        </Flex>
      </Flex>
      <Flex>
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          css={css`
            width: 100%;
          `}
        >
          <SubMenuNavigator
            navs={subMenu}
            navigate={navigate}
            location={location}
          />
        </Collapse>
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
      link: PropTypes.string,
    })
  ),
  subNavs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
      link: PropTypes.string,
    })
  ),
  navigate: PropTypes.func,
  location: PropTypes.oneOfType([PropTypes.object]),
  contentWidth: PropTypes.string,
};

MainNavigator.defaultProps = {
  logoText: 'App',
  navs: [],
  subNavs: [],
  navigate: () => {},
  location: { pathname: '' },
  contentWidth: '960px',
};

const mapDispachToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.logoutRequest()),
  };
};

export default connect(
  null,
  mapDispachToProps
)(MainNavigator);
