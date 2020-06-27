export type CourseType = {
  id: string;
  title: string;
  description?: string;
  videoCount?: number;
  progress?: number;
  thumbnail?: string;
  createdAt: Date;
};

export type VideoType = {
  id: string;
  title: string;
  url: string;
  watched: boolean;
  online: boolean;
  section: SectionType['id'];
  createdAt: Date;
};

export type SectionType = {
  id: string;
  title: string;
  course: CourseType['id'];
  createdAt: Date;
};

export enum NoteShapeType {
  note = 'NOTE',
  audio = 'AUDIO',
  image = 'IMAGE'
}

export type NoteType = {
  id: string;
  title: string;
  description: string;
  audio?: string;
  image?: string;
  type: NoteShapeType;
  timestamp: string;
  video: VideoType['id'];
};
