import React from 'react';
import { render } from 'test-utils';
import { curry } from 'ramda';

import App from '../App';

/* eslint-disable react/jsx-props-no-spreading */
const makeComponent = curry((Compo, props) => <Compo {...props} />);
/* eslint-enable */

const makeApp = makeComponent(App);

test('render default unauthenticated user', () => {
  const { getByTestId, queryByTestId } = render(makeApp({}));
  const unAuthenticated = getByTestId('unauthenticated');
  const authenticated = queryByTestId('authenticated');

  expect(unAuthenticated).not.toBeNull();
  expect(authenticated).toBeNull();
});

test('render custom unauthenticated user', () => {
  const renderUnAuthenticated = () => (
    <strong data-testid="custom-unauthenticated">custom-unauthenticated</strong>
  );
  const props = { renderUnAuthenticated };
  const { getByTestId, queryByTestId } = render(makeApp(props));
  const customUnAuthenticated = getByTestId('custom-unauthenticated');
  const authenticated = queryByTestId('authenticated');

  expect(customUnAuthenticated).not.toBeNull();
  expect(authenticated).toBeNull();
});

test('render default authenticated user', () => {
  const user = { id: '1234' };
  const props = { user };
  const { getByTestId, queryByTestId } = render(makeApp(props));
  const authenticated = getByTestId('authenticated');
  const unAuthenticated = queryByTestId('unauthenticated');

  expect(authenticated).not.toBeNull();
  expect(unAuthenticated).toBeNull();
});

test('render custom authenticated user', () => {
  const user = { id: '1234' };
  const renderAuthenticated = () => (
    <strong data-testid="custom-authenticated">custom-unauthenticated</strong>
  );
  const props = { user, renderAuthenticated };
  const { getByTestId, queryByTestId } = render(makeApp(props));
  const authenticated = getByTestId('custom-authenticated');
  const unAuthenticated = queryByTestId('unauthenticated');

  expect(authenticated).not.toBeNull();
  expect(unAuthenticated).toBeNull();
});
