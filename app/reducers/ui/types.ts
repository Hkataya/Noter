import { CourseType, VideoType, SectionType } from '../entities/types';

export type ModalType = {
  type: string;
  data?: CourseType | VideoType | SectionType | {};
  parentId?: string;
  visible?: boolean;
};
