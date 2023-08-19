import { Mount } from "./types";

export const mount = ({$node, $target}: Mount): HTMLElement => {
    $target.append($node);
    return $node;
};
