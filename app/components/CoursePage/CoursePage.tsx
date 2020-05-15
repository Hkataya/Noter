import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from '../Modal/Modal';
import routes from '../../constants/routes.json';
import TitleBar from '../TitleBar/TitleBar';
import { EntityStateType } from '../../reducers/types';
import { VideoActionCreatorType } from '../../actions/videos';
import VideoList from '../VideoList/VideoList';
import AddVideoForm from '../Form/AddVideoForm';

type Props = EntityStateType & VideoActionCreatorType;

type RouteParams = {
  id: string;
};

export default function CoursePage(props: Props) {
  const { courses, videos, removeVideo, addVideo } = props;
  const [modalVisibile, setModalVisible] = useState(false);

  const params = useParams<RouteParams>();
  const courseId = params.id;
  const currentCourse = courses[courseId];
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {modalVisibile && (
        <Modal handleClose={() => setModalVisible(false)} title="Add Video">
          <AddVideoForm
            closeModal={() => setModalVisible(false)}
            courseId={courseId}
            addVideo={addVideo}
          />
        </Modal>
      )}
      <Link to={routes.HOME}>
        <i className="fa fa-arrow-left fa-2x mt-3 ml-3" />
      </Link>
      <TitleBar title={currentCourse.title} />
      <div className="w-full bg-gray-100 flex-grow">
        <div className="h-full flex flex-row">
          <VideoList
            openAddVideoModal={() => {
              setModalVisible(true);
            }}
            removeVideo={removeVideo}
            course={currentCourse}
            videos={videos}
          />
          <div className="bg-purple-900 w-1/4 h-full p-5 overflow-y-scroll" />
        </div>
      </div>
    </div>
  );
}
