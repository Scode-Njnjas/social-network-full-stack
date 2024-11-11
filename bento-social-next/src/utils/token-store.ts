let token: string | null = null;

export const setToken = (newToken: string | null) => {
  token = newToken;
};

export const getToken = (): string | null => {
  return token;
};
