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
export const validateEmail = (evt) => {
  const inputEmail = evt.target.value;
  const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (inputEmail === ``) {
    evt.target.setCustomValidity(`Email is required`);
    return;
  } else if (inputEmail.match(pattern)) {
    return;
  }
};

export const validatePassword = (evt) => {
  const inputPassword = evt.target.value;

  if (inputPassword === ``) {
    evt.target.setCustomValidity(`Password is required`);
    return;
  }
};
export const getNormalDate = (date) =>{
  const dayComment = new Date(date).getDate();
  const monthComment = MONTH_NAMES[new Date(date).getMonth() - 1];
  const yearComment = new Date(date).getFullYear();
  return `${monthComment} ${dayComment}, ${yearComment}`;
};
