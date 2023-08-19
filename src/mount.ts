import { Mount } from "./types";
export const mount = ({$node, $target}: Mount): HTMLElement => {
    $target.replaceWith($node);
    return $node;
};
