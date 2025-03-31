const getMagicLocalStorage = <T>(key: string): T | undefined => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : undefined;
};

const setMagicLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const useMagicLocalStorage = <T>(key: string, value?: T) => {
  if (value !== undefined) {
    setMagicLocalStorage<T>(key, value);
  } else {
    return getMagicLocalStorage<T>(key);
  }
};
