export default interface IValidatePostalCode {
  [key: string]: (code: string) => boolean;
}
