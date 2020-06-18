export type CourseType = {
  id: string;
  title: string;
  description?: string;
  videoCount?: number;
  progress?: number;
  thumbnail?: string;
};

export type VideoType = {
  id: string;
  title: string;
  url: string;
  watched: boolean;
  thumbnail?: string;
  section: SectionType['id'];
};

export type NoteType = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  video: VideoType['id'];
};

export type SectionType = {
  id: string;
  title: string;
  course: CourseType['id'];
};
