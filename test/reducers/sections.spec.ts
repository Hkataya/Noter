import sections from '../../app/reducers/entities/sections';
import { ADD_SECTION, REMOVE_SECTION } from '../../app/actions/sections';

jest.mock('../../app/db/RepositoryInitializer', () => ({
  __esModule: true,
  default: 'mockedDefaultExport',
  namedExport: jest.fn()
}));

describe('sections', () => {
  it('should handle ADD_SECTION', () => {
    expect(
      sections(
        {},
        {
          type: ADD_SECTION,
          payload: {
            sectionData: {
              title: 'test',
              id: '456',
              course: '123'
            },
            courseId: '123',
            sectionId: '456'
          }
        }
      )
    ).toMatchSnapshot();
  });

  it('should handle REMOVE_SECTION', () => {
    expect(
      sections(
        {
          '456': { title: 'test', id: '456', course: '123' }
        },
        {
          type: REMOVE_SECTION,
          payload: { sectionId: '456' }
        }
      )
    ).toMatchSnapshot();
  });
});
