/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import TitleBar from '../TitleBar/TitleBar';

export default function CoursePage() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Link to={routes.HOME}>
        <i className="fa fa-arrow-left fa-2x mt-3 ml-3" />
      </Link>
      <h1> Course Details </h1>
      <TitleBar title="test" />
      <div className="w-full bg-gray-100 flex-grow">
        <div className="h-full flex flex-row">
          <div className="w-3/4 h-full p-5 overflow-y-scroll" />
          <div className="bg-purple-900 w-1/4 h-full p-5 overflow-y-scroll" />
        </div>
      </div>
    </div>
  );
}
