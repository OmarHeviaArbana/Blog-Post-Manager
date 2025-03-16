import { FormatDatePipe } from './format-date.pipe';

describe('FormatDatePipe', () => {

  let pipe: FormatDatePipe;

  beforeEach(() => {
    pipe = new FormatDatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('format date as ddmmyyyy when type is 1', () => {
    const date = new Date(2023, 4, 9);
    expect(pipe.transform(date, 1)).toBe('09052023');
  });

  it('format date as dd / mm / yyyy when type is 2', () => {
    const date = new Date(2023, 0, 5);
    expect(pipe.transform(date, 2)).toBe('05 / 01 / 2023');
  });

  it('format date as dd/mm/yyyy when type is 3', () => {
    const date = new Date(2023, 11, 25);
    expect(pipe.transform(date, 3)).toBe('25/12/2023');
  });

  it('format date as yyyy-mm-dd when type is 4', () => {
    const date = new Date(2023, 6, 1);
    expect(pipe.transform(date, 4)).toBe('2023-07-01');
  });

  it('return an empty string if an invalid type is provided', () => {
    const date = new Date(2023, 6, 1);
    expect(pipe.transform(date, 5)).toBe('');
  });
});
