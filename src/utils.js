import {ALL_GENRES} from './const.js';
const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];
export const getAvailableGenres = (films) => {
  const availableGenre = new Set(films.map((film) => film.genre));
  return [ALL_GENRES, ...availableGenre];
};

export const getNormalDate = (date) =>{
  const dayComment = new Date(date).getDate();
  const monthComment = MONTH_NAMES[new Date(date).getMonth()];
  const yearComment = new Date(date).getFullYear();
  return `${monthComment} ${dayComment}, ${yearComment}`;
};
