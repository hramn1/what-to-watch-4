import films from "./mocks/films";
import {ALL_GENRES} from './const.js';

const availableGenre =  Array.from(new Set(films.map((item, i) => item.genre)))
availableGenre.unshift(ALL_GENRES)
export  {availableGenre}
