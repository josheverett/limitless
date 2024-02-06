import { vwCssTo4k, vhCssTo4k, __4k } from '@/hooks/use-4k';

test('vwCssTo4k', () => {
  expect(vwCssTo4k('1vw')).toBe('38.4px');
  expect(vwCssTo4k('10vw')).toBe('384px');
  expect(vwCssTo4k('100vw')).toBe('3840px');
  expect(vwCssTo4k('42.69vw')).toBe('1639.3px');
});

test('vhCssTo4k', () => {
  expect(vhCssTo4k('1vh')).toBe('21.6px');
  expect(vhCssTo4k('10vh')).toBe('216px');
  expect(vhCssTo4k('100vh')).toBe('2160px');
  expect(vhCssTo4k('42.69vh')).toBe('922.1px');
});

test('__4k', () => {
  const styles = __4k({
    gap: '1vw',
    height: '10vh',
    borderTopWidth: '42.69vw',
    color: 'red',
    fontWeight: 500,
  });

  expect(styles).toEqual({
    gap: '38.4px',
    height: '216px',
    borderTopWidth: '1639.3px',
    color: 'red',
    fontWeight: 500,
  });
});
