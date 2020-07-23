import React from 'react';
import PropTypes from 'prop-types';
import propTypes from "prop-types";

const getRating = (rating) => {
  if (rating < 3) {
    return `Bad`;
  } else if (rating < 5) {
    return `Normal`;
  } else if (rating < 8) {
    return `Good`;
  } else if (rating < 10) {
    return `Very good`;
  } else {
    return `Awesome`;
  }
};

const PageOverview = (props) => {
  const {cardFilms} = props;

  return (<React.Fragment>

      <div className="movie-rating">
        <div className="movie-rating__score">{cardFilms.rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getRating(cardFilms.rating)}</span>
          <span className="movie-rating__count">{cardFilms.votes} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{cardFilms.description}</p>

        <p className="movie-card__director"><strong>Director: {cardFilms.director}</strong></p>
        <p className="movie-card__starring"><strong>Starring: {cardFilms.starring.map((star) => star).join(`, `)} and other</strong></p>
      </div>
  </React.Fragment>);
};

export default PageOverview;

PageOverview.propTypes = {
  cardFilms: propTypes.object.isRequired,
};
