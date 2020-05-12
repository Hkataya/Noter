import { combineReducers } from 'redux';
import courses from './courses';
import chapters from './chapters';
import videos from './videos';
import notes from './notes';

const entities = combineReducers({
  courses,
  notes,
  chapters,
  videos
});

export default entities;
