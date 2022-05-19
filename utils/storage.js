export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log(err);
  }
}

export const getLocalStorage = (key, initialValue) => {
  try {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key) ?  JSON.parse(localStorage.getItem(key)) : initialValue;
    }
  } catch (err) {
    console.log(err);
    return initialValue;
  }
}