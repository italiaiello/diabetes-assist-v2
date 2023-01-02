import { shallow } from 'enzyme';
import React  from 'react';
import StartScreen from './StartScreen';

let route = ""

const mockOnRouteChange = (newRoute) => {
    route = newRoute;
}

describe('StartScreen.js', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<StartScreen onRouteChange={mockOnRouteChange} />)
  })

  it('expects to render StartScreen component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('expects route to change on click', () => {
    wrapper.find('[className="formButton"]').simulate('click')
    expect(route).toEqual('signin')
  })

}) 