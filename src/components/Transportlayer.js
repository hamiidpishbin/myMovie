import DATA from "../data.json";

export function getAllMovies() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("data",DATA)
      resolve(DATA);
    }, 1000);
  });
}
