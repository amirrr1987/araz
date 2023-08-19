import { VNode } from "./types";
export const el = ({$tag, $attrs = {}, $children = []}  : VNode  ) => {
    return {
        $tag,
        $attrs,
        $children,
    };
  }