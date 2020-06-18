import Repository from './Repository';
import { VideoType, NoteType } from '../reducers/entities/types';

class NoteRepository extends Repository<NoteType> {
  constructor(db: PouchDB.Database, relDB: PouchDB.RelDatabase) {
    super(db, relDB, 'note');
  }

  getNotesByVideoId = (videoId: VideoType['id']) => {
    return this.relDB.rel.find('video', videoId).then(data => data.notes);
  };
}

export default NoteRepository;
