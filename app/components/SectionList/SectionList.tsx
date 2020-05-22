import React from 'react';
import { SectionType } from '../../reducers/entities/types';
import { SectionActionCreatorType } from '../../actions/sections';
import { VideoActionCreatorType } from '../../actions/videos';
import VideoListContainer from '../VideoList/VideoListContainer';
import MenuButton from '../Button/MenuButton';

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
          <div className="flex justify-between">
            <h1 className="text-gray-800 text-lg mb-2">{section.title}</h1>
            <MenuButton
              items={[
                {
                  label: 'remove',
                  action: () => {
                    if (removeSection) removeSection(section.id, courseId);
                  }
                }
              ]}
            />
          </div>
          <hr />
          <br />
          <VideoListContainer sectionId={section.id} />
        </div>
      ))}
    </div>
  );
}