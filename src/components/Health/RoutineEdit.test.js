import React from 'react';
import { shallow } from 'enzyme';
import RoutineEdit from './RoutineEdit';


let route = ""

const onRouteChange = (newRoute) => {
  route = newRoute;
}

const setRoutine = (routine) => {
    mockProps.routine = routine
}

const mockProps = {
    onRouteChange: onRouteChange,
    toggleModal: jest.fn(),
    daysOfWeek: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    isProfileOpen: false,
    routine: [
        ['Metformin', 'Insulin'],
        ['Metformin', 'Insulin'],
        ['Metformin', 'Insulin'],
        ['Metformin', 'Insulin'],
        ['Metformin', 'Insulin'],
        ['Metformin', 'Insulin'],
        ['Metformin', 'Insulin'],
    ],
    setRoutine: setRoutine
}



describe('RoutineEdit.js', () => {

  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<RoutineEdit { ...mockProps } />);
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('runs function on click', () => {
    const saveButton = wrapper.find('[className="modal-save"]')
    saveButton.simulate('click')
    
    expect(saveButton.prop('currentRoutine')).toEqual(mockProps.routine)
  })
})