let mount = ($node: any, $target: { replaceWith: (arg0: any) => void; }) => {
    $target.replaceWith($node);
    return $node;
};

export default mount

