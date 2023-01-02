import { shallow } from 'enzyme';
import React from 'react';
import Cybel from './Cybel';

let route = ""

const mockOnRouteChange = (newRoute) => {
  route = newRoute;
}

describe('Cybel.js', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Cybel onRouteChange={mockOnRouteChange} />)
  })

  it('expects to render Cybel component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('checks that onRouteChange works onClick', () => {
    wrapper.find('[id="homeCybel"]').simulate('click')
    expect(route).toEqual('home')

    route = "chicken"

    wrapper.find('[className="leftArrow"]').simulate('click')
    expect(route).toEqual('home')
  })
}) 