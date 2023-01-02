import { shallow } from 'enzyme';
import React from 'react';
import Emergency from './Emergency';

let route = ""

const mockOnRouteChange = (newRoute) => {
  route = newRoute;
}

describe('Emergency.js', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Emergency onRouteChange={mockOnRouteChange} />)
  })

  it('expects to render Emergency component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('checks that onRouteChange works onClick', () => {
    wrapper.find('[id="cancelCall"]').simulate('click')
    expect(route).toEqual('home')

    route = "chicken"

    wrapper.find('[className="leftArrow"]').simulate('click')
    expect(route).toEqual('home')
  })
}) 