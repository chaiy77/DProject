import React from 'react';
import PropTypes from 'prop-types';

// import { Flex } from '../common/components/base';
import { Flex } from 'common/components/base';

const DefaultAuthenticated = () => (
  <strong data-testid="authenticated">authenticated</strong>
);
const DefaultUnAuthenticated = () => (
  <strong data-testid="unauthenticated">unauthenticated</strong>
);

const App = ({ user, renderAuthenticated, renderUnAuthenticated }) => {
  const renderMain = user ? renderAuthenticated : renderUnAuthenticated;
  // console.log("======= component/App.js =========");
  // console.log(renderMain);
  // console.log("============================")
  return <Flex height="100%">{renderMain()}</Flex>;
};

App.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]),
  renderAuthenticated: PropTypes.func,
  renderUnAuthenticated: PropTypes.func,
};

App.defaultProps = {
  user: null,
  renderAuthenticated: () => <DefaultAuthenticated />,
  renderUnAuthenticated: () => <DefaultUnAuthenticated />,
};

export default App;
