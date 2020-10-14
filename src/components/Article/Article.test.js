import React from "react";
import { shallow } from "enzyme";
import Article from "./Article";
import { compose } from "redux";

describe('<Article />', () => {
    it('should render without errors', () => {
        const component = shallow(<Article />);
        const wrapper = component.find('.Article');
        expect(wrapper.length).toBe(1);
    });

    it('should handle title clicks', () => {
        const mockClickDone = jest.fn();
        const component = shallow(<Article clicked={mockClickDone}
            title={'TEST_TITLE'}/>);
        const wrapper = component.find('.title');
        wrapper.simulate('click');
        expect(mockClickDone).toHaveBeenCalledTimes(1);
    });
})