import { CourseType, VideoType, SectionType } from '../entities/types';

export type ModalType = {
  data: CourseType | VideoType | SectionType | any;
  parentId?: string;
  visible?: boolean;
  type?: string;
};

export type AlertType = {
  visible: boolean;
  status: string;
  message: string;
};
