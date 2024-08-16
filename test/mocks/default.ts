export const defaultId = '66be558eb3505986e8b5a191';

export const mockAppConfig = {
  authSecretKey: '28696672663124635239224b2a395c7d',
};

export const checkToken = (token: string) => {
  const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
  return jwtPattern.test(token);
};
