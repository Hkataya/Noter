import React from 'react';

import { SectionType } from '../../reducers/entities/types';
import { SectionActionCreatorType } from '../../actions/sections';
import { VideoActionCreatorType } from '../../actions/videos';
import VideoListContainer from '../VideoList/VideoListContainer';
import MenuButton from '../Button/MenuButton';
import { UIActionCreatorType } from '../../actions/ui';
import formType from '../../constants/form-types.json';

// **** Prop Types Section **** //
type Props = SectionActionCreatorType &
  VideoActionCreatorType &
  UIActionCreatorType & {
    courseId: string;
    sections: Array<SectionType>;
  };

// **** Component Section **** //
export default function SectionList(props: Props) {
  const { sections, removeSectionDb, openModal } = props;

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
                    if (openModal) openModal(section, '', formType.SECTION);
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
