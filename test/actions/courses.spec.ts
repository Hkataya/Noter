import * as actions from '../../app/actions/courses';

describe('actions', () => {
  it('should create add course action', () => {
    Date.now = jest.fn(() => 123456789);
    expect(
      actions.addCourse({ title: 'test', description: 'test', sections: [] })
    ).toMatchSnapshot();
  });

  it('should create remove course action', () => {
    expect(actions.removeCourse('123456789')).toMatchSnapshot();
  });
});
