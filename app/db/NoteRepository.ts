import { db, relDB } from './db';
import Repository from './Repository';
import { VideoType, NoteType } from '../reducers/entities/types';

class NoteRepository extends Repository<NoteType> {
  constructor() {
    super(db, relDB, 'note');
  }

  getNotesByVideoId = (videoId: VideoType['id']) => {
    return relDB.rel.find('video', videoId).then(data => data.notes);
  };
}

export default new NoteRepository();
