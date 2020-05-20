import React from 'react';
import { SectionType } from '../../reducers/entities/types';
import { SectionActionCreatorType } from '../../actions/sections';
import { VideoActionCreatorType } from '../../actions/videos';
import VideoListContainer from '../VideoList/VideoListContainer';

type Props = SectionActionCreatorType &
  VideoActionCreatorType & {
    courseId: string;
    sections: Array<SectionType>;
  };

export default function SectionList(props: Props) {
  const { courseId, sections, removeSection } = props;
  return (
    <div>
      {sections.map((section: SectionType) => (
        <div key={section.id}>
          <button
            type="button"
            onClick={() => {
              if (removeSection) removeSection(section.id, courseId);
            }}
          >
            remove Section
          </button>
          <h1>{section.title}</h1>
          <VideoListContainer sectionId={section.id} />
        </div>
      ))}
    </div>
  );
}
