import renderer from 'react-test-renderer';

import React from 'react';
import App from './App';

it('renders without crashing', () => {
  const hello = 5;
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
  expect(hello).toEqual(4);
});
