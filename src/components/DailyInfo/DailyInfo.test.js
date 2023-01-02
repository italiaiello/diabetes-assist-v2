import React from "react";
import { shallow } from 'enzyme';
import DailyInfo from './DailyInfo';
import toJson from 'enzyme-to-json';

const mockOnRouteChange = (newRoute) => {
  route = newRoute;
}

const mockUserEmail = 'fred@gmail.com';
const mockUserName = 'Freddy'

const mockTodoTasks = [
    'Book stuff',
    'Plan meals',
    'Talk to Cybel'
]

const mockProps = {
    onRouteChange: mockOnRouteChange,
    userEmail: mockUserEmail,
    userName: mockUserName,
    todoTasks: mockTodoTasks
}

describe("DailyInfo", () => {
    let wrapper;

    beforeAll(() => wrapper = shallow(<DailyInfo {...mockProps} />))

    it('renders', () => {
        expect(toJson(wrapper)).toMatchSnapshot()
    })
});