// types.ts
type Setup = ({ beforeOnMounted, onMounted }: { beforeOnMounted?: any; onMounted?: any }) => void;

export interface Element<P extends { [key: string]: any } = {}> {
  name: string;
  props?: P;
  children?: Node | string | (Node | string)[] | null;
  setup?: Setup;
}