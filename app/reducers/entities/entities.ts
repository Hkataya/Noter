import { combineReducers } from 'redux';
import courses from './courses';
import sections from './sections';
import videos from './videos';
import notes from './notes';

const entities = combineReducers({
  courses,
  notes,
  sections,
  videos
});

export default entities;
