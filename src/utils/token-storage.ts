export default {
  delete: () => localStorage.removeItem("authentication"),
  set: (value: string) => localStorage.setItem("authentication", value),
  get: () => localStorage.getItem("authentication"),
};
