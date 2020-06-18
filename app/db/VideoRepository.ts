import Repository from './Repository';
import { VideoType, SectionType } from '../reducers/entities/types';

class VideoRepository extends Repository<VideoType> {
  constructor(db: PouchDB.Database, relDB: PouchDB.RelDatabase) {
    super(db, relDB, 'video');
  }

  getVideosBySectionId = (sectionId: SectionType['id']) => {
    return this.relDB.rel
      .findHasMany('video', 'section', sectionId)
      .then(data => data.videos);
  };

  getRelatedCourseId = (sectionId: string) => {
    return this.relDB.rel
      .find('section', sectionId)
      .then(data => data.sections[0].course);
  };
}

export default VideoRepository;
