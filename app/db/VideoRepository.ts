/* eslint-disable promise/no-nesting */
import Repository from './Repository';
import { VideoType, SectionType } from '../reducers/entities/types';
import sortArrayByDateCreated from '../utils/sortUtil';

class VideoRepository extends Repository<VideoType> {
  constructor(db: PouchDB.Database, relDB: PouchDB.RelDatabase) {
    super(db, relDB, 'video');
  }

  createEntity(entityData: Omit<VideoType, 'id'>) {
    return super.createEntity(entityData).then(updatedData => {
      return this.getCourseAndUpdateVideoCount(entityData.section).then(
        () => updatedData
      );
    });
  }

  deleteEntity(entityId: string) {
    return this.relDB.rel.find('video', entityId).then(data => {
      return super.deleteEntity(entityId).then(response => {
        return this.getCourseAndUpdateVideoCount(data.videos[0].section).then(
          () => {
            return response;
          }
        );
      });
    });
  }

  getVideosBySectionId = (sectionId: SectionType['id']) => {
    return this.db
      .createIndex({ index: { fields: ['data.section', '_id'] } })
      .then(() => {
        return this.relDB.rel
          .findHasMany('video', 'section', sectionId)
          .then(data => sortArrayByDateCreated(data.videos));
      });
  };

  getRelatedCourseId = (sectionId: string) => {
    return this.relDB.rel
      .find('section', sectionId)
      .then(data => data.sections[0].course);
  };

  getCourseAndUpdateVideoCount = (sectionId: string) => {
    return this.getRelatedCourseId(sectionId).then(courseId => {
      return this.relDB.rel.find('course', courseId).then(data => {
        const course = data.courses[0];
        const videoCount = data.videos.length;
        course.videoCount = videoCount;
        return this.relDB.rel.save('course', course);
      });
    });
  };
}

export default VideoRepository;
