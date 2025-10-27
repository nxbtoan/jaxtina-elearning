export const validateUsername = (username: string) => {
  if (!username) {
    return 'Username không được để trống';
  }
  return '';
};

export const validatePassword = (password: string) => {
  if (!password) {
    return 'Password không được để trống';
  }
  if (password.length < 6) {
    return 'Password phải có ít nhất 6 ký tự';
  }
  return '';
};