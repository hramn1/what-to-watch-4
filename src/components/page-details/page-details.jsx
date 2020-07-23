import React from 'react';
import PropTypes from 'prop-types';
import propTypes from "prop-types";

const PageDetails = (props) => {
  const {cardFilms} = props;

  return (<React.Fragment>
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{cardFilms.director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <span className="movie-card__details-value">
            {cardFilms.starring.map((star) => (
              star
            )).join(`, \n`)}
          </span>
        </p>
      </div>

      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">{cardFilms.time}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{cardFilms.genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{cardFilms.year}</span>
        </p>
      </div>
    </div>
  </React.Fragment>);
};

export default PageDetails;

PageDetails.propTypes = {
  cardFilms: propTypes.object.isRequired,
};
