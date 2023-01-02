import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { shallow } from 'enzyme';

describe('App.js', () => {
  it('expects to render App component', () => {
    expect(shallow(<App />)).toMatchSnapshot()
  })
}) 
  
