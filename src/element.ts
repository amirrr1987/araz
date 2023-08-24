import { VNode } from "./types";
export const Fragment = ({ $children }) => $children;

export const el = ({$tag, $attrs = {}, $children = []}  : VNode  ) => {
    return {
        $tag,
        $attrs,
        $children,
    };
  }