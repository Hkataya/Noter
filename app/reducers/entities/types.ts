export type CourseType = {
  id?: string;
  title: string;
  description?: string;
  sections: Array<string>;
  duration?: string;
  progress?: number;
  thumbnail?: string;
};

export type VideoType = {
  id?: string;
  title: string;
  url: string;
  watched: boolean;
  thumbnail?: string;
  notes?: Array<string>;
};

export type NoteType = {
  id?: string;
  title: string;
  description: string;
  timestamp?: number;
};

export type SectionType = {
  id?: string;
  title: string;
  videos: Array<string>;
};
