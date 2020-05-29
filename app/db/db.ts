import PouchDB from 'pouchdb-browser';
import find from 'pouchdb-find';
import rel from 'relational-pouch';
import {
  CourseType,
  VideoType,
  SectionType,
  NoteType
} from '../reducers/entities/types';

PouchDB.plugin(find).plugin(rel);

// Initialize DB
const dbName = 'mydb';
const remoteCouch = `http://admin:admin@127.0.0.1:5984/${dbName}`;
const db = new PouchDB('mydb');

// Fetch all documents from DB (including deleted docs)
db.changes({
  since: 0,
  include_docs: true
})
  .then(changes => {
    return console.log(changes);
  })
  .catch(e => console.log(e));

// Sync PouchDB with Online CouchDB
db.sync(remoteCouch, { live: true })
  .on('complete', () => {
    console.log('success sync');
  })
  .on('error', err => {
    console.log('Error sync');
    console.log(err);
  });

// Define Relational Schema
const relDB = db.setSchema([
  {
    singular: 'course',
    plural: 'courses',
    relations: {
      sections: {
        hasMany: { type: 'section', options: { queryInverse: 'course' } }
      }
    }
  },
  {
    singular: 'section',
    plural: 'sections',
    relations: {
      course: {
        belongsTo: 'course'
      },
      videos: {
        hasMany: { type: 'video', options: { queryInverse: 'section' } }
      }
    }
  },
  {
    singular: 'video',
    plural: 'videos',
    relations: {
      section: {
        belongsTo: 'section'
      },
      notes: {
        hasMany: { type: 'note', options: { queryInverse: 'video' } }
      }
    }
  },
  {
    singular: 'note',
    plural: 'notes',
    relations: {
      video: {
        belongsTo: 'video'
      }
    }
  }
]);

export const createCourse = (courseData: CourseType) => {
  return relDB.rel.save('course', courseData);
};

export const deleteCourse = (courseId: CourseType['id']) => {
  const generatedCourseId: string = relDB.rel.makeDocID({
    type: 'course',
    id: courseId
  });
  return db.get(generatedCourseId).then(course => db.remove(course));
};

export const createSection = (sectionData: SectionType) => {
  return relDB.rel.save('section', sectionData);
};
export const deleteSection = (sectionId: SectionType['id']) => {
  const generatedSectionId: string = relDB.rel.makeDocID({
    type: 'section',
    id: sectionId
  });
  return db.get(generatedSectionId).then(section => db.remove(section));
};

export const createNote = (noteData: NoteType) => {
  return relDB.rel.save('note', noteData);
};

export const deleteNote = (noteId: NoteType['id']) => {
  const generatedNoteId: string = relDB.rel.makeDocID({
    type: 'note',
    id: noteId
  });
  return db.get(generatedNoteId).then(note => db.remove(note));
};

export const createVideo = (videoData: VideoType) => {
  return relDB.rel.save('video', videoData);
};

export const deleteVideo = (videoId: VideoType['id']) => {
  const generatedVideoId: string = relDB.rel.makeDocID({
    type: 'video',
    id: videoId
  });
  return db.get(generatedVideoId).then(video => db.remove(video));
};

export const getSectionsByCourseId = (courseId: CourseType['id']) => {
  return relDB.rel.find('course', courseId).then(data => data.sections);
};

export const getVideosBySectionId = (sectionId: SectionType['id']) => {
  return relDB.rel.find('section', sectionId).then(data => data.videos);
};

export const getNotesByVideoId = (videoId: SectionType['id']) => {
  return relDB.rel.find('video', videoId).then(data => data.notes);
};
