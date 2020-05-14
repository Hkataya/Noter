export type CourseType = {
  id?: string;
  title: string;
  description?: string;
  chapters?: Array<string>;
  videos?: Array<string>;
  duration?: string;
  thumbnail?: string;
};

export type VideoType = {
  id?: string;
  title: string;
  url: string;
  thumbnail?: string;
  notes?: Array<string>;
};
