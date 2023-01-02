import React from 'react';
import { shallow } from 'enzyme';
import SelectTime from './SelectTime';

describe('SelectTime.js', () => {

  let wrapper;
  
  const mockProfessionalId = 1

  beforeEach(() => {
    wrapper = shallow(<SelectTime professionalId={mockProfessionalId} />);
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot()
  })

})