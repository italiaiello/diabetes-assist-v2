import React from "react";
import { shallow } from 'enzyme';
import Navigation from './Navigation';

let route = ""

const mockOnRouteChange = (newRoute) => {
  route = newRoute;
}

const mockProps = {
    onRouteChange: mockOnRouteChange
}

describe("useDataApi", () => {
    let wrapper;

    beforeAll(() => wrapper = shallow(<Navigation {...mockProps} />))

    it('renders', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it("correctly changes route value when clicked", () => {
        // Navigating to health section
        wrapper.find("[id='healthIcon']").simulate('click');
        expect(route).toEqual('health')

        // Navigating to appointment section
        wrapper.find("[id='apptIcon']").simulate('click');
        expect(route).toEqual('appointment')

        // Navigating to meal section
        wrapper.find("[id='mealIcon']").simulate('click');
        expect(route).toEqual('meal')

        // Navigating to appointment section
        wrapper.find("[id='cybelIcon']").simulate('click');
        expect(route).toEqual('cybel')

        // Navigating to appointment section
        wrapper.find("[id='emergencyIcon']").simulate('click');
        expect(route).toEqual('emergency')
    })
});