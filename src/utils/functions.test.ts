import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as validate from './functions';

describe('Validation functions works correctly with:', () => {
  it('correct Email', () => {
    expect(validate.validateEmail('test@example.com')).toBeTruthy();
  });
  it('incorrect Email', () => {
    expect(validate.validateEmail('test_example.com')).toBeFalsy();
  });
  it('correct Password', () => {
    expect(validate.validatePassword('Password1')).toBeTruthy();
  });
  it('correct Password with special characters', () => {
    expect(validate.validatePassword('Password$1_')).toBeTruthy();
  });
  it('incorrect Password', () => {
    expect(validate.validatePassword('pass')).toBeFalsy();
  });
  it('correct userName', () => {
    expect(validate.validateName('User')).toBeTruthy();
  });
  it('incorrect userName', () => {
    expect(validate.validateName('#__#')).toBeFalsy();
  });
  describe('Age validation', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });
    it('correct Age', () => {
      const date = new Date('01 Jan 2023 00:00:00 GMT');
      vi.setSystemTime(date);
      expect(validate.validateAge('01 Jan 2010 00:00:00 GMT')).toBeTruthy();
    });
    it('incorrect Age', () => {
      const date = new Date('01 Jan 2023 00:00:00 GMT');
      vi.setSystemTime(date);
      expect(validate.validateAge('02 Jan 2010 00:00:00 GMT')).toBeFalsy();
    });
  });
  it('correct City name', () => {
    expect(validate.validateCity('Tokio')).toBeTruthy();
  });
  it('correct with two words City name', () => {
    expect(validate.validateCity('New York')).toBeTruthy();
  });
  it('incorrect City name with space', () => {
    expect(validate.validateCity('New ')).toBeFalsy();
  });
  it('incorrect City name with number and special character', () => {
    expect(validate.validateCity('City1_')).toBeFalsy();
  });
  it('correct Postal codes', () => {
    expect(validate.validatePostalCode.RU('123456')).toBeTruthy();
    expect(validate.validatePostalCode.RU('603128')).toBeTruthy();
    expect(validate.validatePostalCode.UA('12345')).toBeTruthy();
    expect(validate.validatePostalCode.UA('60021')).toBeTruthy();
    expect(validate.validatePostalCode.BY('123456')).toBeTruthy();
    expect(validate.validatePostalCode.BY('603128')).toBeTruthy();
  });
  it('incorrect Postal codes', () => {
    expect(validate.validatePostalCode.RU('1234560')).toBeFalsy();
    expect(validate.validatePostalCode.RU('_603128')).toBeFalsy();
    expect(validate.validatePostalCode.UA('123456')).toBeFalsy();
    expect(validate.validatePostalCode.UA('600211')).toBeFalsy();
    expect(validate.validatePostalCode.BY('1234565')).toBeFalsy();
    expect(validate.validatePostalCode.BY('%603128')).toBeFalsy();
  });
});
