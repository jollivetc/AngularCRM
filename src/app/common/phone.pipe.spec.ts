import {PhonePipe} from './phone.pipe';

describe('PhonePipe', () => {
  const pipe = new PhonePipe();

  it('format "010203" to "01 02 03"', () => {
    expect(pipe.transform('010203')).toBe('01 02 03');
  });
  it('format "01" to "01"', () => {
    expect(pipe.transform('01')).toBe('01');
  });
  it('format "0102" to "01 02"', () => {
    expect(pipe.transform('0102')).toBe('01 02');
  });
  it('format "01020304" to "01 02 03 04"', () => {
    expect(pipe.transform('01020304')).toBe('01 02 03 04');
  });
  it('format "" to ""', () => {
    expect(pipe.transform('')).toBe('');
  });
});
