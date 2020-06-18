import videos from '../../app/reducers/entities/videos';
import { ADD_VIDEO, REMOVE_VIDEO } from '../../app/actions/videos';

jest.mock('../../app/db/RepositoryInitializer', () => ({
  __esModule: true,
  default: 'mockedDefaultExport',
  namedExport: jest.fn()
}));

describe('videos', () => {
  it('should handle ADD_VIDEO', () => {
    expect(
      videos(
        {},
        {
          type: ADD_VIDEO,
          payload: {
            videoData: {
              title: 'test',
              id: '456',
              url: 'testurl',
              watched: false,
              section: '123'
            },
            videoId: '456'
          }
        }
      )
    ).toMatchSnapshot();
  });

  it('should handle REMOVE_VIDEO', () => {
    expect(
      videos(
        {
          '456': {
            title: 'test',
            id: '456',
            url: 'testurl',
            watched: false,
            section: '123'
          }
        },
        {
          type: REMOVE_VIDEO,
          payload: { videoId: '456' }
        }
      )
    ).toMatchSnapshot();
  });
});
