import { db, relDB } from './db';
import CourseRepository from './CourseRepository';
import SectionRepository from './SectionRepository';
import VideoRepository from './VideoRepository';
import NoteRepository from './NoteRepository';

export const courseRepository = new CourseRepository(db, relDB);

export const sectionRepository = new SectionRepository(db, relDB);

export const videoRepository = new VideoRepository(db, relDB);

export const noteRepository = new NoteRepository(db, relDB);
