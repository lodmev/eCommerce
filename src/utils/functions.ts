import IValidatePostalCode from '../types/interfaces';

export function validateEmail(email: string) {
  if (email.trim() !== email) return false;
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export function validatePassword(password: string) {
  if (password.trim() !== password) return false;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9$!#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;
  return regex.test(password);
}

export function validateName(name: string) {
  const regex = /^[A-Za-z]+$/;
  return regex.test(name);
}

export function validateAge(dateOfBirth: string) {
  const date = new Date(dateOfBirth);
  const currentDate = new Date();

  const thirteenYearsAgo = new Date(currentDate);
  thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);

  return date <= thirteenYearsAgo;
}

export function validateCity(city: string) {
  const regex = /^[a-zA-Z]+(?: [a-zA-Z]+){0,1}$/;

  return regex.test(city);
}

export const validatePostalCode: IValidatePostalCode = {
  UA(code: string) {
    const regex = /^\d{5}$/;
    return regex.test(code);
  },
  RU(code: string) {
    const regex = /^\d{6}$/;
    return regex.test(code);
  },
  BY(code: string) {
    const regex = /^\d{6}$/;
    return regex.test(code);
  },
};

export function enumToArray(enumObject: { [key: string]: string }): string[] {
  return Object.keys(enumObject).map((key) => enumObject[key]);
}

export function priceConverter(centAmount: number | undefined): number {
  return centAmount ? centAmount / 100 : NaN;
}

export function randomUUID() {
  return window.crypto.randomUUID();
}
