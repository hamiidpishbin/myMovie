import DATA from "../data.json";

export function getAllMovies() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DATA);
    }, 1000);
  });
}
