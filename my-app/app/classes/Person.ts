export interface Person {
    gender: string;
    name: {title: string, first: string, last: string};
    email: string;
    phone: string;
    cell: string;
    nat: string;
    picture: { large: string, medium: string, thumbnail: string };
    login: { uuid: string, username: string, password: string };
  }