export type Lesson = {
  id: string;
  subject: string;
  day: string;
  start: string;
  end: string;
};

export type Class = {
  id: string;
  name: string;  
  lessons: Lesson[];
};

export type School = {
  id: string;
  name: string;
  classes: Class[];
};
