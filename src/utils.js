import {ALL_GENRES} from './const.js';

export const getAvailableGenres = (films) => {
  const availableGenre = new Set(films.map((film) => film.genre));
  return [ALL_GENRES, ...availableGenre];
};
export const validateEmail = (evt) => {
  const inputEmail = evt.target.value;
  const pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

  if (inputEmail === ``) {
    evt.target.setCustomValidity(`Email is required`);
    return;
  }

  if (!inputEmail.match(pattern)) {
    evt.target.setCustomValidity(`Email must be in the format email@mail.com`);
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
