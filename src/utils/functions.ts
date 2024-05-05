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
  const yearOfBirth = date.getFullYear();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return currentYear - yearOfBirth > 13;
}
