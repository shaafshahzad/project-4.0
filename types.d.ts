type TODO = any;

export interface AccessToken {
  accessToken: string;
}

export interface Courses {
  name: string;
  grading: {
    [assignment: string]: {
      mark: string;
      weight: string;
    };
  };
  topics: { [week: string]: string };
}
