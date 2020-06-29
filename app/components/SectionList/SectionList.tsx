import React from 'react';

import { SectionType } from '../../reducers/entities/types';
import { SectionActionCreatorType } from '../../actions/sections';
import { VideoActionCreatorType } from '../../actions/videos';
import VideoListContainer from '../VideoList/VideoListContainer';
import MenuButton from '../Button/MenuButton';
import { UIActionCreatorType } from '../../actions/ui';

type Props = SectionActionCreatorType &
  VideoActionCreatorType &
  UIActionCreatorType & {
    courseId: string;
    sections: Array<SectionType>;
  };

export default function SectionList(props: Props) {
  const { courseId, sections, removeSectionDb, openModal } = props;

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
                    if (removeSectionDb) removeSectionDb(section.id);
                  }
                },
                {
                  label: 'update',
                  action: () => {
                    if (openModal) openModal(section, '', 'SECTION');
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
