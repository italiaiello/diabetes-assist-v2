import { shallow } from 'enzyme';
import React  from 'react';
import TodoList from './TodoList';

let route = ""

describe('TodoList.js', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TodoList />)
  })

  it('expects to render TodoList component', () => {
    expect(wrapper).toMatchSnapshot()
  })

}) 