import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePageContainer from './components/HomePage/HomePageContainer';
import CoursePageContainer from './components/CoursePage/CoursePageContainer';
import MediaPageContainer from './components/MediaPage/MediaPageContainer';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route
          path={`${routes.COURSE}/:id${routes.MEDIA}/:vid`}
          component={MediaPageContainer}
        />
        <Route path={`${routes.COURSE}/:id`} component={CoursePageContainer} />
        <Route path={routes.HOME} component={HomePageContainer} />
      </Switch>
    </App>
  );
}
