import React from 'react';
import { shallow } from 'enzyme';
import {render, fireEvent} from '@testing-library/react'
import Health from './Health';


let route = ""

const onRouteChange = (newRoute) => {
  route = newRoute;
}

describe('Health.js', () => {

  let wrapper;
  

  beforeEach(() => {
    wrapper = shallow(<Health onRouteChange={onRouteChange} />);
  });

  it('renders', () => {
    expect(wrapper).not.toBeNull()
    expect(wrapper.find('Modal')).toEqual({})
  })

  it('expects modal component to appear', () => {
    wrapper.find('[id="change"]').simulate('click')
    expect(wrapper.find('Modal')).not.toBeNull()
  })

  it('expects route to change on click', () => {
    
    wrapper.find('[id="home"]').simulate('click')
    expect(route).toEqual('home')

    route = "chicken"

    wrapper.find('[className="leftArrow"]').simulate('click')
    expect(route).toEqual('home')
  })
})