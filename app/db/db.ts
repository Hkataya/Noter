/* eslint-disable promise/always-return */
import PouchDB from 'pouchdb-browser';
import find from 'pouchdb-find';
import rel from 'relational-pouch';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import debug from 'pouchdb-debug';

PouchDB.plugin(find).plugin(rel);

if (process.env.NODE_ENV !== 'production') {
  PouchDB.plugin(debug);
  PouchDB.debug.enable('*');
}

// Initialize DB
const dbName = 'mydb';
const remoteCouch = `${process.env.COUCHDB_URL}${dbName}`;
export const db = new PouchDB('mydb');

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
export const relDB = db.setSchema([
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
<<<<<<< HEAD

export const createCourse = (courseData: CourseType) => {
  return relDB.rel.save('course', courseData);
};

export const deleteCourse = (courseId: CourseType['id']) => {
  let retrievedCourse: CourseType;
  return relDB.rel
    .find('course', courseId)
    .then(data => {
      data.courses.forEach((course: CourseType) => {
        if (course.id === courseId) retrievedCourse = course;
      });

      if (retrievedCourse) return relDB.rel.del('course', retrievedCourse);
      return null;
    })
    .catch(err => {
      console.log(err);
    });
};

export const createSection = (sectionData: SectionType) => {
  return relDB.rel.save('section', sectionData);
};
export const createNote = (noteData: NoteType) => {
  return relDB.rel.save('note', noteData);
};
export const deleteSection = (sectionId: SectionType['id']) => {
  let retrievedSection: SectionType;
  return relDB.rel
    .find('section', sectionId)
    .then(data => {
      data.sections.forEach((section: SectionType) => {
        if (section.id === sectionId) retrievedSection = section;
      });

      if (retrievedSection) return relDB.rel.del('section', retrievedSection);
      return null;
    })
    .catch(err => {
      console.log(err);
    });
};
export const deleteNote = (noteId: NoteType['id']) => {
  let retrievedNote: NoteType;
  return relDB.rel
    .find('note', noteId)
    .then(data => {
      data.notes.forEach((note: NoteType) => {
        if (note.id === noteId) retrievedNote = note;
      });
      if (retrievedNote) return relDB.rel.del('note', retrievedNote);
      return null;
    })
    .catch(err => {
      console.log(err);
    });
};
// update note
export const updateNote = (noteId: NoteType['id'], noteData: NoteType) => {
  let retrievedNote: NoteType;
  return relDB.rel
    .find('note', noteId)
    .then(data => {
      data.notes.foreach((note: NoteType) => {
        console.log(note);
        if (note.id === noteId) retrievedNote = note;
      });
      if (retrievedNote) {
        retrievedNote = noteData;
        return relDB.rel.put(noteId, retrievedNote);
      }
      return null;
    })
    .catch(err => {
      console.log(err);
    });
};
export const createVideo = (videoData: VideoType) => {
  return relDB.rel.save('video', videoData);
};

export const deleteVideo = (videoId: VideoType['id']) => {
  let retrievedVideo: VideoType;
  return relDB.rel
    .find('video', videoId)
    .then(data => {
      data.videos.forEach((video: VideoType) => {
        console.log(video);
        if (video.id === videoId) retrievedVideo = video;
      });

      if (retrievedVideo) return relDB.rel.del('video', retrievedVideo);
      return null;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getSectionsByCourseId = (courseId: CourseType['id']) => {
  return relDB.rel.find('course', courseId).then(data => data.sections);
};

export const getVideosBySectionId = (sectionId: SectionType['id']) => {
  return relDB.rel.find('section', sectionId).then(data => data.videos);
};
=======
>>>>>>> 5e330a867a9beb46a12d4e7026bc6090adf42228
