import React from 'react';
import PropTypes from 'prop-types';
import propTypes from "prop-types";

const FilmGenre = (props) => {
  const {genres, currentGenre, films, onGenreClick} = props;
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li key={genre}
          className={currentGenre === genre ? `catalog__genres-item catalog__genres-item--active` : `catalog__genres-item`}
          onClick={(evt) => {
            evt.preventDefault();
            onGenreClick(genre, films);
          }}>
          <a href="#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
};

FilmGenre.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentGenre: PropTypes.string.isRequired,
  films: propTypes.arrayOf(propTypes.object).isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

export default FilmGenre;
