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

const db = new PouchDB('mydb');
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
