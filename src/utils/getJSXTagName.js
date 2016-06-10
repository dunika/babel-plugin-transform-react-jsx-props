/* @flow */
function getTagName(path: Object): string {
  if (path.isJSXIdentifier()) {
    return path.node.name;
  } else if (path.isJSXMemberExpression()) {
    return `${getTagName(path.get('object'))}.${getTagName(path.get('property'))}`;
  }

  throw new Error('Unsupported path type');
}

export default (path: Object) => getTagName(path.get('name'));
