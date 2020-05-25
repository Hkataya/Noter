/* eslint react/jsx-props-no-spreading: off */
import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import CourseCard from '../../app/components/CourseCard/CourseCard';
import Button from '../../app/components/Button/Button';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const actions = {
    removeCourse: spy(),
    directToCoursePage: spy()
  };
  const component = shallow(
    <CourseCard
      id="100"
      title="test"
      description="test"
      sections={[]}
      {...actions}
    />
  );

  return {
    component,
    actions,
    button: component.find(Button)
  };
}

describe('CourseCard component', () => {
  it('should match exact snapshot', () => {
    const { actions } = setup();
    const courseCard = (
      <div>
        <Router>
          <CourseCard
            id="100"
            title="test"
            description="test"
            sections={[]}
            {...actions}
          />
        </Router>
      </div>
    );
    const tree = renderer.create(courseCard).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(' Watch button should call directToCoursePage', () => {
    const { button, actions } = setup();
    button.simulate('click');
    expect(actions.directToCoursePage.called).toBe(true);
  });
});
