import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import counter from './counter';
import entities from './entities/entities';
import ui from './ui/ui';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter,
    entities,
    ui
  });
}
