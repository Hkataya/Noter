/* eslint-disable promise/no-nesting */
import Repository from './Repository';
import { VideoType, NoteType } from '../reducers/entities/types';

class NoteRepository extends Repository<NoteType> {
  constructor(db: PouchDB.Database, relDB: PouchDB.RelDatabase) {
    super(db, relDB, 'note');
  }

  getNotesByVideoId = (videoId: VideoType['id']) => {
    return this.db
      .createIndex({ index: { fields: ['data.video', '_id'] } })
      .then(() => {
        return this.relDB.rel
          .findHasMany('note', 'video', videoId)
          .then(data => data.notes);
      });
  };
}

export default NoteRepository;
