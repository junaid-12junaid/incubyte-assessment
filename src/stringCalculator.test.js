const StringCalculator = require('./index');

describe('StringCalculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new StringCalculator();
  });

  test('returns 0 for empty string', () => {
    expect(calculator.add('')).toBe(0);
  });

  test('returns the number for single input', () => {
    expect(calculator.add('1')).toBe(1);
  });

  test('returns sum of two numbers', () => {
    expect(calculator.add('1,2')).toBe(3);
  });

  test('handles unknown amount of numbers', () => {
    expect(calculator.add('1,2,3,4,5')).toBe(15);
  });

  test('handles new lines as delimiters', () => {
    expect(calculator.add('1\n2,3')).toBe(6);
  });

  test('throws error for negative numbers', () => {
    expect(() => calculator.add('-1,2,-3')).toThrow('Negatives not allowed: -1, -3');
  });

  test('ignores numbers greater than 1000', () => {
    expect(calculator.add('2,1001')).toBe(2);
  });

  test('handles custom delimiter', () => {
    expect(calculator.add('//;\n1;2')).toBe(3);
  });

  test('handles custom delimiter of any length', () => {
    expect(calculator.add('//[***]\n1***2***3')).toBe(6);
  });

  test('handles multiple custom delimiters', () => {
    expect(calculator.add('//[*][%]\n1*2%3')).toBe(6);
  });

  test('handles multiple custom delimiters of varying lengths', () => {
    expect(calculator.add('//[**][%%%]\n1**2%%%3')).toBe(6);
  });
});
