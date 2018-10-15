export const PASSWORD_NO_HIGH_ASCII_REGEX: RegExp = new RegExp(/^[ -~]+$/);
export const PASSWORD_SPECIAL_CHARS = '!@#$%^&*()_+=\\[\\]\\-{|}\',./:;<>?`~';
export const PASSWORD_VERIFY_REGEX: RegExp =
  new RegExp('(?=.{8,20})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[' + PASSWORD_SPECIAL_CHARS + ']).*');
export const MIN_PWD_LENGTH = 8;
export const MAX_PWD_LENGTH = 20;
