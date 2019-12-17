import React from 'react';
import { css } from '@emotion/core';
import { Flex } from 'common/components/base';

const Setting = props => {
  const { children } = props;

  const contentContainerStyle = css`
    padding: 1em;
    width: 100%;
    }
  `;

  // Wrapping <div> tag for child in nest react/router.Problem of flex element
  // https://github.com/reach/router/issues/145
  return (
    children &&
    React.cloneElement(children, {
      className: 'flex-1',
      children: React.Children.map(children.props.children, child => {
        return React.cloneElement(child);
      }),
    })
  );
};

export default Setting;
