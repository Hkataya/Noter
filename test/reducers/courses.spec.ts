import courses from '../../app/reducers/entities/courses';
import { ADD_COURSE, REMOVE_COURSE } from '../../app/actions/courses';

jest.mock('../../app/db/CourseRepository', () => ({
  __esModule: true,
  default: 'mockedDefaultExport',
  namedExport: jest.fn()
}));

describe('courses', () => {
  it('should handle ADD_COURSE', () => {
    expect(
      courses(
        {},
        {
          type: ADD_COURSE,
          payload: { title: 'test', description: 'test', id: '123' }
        }
      )
    ).toMatchSnapshot();
  });

  it('should handle REMOVE_COURSE', () => {
    expect(
      courses(
        {
          '123': { title: 'test', description: 'test', id: '123' }
        },
        {
          type: REMOVE_COURSE,
          payload: '123'
        }
      )
    ).toMatchSnapshot();
  });
});
