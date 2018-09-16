import utils from './utils';

// ==== util function tests ====
test('timeFormatter output time in 25:00 format', () => {
  expect(utils.timeFormatter(1500)).toBe('25:00');
});

test('timeFormatter output time in 23:20 format', () => {
  expect(utils.timeFormatter(1400)).toBe('23:20');
});

test('timeFormatter output time in 07:32 format', () => {
  expect(utils.timeFormatter(488)).toBe('08:08');
});

test('timeFormatter output time in 08:08 format', () => {
  expect(utils.timeFormatter(512)).toBe('08:32');
});

test('timeFormatter output time in 00:00 format', () => {
  expect(utils.timeFormatter(0)).toBe('00:00');
});
