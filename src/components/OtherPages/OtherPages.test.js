import { shallow } from 'enzyme';
import React  from 'react';
import OtherPages from './OtherPages';

describe('OtherPages.js', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<OtherPages />)
  })

  it('expects to render TodoList component', () => {
    expect(wrapper).toMatchSnapshot()
  })

})