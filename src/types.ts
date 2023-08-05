// types.ts
export interface Element<P extends { [key: string]: any } = {}> {
    name: string;
    props?: P;
    children?: Node | string | (Node | string)[] | null;
  }
  
  