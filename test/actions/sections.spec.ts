import * as actions from '../../app/actions/sections';

jest.mock('../../app/db/RepositoryInitializer', () => ({
  __esModule: true
}));
describe('actions', () => {
  it('should create new section', () => {
    expect(
      actions.addSection({ id: '456', title: 'test', course: '123' })
    ).toMatchSnapshot();
  });

  it('should update section', () => {
    expect(
      actions.updateSection({
        id: '456',
        title: 'Changed',
        course: '123'
      })
    ).toMatchSnapshot();
  });

  it('should remove section', () => {
    expect(actions.removeSection('456')).toMatchSnapshot();
  });
});
