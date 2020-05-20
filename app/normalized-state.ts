// utility library to normalize received JSON data
// most likely to be removed when adding db layer

import { schema, normalize } from 'normalizr';
import defaultState from './constants/default-state.json';

const note = new schema.Entity('notes');
const video = new schema.Entity('videos', { notes: [note] });
const section = new schema.Entity('sections', { videos: [video] });
const course = new schema.Entity('courses', {
  videos: [video],
  sections: [section],
  notes: [note]
});

const normalizedCourses = normalize(defaultState.courses, [course]);

export const allcourses = normalizedCourses.entities.courses;
export const allvideos = normalizedCourses.entities.videos;
export const allnotes = normalizedCourses.entities.notes;
export const allsections = normalizedCourses.entities.sections;
