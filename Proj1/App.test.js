import React from 'react';
import App from './App';
//import App from './src/compoents/home/Home'

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
