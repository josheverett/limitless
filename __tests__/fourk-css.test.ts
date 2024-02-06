import { viewportCssTo4k, _fourkHelper, fourk } from '@/lib/fourk-css';

test('viewportCssTo4k', () => {
  const color = 'red';
  const height = '67vh';

  const output = viewportCssTo4k(
`
    padding: 32px;
    height: ${height};
    background-color: hotpink;
    font-size: 24vh;
    border-radius: 4px 2.12vw 8px 87%;
    &:hover {
      color: ${color};
    }
`
  );

  expect(output).toBe(
`
    padding: 32px;
    height: 1447.2px;
    background-color: hotpink;
    font-size: 518.4px;
    border-radius: 4px 81.41px 8px 87%;
    &:hover {
      color: red;
    }
`
  );
});

test('_fourkHelper (helper tag function)', () => {
  let output: string;

  output = _fourkHelper`a plain string`;
  expect(output).toBe('a plain string');

  output = _fourkHelper`${'first'} foo ${'herp'} bar ${'derp'} baz ${'last'}`;
  expect(output).toBe('first foo herp bar derp baz last');
});

test('fourk (css tag function)', () => {
  let output: string;

  output = fourk`a plain string`;
  expect(output.startsWith('css-')).toBe(true);

  output = fourk`${'first'} foo ${'herp'} bar ${'derp'} baz ${'last'}`;
  expect(output.startsWith('css-')).toBe(true);
});
