export function validateEmail(email: string) {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export function validatePassword(password: string) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
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
  const regex = /^[a-zA-Z]+$/;

  return regex.test(city);
}
