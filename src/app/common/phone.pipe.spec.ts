import { PhonePipe } from './phone.pipe';

describe('PhonePipe', () => {
  const pipe = new PhonePipe();

  it('format "010203" to "01 02 03"', () => {
    expect(pipe.transform('010203')).toBe('01 02 03');
  });
});
