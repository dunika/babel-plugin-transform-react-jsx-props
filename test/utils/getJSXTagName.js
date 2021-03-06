import getJSXTagName from '../../lib/utils/getJSXTagName';
import { parse } from 'babylon';
import traverse from 'babel-traverse';
import test from 'ava';

function expressionToNode(code) {
  let path;
  const ast = parse(code, { plugins: ['jsx'] });
  traverse(ast, { JSXOpeningElement(p) { path = p; } });

  return path;
}

test('simple name', t => {
  const path = expressionToNode('<Button />');

  t.is(getJSXTagName(path), 'Button');
});

test('object name', t => {
  const path = expressionToNode('<Button.Label />');

  t.is(getJSXTagName(path), 'Button.Label');
});

test('nested object name', t => {
  const path = expressionToNode('<Button.Label.Icon />');

  t.is(getJSXTagName(path), 'Button.Label.Icon');
});
