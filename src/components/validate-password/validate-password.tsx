export const validatePassword = (password: string): string | null => {
  if (password.includes(' ')) {
    return 'Password cannot contain spaces';
  }

  if (/[а-яА-Я]/.test(password)) {
    return 'Password must be in English';
  }

  if (!/[a-zA-Z]/.test(password)) {
    return 'Password must include at least one letter';
  }

  if (!/\d/.test(password)) {
    return 'Password must include at least one digit';
  }

  return null;
};
