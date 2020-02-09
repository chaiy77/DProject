import React from 'react';

const Sell = props => {
  const { children } = props;

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

export default Sell;
