import courses from '../../app/reducers/entities/courses';
import { ADD_COURSE, REMOVE_COURSE } from '../../app/actions/courses';
import { ADD_SECTION } from '../../app/actions/sections';

const initialState = {
  '100': {
    id: '100',
    title: 'Test',
    description: 'Test',
    sections: []
  }
};

describe('reducers', () => {
  describe('courses', () => {
    it('should handle ADD_COURSE', () => {
      expect(
        courses(initialState, {
          type: ADD_COURSE,
          payload: {
            id: '101',
            title: 'Test',
            description: 'Test',
            sections: []
          }
        })
      ).toMatchSnapshot();
    });
    it('should handle REMOVE_COURSE', () => {
      expect(
        courses(initialState, {
          type: REMOVE_COURSE,
          payload: '101'
        })
      ).toMatchSnapshot();
    });

    it('should handle ADD_SECTION', () => {
      expect(
        courses(initialState, {
          type: ADD_SECTION,
          payload: {
            sectionId: '201',
            courseId: '100',
            sectionData: {
              id: '201',
              title: 'section',
              videos: []
            }
          }
        })
      ).toMatchSnapshot();
    });
  });
});
