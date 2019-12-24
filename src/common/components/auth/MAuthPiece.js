/*
  References: https://github.com/aws-amplify/amplify-js/blob/master/packages/aws-amplify-react/src/Auth/AuthPiece.jsx
*/

import React from 'react';
import PropTypes from 'prop-types';

export default class MAuthPiece extends React.Component {
  constructor(props) {
    super(props);
    this.inputs = {};
    this.isHidden = true;
    this.validAuthStates = [];
  }

  // extract username from authData
  usernameFromAuthData = () => {
    const { authData } = this.props;
    // console.log("====== MAuthenPiece: usernameFormAuthData = ", authData);
    if (!authData) {
      return '';
    }

    let username = '';
    if (typeof authData === 'object') {
      // user object
      username = authData.user ? authData.user.username : authData.username;
    } else {
      // username is string
      username = authData;
    }

    return username;
  };

  errorMessage = err => {
    if (typeof err === 'string') {
      return err;
    }
    return err.message ? err.message : JSON.stringify(err);
  };

  triggerAuthEvent = event => {
    const { authState, onAuthEvent } = this.props;
    if (onAuthEvent) {
      onAuthEvent(authState, event);
    }
  };

  changeState = (state, data) => {
    const { onStateChange } = this.props;
    onStateChange(state, data);

    this.triggerAuthEvent({
      type: 'stateChange',
      data: state,
    });
  };

  error = err => {
    this.triggerAuthEvent({
      type: 'error',
      data: this.errorMessage(err),
    });
  };

  handleInputChange = evt => {
    this.inputs = this.inputs || {};
    const { name, value, type, checked } = evt.target;
    const checkType = ['radio', 'checkbox'].includes(type);
    this.inputs[name] = checkType ? checked : value;
    this.inputs.checkedValue = checkType ? value : null;
  };

  showComponent = () => {};

  render() {
    const { authState } = this.props;
    if (!this.validAuthStates.includes(authState)) {
      return null;
    }

    if (this.isHidden) {
      const { track } = this.props;
      this.inputs = {};
      track();
    }

    this.isHidden = false;

    return this.showComponent();
  }
}

MAuthPiece.propTypes = {
  authData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  authState: PropTypes.string,
  onAuthEvent: PropTypes.func,
  onStateChange: PropTypes.func,
  track: PropTypes.func,
};

MAuthPiece.defaultProps = {
  authData: null,
  authState: null,
  onAuthEvent: () => {},
  onStateChange: () => {},
  track: () => {},
};
