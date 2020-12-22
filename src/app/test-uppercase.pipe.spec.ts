import { TestUppercasePipe } from './test-uppercase.pipe';

describe('TestUppercasePipe', () => {
  it('create an instance', () => {
    const pipe = new TestUppercasePipe();
    expect(pipe).toBeTruthy();
  });
});
