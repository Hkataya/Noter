import { db, relDB } from './db';
import Repository from './Repository';
import { VideoType, SectionType } from '../reducers/entities/types';

class VideoRepository extends Repository<VideoType> {
  constructor() {
    super(db, relDB, 'video');
  }

  getVideosBySectionId = (sectionId: SectionType['id']) => {
    return relDB.rel
      .findHasMany('video', 'section', sectionId)
      .then(data => data.videos);
  };
}

export default new VideoRepository();
