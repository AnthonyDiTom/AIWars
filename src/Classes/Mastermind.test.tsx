import Mastermind, { MMColor as C, MMPositionResult } from './Mastermind';

const { good, bad, absent } = MMPositionResult;

test('test mastermind', () => {
  const mm = new Mastermind();

  expect(mm.colorsToFind.length).toEqual(Mastermind.NUMBEROF_COLOR_TO_FIND);
  expect(mm.colorsTries.length).toEqual(0);
});

test('test mastermind result', () => {
  const mm = new Mastermind();
  mm.colorsToFind = [C.blue, C.red, C.black, C.green];

  expect(mm.tryWithColorsPositions([C.blue, C.red, C.black, C.green])).toStrictEqual([
    good,
    good,
    good,
    good,
  ]);

  expect(mm.tryWithColorsPositions([C.blue, C.red, C.black, C.red])).toStrictEqual([
    good,
    good,
    good,
    absent,
  ]);

  expect(mm.tryWithColorsPositions([C.yellow, C.red, C.black, C.red])).toStrictEqual([
    good,
    good,
    absent,
    absent,
  ]);

  expect(mm.tryWithColorsPositions([C.red, C.blue, C.green, C.black])).toStrictEqual([
    bad,
    bad,
    bad,
    bad,
  ]);

  expect(mm.tryWithColorsPositions([C.blue, C.blue, C.black, C.red])).toStrictEqual([
    good,
    good,
    bad,
    absent,
  ]);

  expect(mm.tryWithColorsPositions([C.yellow, C.white, C.yellow, C.white])).toStrictEqual([
    absent,
    absent,
    absent,
    absent,
  ]);

  expect(mm.colorsTries.length).toBe(6);

  mm.restartGame();

  expect(mm.colorsTries.length).toEqual(0);
});
